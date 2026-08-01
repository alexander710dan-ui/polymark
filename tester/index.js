#!/usr/bin/env node
/* Polymark paper-trading tester.
   Read-only Polymarket public data + fake money. No wallet, no keys, no real orders.
   Zero npm dependencies: uses Node's built-in fetch and node:sqlite (Node >= 23.4).

   Usage:
     node tester/index.js tick     # one cycle: open new paper bets, settle resolved ones
     node tester/index.js report   # print stats and write RESULTS.md
     node tester/index.js reset    # wipe the database
*/
"use strict";

const { DatabaseSync } = require("node:sqlite");
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "polymark.db");
const RESULTS_PATH = path.join(__dirname, "..", "RESULTS.md");
const GAMMA = "https://gamma-api.polymarket.com";
const DATA_API = "https://data-api.polymarket.com";

const STAKE = 100;          // fake dollars per position
const BANKROLL = 10000;     // fake dollars per strategy
const MAX_NEW_PER_TICK = 5; // per strategy
const MAX_OPEN = 25;        // per strategy
const MIN_LIQ = 5000;
const MIN_VOL24 = 1000;
const MAX_SPREAD = 0.06;
const MAX_DAYS = 45;        // only markets resolving soon, so data accumulates fast
const FORCE_CLOSE_DAYS = 10; // days past endDate before an unresolved position is marked out

/* Empirically banned market types (settled-bet evidence, 2026-07-28):
   - tweet-count buckets: 88 bets, -$2,396 — pure noise, unpredictable
   - same-day crypto strike/updown: high win rate, negative P&L (payoff
     asymmetry) and effectively coin flips on intraday price paths */
const JUNK_RE = /\btweets? (from|between)|post \d+[-–]\d+ tweets|Up or Down on|dip to \$|reach \$[\d,]+ (in|on) |be above \$[\d,]+ on /i;
const SPORT_RE = /\b(vs\.?|@)\b|NBA|NFL|NHL|MLB|UFC|Premier League|La Liga|Serie A|Bundesliga|Champions League|Grand Prix|F1|ATP|WTA|LoL|Dota|Counter-Strike|CS2|Valorant|tennis|Wimbledon|playoff|Super Bowl|World Series|spread|moneyline/i;
const POLITICS_RE = /election|president|senate|parliament|minister|congress|governor|nominee|referendum|impeach/i;
const CRYPTO_RE = /bitcoin|BTC|ethereum|ETH|solana|crypto|token|\$\d+k/i;

/* Each strategy maps a market snapshot to 'yes' | 'no' | null.
   'yes' means the FIRST listed outcome (literally "Yes" in Yes/No markets;
   team A in team-vs-team markets). ctx carries whale-copy signals.
   m = { yes, bid, ask, change24, liq, vol24, days, outcomes } */
/* RETIRED after ~900 settled bets (2026-07-22) — kept in the database and
   standings as history, but they place no new bets:
   - longshot      2% wr, -$3,092: the lottery graveyard, empirically settled
   - mean_revert  21% wr, -$1,262: buying dying longshots; strong_dip is its repair
   - late_favorite 78% wr, -$817:  payoff asymmetry disease
   - favorite     66% wr, -$438:   same disease, milder
   - copy_month   41% wr, -$1,450: monthly-board whales are live-game traders, worst copy targets
   random_control stays: red, but it is the yardstick everything must beat. */
const STRATEGIES = {
  fade_longshot: (m) => (m.yes <= 0.10 && m.yes >= 0.02 ? "no" : m.yes >= 0.90 && m.yes <= 0.98 ? "yes" : null),
  momentum:      (m) => (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null),
  /* THE SUPER — the best empirical part of every strategy in one:
     30-70c only (mid_momentum's payoff symmetry), never in-play (copy
     family's hard lesson), momentum OR pregame-whale signal with veto
     when they disagree, copy_pro's no-chase guard, conviction-sized
     stakes when independent signals stack. */
  super: (m, ctx) => {
    if (m.inPlay || m.yes < 0.30 || m.yes > 0.70) return null;
    const mom = m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null;
    const whale = ctx.whale ? (ctx.whale.index === 0 ? "yes" : "no") : null;
    /* Two independent signals REQUIRED (2026-07-28 evidence: super's
       single-signal $100 bets went 33% for -$526, while its two-signal
       conviction bets went 62% for +$390 — the confirmation is the edge,
       not the size). */
    if (!whale || !mom || whale !== mom) return null;
    const side = whale;
    if (ctx.whale.avgPrice !== null) {
      const cur = ctx.whale.index === 0 ? m.yes : 1 - m.yes;
      if (cur - ctx.whale.avgPrice > 0.05) return null; // never chase
    }
    let stake = STAKE + 50;                              // both signals agree
    if (ctx.whale.usd >= 3000) stake += 50;              // whale conviction
    if (ctx.whale.traders >= 2) stake += 50;             // independent whales
    if (ctx.ai && Date.now() - ctx.ai.ts < 45 * 60000) { // local AI as a tiebreak vote
      const aiSide = ctx.ai.ai > m.yes ? "yes" : "no";
      if (aiSide === side && Math.abs(ctx.ai.ai - m.yes) > 0.05) stake += 25;
    }
    return { side, stake: Math.min(250, stake) };
  },
  /* In-play guard on all copy strategies (and the fade control, to stay its
     exact mirror): live-game whale trades proved uncopyable in week one —
     every copy-family loss came from live sports, where the whale edge is
     seconds-scale game state that is gone before any copier arrives. */
  copy_top:      (m, ctx) => (ctx.whale && !m.inPlay ? (ctx.whale.index === 0 ? "yes" : "no") : null),
  whale_fade:    (m, ctx) => (ctx.whale && !m.inPlay ? (ctx.whale.index === 0 ? "no" : "yes") : null),
  /* copy_top variant 1 — every improvement at once: efficiency-filtered wallet
     pool, 6h freshness, refuses to chase a price that ran >5¢ past the whales'
     own average entry, and sizes stake ($100-250) by conviction. */
  copy_pro: (m, ctx) => {
    const s = ctx.pro;
    if (!s || m.inPlay) return null;
    const cur = s.index === 0 ? m.yes : 1 - m.yes;
    if (s.avgPrice !== null && cur - s.avgPrice > 0.05) return null; // too late — whales got a better price
    let stake = STAKE;
    if (s.traders >= 2) stake += 50;
    if (s.usd >= 3000) stake += 50;
    if (s.usd >= 8000) stake += 50;
    return { side: s.index === 0 ? "yes" : "no", stake: Math.min(250, stake) };
  },
  /* momentum, repaired: only trade where payoffs are symmetric (30-70¢).
     Plain momentum won 75% of its bets and still lost money buying 95¢ sides.
     FROZEN as v1 (strategies/mid_momentum-v1.md) — the control for the
     variants below. Do not change this rule; add new ones instead. */
  mid_momentum:  (m) => (m.yes >= 0.30 && m.yes <= 0.70 ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),

  /* ---- mid_momentum variants: one changed variable each, v1 keeps running
     as the control so every comparison is like-for-like. ---- */
  // drop the two segments that lost money in v1's ledger: sub-45c and non-sports.
  // NOTE: walk-forward (tester/walkforward.js, 2026-07-29) says the sub-45c cut
  // is NOT justified — that band made +$598 out-of-sample after losing $71
  // in-sample. Kept anyway as the "fitted" arm of the experiment.
  mm_tight: (m) => (m.tag === "sports" && m.yes >= 0.45 && m.yes <= 0.70
    ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),
  // the ONLY refinement walk-forward actually supports: sports in both halves
  // (+$307 in-sample, +$1,411 out), non-sports negative in both. Band untouched.
  mm_sports: (m) => (m.tag === "sports" && m.yes >= 0.30 && m.yes <= 0.70
    ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),
  // only markets with real runway — tests whether the edge is slow news, not same-day noise
  mm_slow: (m) => (m.days >= 2 && m.yes >= 0.30 && m.yes <= 0.70
    ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),
  // demand a bigger move — stronger signal, or just a later entry?
  mm_strong: (m) => (m.yes >= 0.30 && m.yes <= 0.70
    ? (m.change24 >= 0.08 ? "yes" : m.change24 <= -0.08 ? "no" : null) : null),
  // everything at once: sports, 45-70c, 2+ days, >=8c move
  mm_max: (m) => (m.tag === "sports" && m.days >= 2 && m.yes >= 0.45 && m.yes <= 0.70
    ? (m.change24 >= 0.08 ? "yes" : m.change24 <= -0.08 ? "no" : null) : null),
  /* Execution-cost response (post-mortem 2026-08-01): every bet in this lab
     starts ~2.2c behind because signals read the mid but fills cross to the
     ask — a cost larger than any edge measured so far. This variant takes the
     same signal only where the spread is <=2c, so the crossing cost is <=1c. */
  mm_cheap: (m) => (m.spread !== null && m.spread <= 0.02 && m.yes >= 0.30 && m.yes <= 0.70
    ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),
  /* mean_revert, repaired: only buy a knocked-down side that is STILL the
     favourite. Plain mean_revert died buying dying longshots. */
  strong_dip:    (m) => (m.change24 <= -0.10 && m.yes >= 0.50 ? "yes" : m.change24 >= 0.10 && m.yes <= 0.50 ? "no" : null),
  /* Local-AI shadow strategy: bets only when the on-Mac model's probability
     estimate disagrees with the market by more than costs + 4c. The model's
     skill gets judged by the same scoreboard as everyone else. */
  ai_judge: (m, ctx) => {
    const a = ctx.ai;
    if (!a || m.inPlay) return null;
    if (Date.now() - a.ts > 45 * 60000) return null; // stale opinion
    const costs = (m.spread !== null ? m.spread / 2 : 0.02) + 0.01;
    const edge = a.ai - m.yes;
    if (edge > costs + 0.04) return "yes";
    if (-edge > costs + 0.04) return "no";
    return null;
  },
  random_control:(m) => (Math.random() < 0.12 ? (Math.random() < 0.5 ? "yes" : "no") : null)
};

/* ---------------- infrastructure ---------------- */

function openDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS positions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      strategy TEXT NOT NULL,
      market_id TEXT NOT NULL,
      question TEXT,
      tag TEXT,
      side TEXT NOT NULL,
      entry REAL NOT NULL,
      stake REAL NOT NULL,
      shares REAL NOT NULL,
      opened_at TEXT NOT NULL,
      end_date TEXT,
      status TEXT NOT NULL DEFAULT 'open',
      last_mark REAL,
      exit REAL,
      closed_at TEXT,
      pnl REAL,
      close_reason TEXT
    );
    CREATE TABLE IF NOT EXISTS ticks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT, markets_seen INTEGER, opened INTEGER, settled INTEGER, note TEXT
    );
    CREATE TABLE IF NOT EXISTS equity(
      ts TEXT, strategy TEXT, realized REAL, open_stake REAL, open_value REAL, equity REAL, open_n INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_pos_open ON positions(status, strategy);
    CREATE INDEX IF NOT EXISTS idx_pos_market ON positions(market_id, strategy);
  `);
  // migrations for columns added after the first release
  for (const col of ["outcome_name TEXT", "condition_id TEXT", "signal_meta TEXT",
                     "signal_price REAL", "spread_at_entry REAL"]) {
    try { db.exec("ALTER TABLE positions ADD COLUMN " + col); } catch (e) { /* exists */ }
  }
  return db;
}

async function fetchJson(url, tries) {
  tries = tries || 3;
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "polymark-paper-tester (fake money, read-only)", Accept: "application/json" },
        signal: AbortSignal.timeout(20000)
      });
      if (res.status === 429) { await sleep(2000 * i); continue; }
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      if (i === tries) throw e;
      await sleep(1000 * i);
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* bounded-concurrency map — the documented rate limits are enormous, the
   old one-request-at-a-time politeness was costing a minute per tick */
async function pmap(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    for (;;) {
      const idx = next++;
      if (idx >= items.length) return;
      try { results[idx] = await fn(items[idx], idx); } catch (e) { results[idx] = null; }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker));
  return results;
}
const num = (x) => { const v = typeof x === "string" ? parseFloat(x) : x; return Number.isFinite(v) ? v : null; };

function tag(question) {
  if (SPORT_RE.test(question)) return "sports";
  if (POLITICS_RE.test(question)) return "politics";
  if (CRYPTO_RE.test(question)) return "crypto";
  return "other";
}

/* ---------------- market universe ---------------- */

function parseMarket(raw) {
  let outcomes, prices;
  try {
    outcomes = JSON.parse(raw.outcomes);
    prices = JSON.parse(raw.outcomePrices);
  } catch (e) { return null; }
  if (!Array.isArray(outcomes) || outcomes.length !== 2) return null;
  // any two-outcome market qualifies; 'yes' internally = first listed outcome
  const mid = num(prices && prices[0]);
  const bid = num(raw.bestBid), ask = num(raw.bestAsk);
  const yes = bid !== null && ask !== null ? (bid + ask) / 2 : mid;
  if (yes === null || yes <= 0 || yes >= 1) return null;
  const liq = num(raw.liquidityNum) ?? num(raw.liquidity) ?? 0;
  const vol24 = num(raw.volume24hr) ?? 0;
  const end = raw.endDate ? Date.parse(raw.endDate) : NaN;
  if (!Number.isFinite(end)) return null;
  const days = (end - Date.now()) / 86400000;
  const spread = bid !== null && ask !== null ? ask - bid : null;
  const gameStart = raw.gameStartTime ? Date.parse(raw.gameStartTime) : null;
  const question = raw.question || raw.slug || "?";
  return {
    id: String(raw.id),
    conditionId: raw.conditionId || "",
    tag: tag(question),
    inPlay: Number.isFinite(gameStart) ? Date.now() > gameStart : false,
    question: question,
    outcomes: [String(outcomes[0]), String(outcomes[1])],
    yes, bid, ask, spread,
    change24: num(raw.oneDayPriceChange) ?? 0,
    liq, vol24, days,
    endDate: raw.endDate
  };
}

async function fetchUniverse() {
  const pages = await pmap([0, 1, 2], 3, (page) =>
    fetchJson(GAMMA + "/markets?closed=false&order=volume24hr&ascending=false&limit=100&offset=" + page * 100));
  const out = [];
  for (const batch of pages) {
    if (!Array.isArray(batch)) continue;
    for (const raw of batch) {
      const m = parseMarket(raw);
      if (!m) continue;
      if (m.liq < MIN_LIQ || m.vol24 < MIN_VOL24) continue;
      if (m.spread !== null && m.spread > MAX_SPREAD) continue;
      if (m.days < 0.02 || m.days > MAX_DAYS) continue;
      if (JUNK_RE.test(m.question)) continue; // banned market types (see JUNK_RE)
      out.push(m);
    }
  }
  return out;
}

/* ---------------- whale signals (copy_top / whale_fade / copy_pro / copy_month)
   Three signal groups built from public leaderboards + wallet trade history:
   - top:   top-10 all-time,  last 24h, >= $500 one-sided flow (>= 70% agreement)
   - pro:   top-25 all-time filtered by pnl/volume efficiency >= 3%,
            last 6h only, >= $1000 flow, tracks the whales' avg entry price
   - month: top-10 of the MONTHLY board, same rules as `top` (in-form traders) */
async function fetchWhaleData() {
  let allBoard = [], monthBoard = [];
  try { allBoard = await fetchJson(DATA_API + "/v1/leaderboard?window=all&limit=25"); } catch (e) {}
  try { monthBoard = await fetchJson(DATA_API + "/v1/leaderboard?window=month&limit=10"); } catch (e) {}
  if (!Array.isArray(allBoard)) allBoard = [];
  if (!Array.isArray(monthBoard)) monthBoard = [];
  const groups = [
    { key: "top", wallets: allBoard.slice(0, 10), hours: 24, minUsd: 500 },
    { key: "pro", wallets: allBoard.filter((u) => num(u.pnl) > 0 && num(u.vol) > 0 && u.pnl / u.vol >= 0.03), hours: 6, minUsd: 1000 },
    { key: "month", wallets: monthBoard, hours: 24, minUsd: 500 }
  ];
  const activity = new Map();
  for (const g of groups) for (const u of g.wallets) if (u.proxyWallet) activity.set(u.proxyWallet, null);
  const wallets = [...activity.keys()];
  const acts = await pmap(wallets, 8, (w) => fetchJson(DATA_API + "/activity?user=" + w + "&limit=100&type=TRADE"));
  wallets.forEach((w, i) => activity.set(w, acts[i]));
  const out = {};
  for (const g of groups) {
    const agg = new Map();
    const cutoff = Date.now() - g.hours * 3600000;
    for (const u of g.wallets) {
      const acts = activity.get(u.proxyWallet);
      if (!Array.isArray(acts)) continue;
      for (const a of acts) {
        if (a.side !== "BUY" || !a.conditionId) continue;
        const ts = a.timestamp > 1e12 ? a.timestamp : a.timestamp * 1000;
        if (!ts || ts < cutoff) continue;
        const idx = a.outcomeIndex === 0 || a.outcomeIndex === 1 ? a.outcomeIndex : null;
        if (idx === null) continue;
        const usd = num(a.usdcSize) ?? 0;
        if (usd <= 0) continue;
        let s = agg.get(a.conditionId);
        if (!s) { s = { usd: [0, 0], pxUsd: [0, 0], traders: [new Set(), new Set()] }; agg.set(a.conditionId, s); }
        s.usd[idx] += usd;
        s.traders[idx].add(u.proxyWallet);
        const px = num(a.price);
        if (px) s.pxUsd[idx] += px * usd;
      }
    }
    const map = new Map();
    for (const [cid, s] of agg) {
      const total = s.usd[0] + s.usd[1];
      if (total < g.minUsd) continue;
      const idx = s.usd[0] >= s.usd[1] ? 0 : 1;
      if (s.usd[idx] / total < 0.7) continue; // whales disagree — no signal
      map.set(cid, {
        index: idx, usd: Math.round(s.usd[idx]), traders: s.traders[idx].size,
        wallets: [...s.traders[idx]].slice(0, 3),
        avgPrice: s.pxUsd[idx] > 0 ? s.pxUsd[idx] / s.usd[idx] : null
      });
    }
    out[g.key] = map;
  }
  return out;
}

/* ---------------- tick: settle then open ---------------- */

function realized(db, strategy) {
  const r = db.prepare("SELECT COALESCE(SUM(pnl),0) p FROM positions WHERE strategy=? AND status='closed'").get(strategy);
  return r.p;
}
function openStake(db, strategy) {
  const r = db.prepare("SELECT COALESCE(SUM(stake),0) s, COUNT(*) n FROM positions WHERE strategy=? AND status='open'").get(strategy);
  return { stake: r.s, n: r.n };
}

async function settleOpenPositions(db) {
  const open = db.prepare("SELECT DISTINCT market_id FROM positions WHERE status='open'").all();
  let settled = 0;
  const raws = await pmap(open, 10, (row) => fetchJson(GAMMA + "/markets/" + row.market_id));
  for (let i = 0; i < open.length; i++) {
    const row = open[i];
    const raw = raws[i];
    if (!raw || Array.isArray(raw)) continue;
    let prices = null;
    try { prices = JSON.parse(raw.outcomePrices); } catch (e) {}
    const yesPrice = prices ? num(prices[0]) : null;
    const positions = db.prepare("SELECT * FROM positions WHERE status='open' AND market_id=?").all(row.market_id);

    const isResolved = raw.closed === true && yesPrice !== null && (yesPrice >= 0.95 || yesPrice <= 0.05);
    const endMs = raw.endDate ? Date.parse(raw.endDate) : NaN;
    const longExpired = Number.isFinite(endMs) && Date.now() > endMs + FORCE_CLOSE_DAYS * 86400000;

    for (const p of positions) {
      if (isResolved) {
        const yesWon = yesPrice >= 0.95;
        const won = (p.side === "yes") === yesWon;
        const pnl = won ? p.shares - p.stake : -p.stake;
        db.prepare("UPDATE positions SET status='closed', exit=?, closed_at=?, pnl=?, close_reason='resolved' WHERE id=?")
          .run(won ? 1 : 0, new Date().toISOString(), Math.round(pnl * 100) / 100, p.id);
        settled++;
      } else if (raw.closed === true || longExpired) {
        // closed without clean resolution, or resolution never arrived: mark out at last price
        const mark = yesPrice !== null ? (p.side === "yes" ? yesPrice : 1 - yesPrice) : p.entry;
        const pnl = p.shares * mark - p.stake;
        db.prepare("UPDATE positions SET status='closed', exit=?, closed_at=?, pnl=?, close_reason=? WHERE id=?")
          .run(mark, new Date().toISOString(), Math.round(pnl * 100) / 100, longExpired ? "expired_unresolved" : "closed_unclear", p.id);
        settled++;
      } else if (yesPrice !== null) {
        const mark = p.side === "yes" ? yesPrice : 1 - yesPrice;
        db.prepare("UPDATE positions SET last_mark=? WHERE id=?").run(mark, p.id);
      }
    }
  }
  return settled;
}

function openNewPositions(db, universe, whales) {
  let opened = 0;
  const now = new Date().toISOString();
  for (const [name, pick] of Object.entries(STRATEGIES)) {
    let budgetLeft = BANKROLL + realized(db, name) - openStake(db, name).stake;
    let slots = Math.min(MAX_NEW_PER_TICK, MAX_OPEN - openStake(db, name).n);
    for (const m of universe) {
      if (slots <= 0 || budgetLeft < STAKE) break;
      const dup = db.prepare("SELECT 1 FROM positions WHERE strategy=? AND market_id=? AND status='open'").get(name, m.id);
      if (dup) continue;
      const ctx = {
        whale: (whales.top && whales.top.get(m.conditionId)) || null,
        pro: (whales.pro && whales.pro.get(m.conditionId)) || null,
        month: (whales.month && whales.month.get(m.conditionId)) || null,
        ai: (whales.ai && whales.ai.get(m.conditionId)) || null
      };
      const res = pick(m, ctx);
      if (!res) continue;
      const side = typeof res === "string" ? res : res.side;
      const stakeAmt = typeof res === "object" && res.stake ? res.stake : STAKE;
      if (!side || budgetLeft < stakeAmt) continue;
      // buy at the ask of the chosen side when the book is available
      const price = side === "yes"
        ? (m.ask !== null ? m.ask : m.yes)
        : (m.bid !== null ? 1 - m.bid : 1 - m.yes);
      if (price <= 0.01 || price >= 0.99) continue;
      const shares = stakeAmt / price;
      const outcomeName = side === "yes" ? m.outcomes[0] : m.outcomes[1];
      // the price the SIGNAL saw (mid) vs the price we actually pay (ask):
      // the difference is the execution cost, and it is measured per bet
      const signalPrice = side === "yes" ? m.yes : 1 - m.yes;
      // record WHICH whales triggered copy-family bets → per-whale attribution later
      const sig = ctx.whale && (name === "copy_top" || name === "whale_fade" || name === "super") ? ctx.whale
        : ctx.pro && name === "copy_pro" ? ctx.pro : null;
      const sigMeta = sig && sig.wallets ? sig.wallets.join(",") : null;
      db.prepare(`INSERT INTO positions(strategy, market_id, question, tag, side, entry, stake, shares, opened_at, end_date, last_mark, outcome_name, condition_id, signal_meta, signal_price, spread_at_entry)
                  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
        .run(name, m.id, m.question, tag(m.question), side, Math.round(price * 10000) / 10000, stakeAmt,
             Math.round(shares * 100) / 100, now, m.endDate, Math.round(price * 10000) / 10000, outcomeName, m.conditionId, sigMeta,
             Math.round(signalPrice * 10000) / 10000, m.spread === null ? null : Math.round(m.spread * 10000) / 10000);
      opened++; slots--; budgetLeft -= stakeAmt;
    }
  }
  return opened;
}

/* keep the synced db small — it is committed on every tick, so growth
   directly bloats the repo. Old closed positions and equity points are
   already summarized in RESULTS.md and results.json. */
function pruneDb(db) {
  try {
    const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
    db.prepare("DELETE FROM positions WHERE status='closed' AND closed_at < ?").run(cutoff);
    db.prepare("DELETE FROM equity WHERE ts < ?").run(cutoff);
    db.prepare("DELETE FROM ticks WHERE ts < ?").run(cutoff);
  } catch (e) { /* next tick */ }
}

function snapshotEquity(db) {
  const ts = new Date().toISOString();
  for (const name of Object.keys(STRATEGIES)) {
    const real = realized(db, name);
    const os = openStake(db, name);
    const mv = db.prepare("SELECT COALESCE(SUM(shares * COALESCE(last_mark, entry)),0) v FROM positions WHERE strategy=? AND status='open'").get(name).v;
    db.prepare("INSERT INTO equity(ts,strategy,realized,open_stake,open_value,equity,open_n) VALUES(?,?,?,?,?,?,?)")
      .run(ts, name, r2(real), r2(os.stake), r2(mv), r2(BANKROLL + real - os.stake + mv), os.n);
  }
}
const r2 = (v) => Math.round(v * 100) / 100;

async function tick() {
  const db = openDb();
  const settled = await settleOpenPositions(db);
  let universe = [];
  let note = "";
  try { universe = await fetchUniverse(); }
  catch (e) { note = "universe fetch failed: " + e.message; }
  const whales = await fetchWhaleData();
  // local-AI opinions, if the reasoner is running on this machine
  whales.ai = new Map();
  try {
    const aj = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "reasoner", "data", "ai-scores.json"), "utf8"));
    for (const s of aj.scores || []) if (s.conditionId) whales.ai.set(s.conditionId, s);
  } catch (e) { /* reasoner not running — ai_judge simply stays quiet */ }
  note += (note ? " | " : "") + "whale signals top/pro/month/ai: " + whales.top.size + "/" + whales.pro.size + "/" + whales.month.size + "/" + whales.ai.size;
  const opened = universe.length ? openNewPositions(db, universe, whales) : 0;
  pruneDb(db);
  snapshotEquity(db);
  db.prepare("INSERT INTO ticks(ts, markets_seen, opened, settled, note) VALUES(?,?,?,?,?)")
    .run(new Date().toISOString(), universe.length, opened, settled, note);
  console.log(`tick done: ${universe.length} markets seen, ${opened} positions opened, ${settled} settled${note ? " | " + note : ""}`);
  report(db);
  return { opened, settled };
}

/* ---------------- fast loop (run on your own machine / a VPS) ----------------
   Ticks continuously. Pushes to the repo only when a bet opened or settled,
   so the live page updates within seconds of real activity. Safe alongside
   the GitHub Actions cron: ticks are idempotent replays, so on any git
   conflict we reset to the remote and simply re-tick. */
const REPO_DIR = path.join(__dirname, "..");
function sh(cmd) {
  try { return { ok: true, out: execSync(cmd, { cwd: REPO_DIR, stdio: "pipe" }).toString() }; }
  catch (e) { return { ok: false, out: String((e.stderr || e.stdout || e.message)) }; }
}

async function loop(intervalSec) {
  console.log("fast loop: tick every " + intervalSec + "s, pushing when bets open or settle. Ctrl+C stops it.");
  process.env.PM_SOURCE = "runner"; // stamps the feed so viewers can tell runner data from cloud-backup data
  let lastPush = 0;
  const headRes = sh("git rev-parse HEAD");
  const loopStartHead = headRes.ok ? headRes.out.trim() : null;
  for (;;) {
    const pull = sh("git pull --rebase --autostash origin main");
    if (!pull.ok) {
      console.log("pull failed, resetting to remote:", pull.out.slice(0, 120));
      sh("git fetch origin main"); sh("git reset --hard origin/main");
    }
    // self-refresh: if the pull brought new code, exit — the app restarts us
    // on the new version within 15s. Works even when app-level restart fails.
    const nowHead = sh("git rev-parse HEAD");
    if (loopStartHead && nowHead.ok && nowHead.out.trim() !== loopStartHead) {
      console.log("new code pulled (" + nowHead.out.trim().slice(0, 7) + ") — exiting for restart");
      process.exit(0);
    }
    let counts = { opened: 0, settled: 0 };
    try { counts = await tick(); } catch (e) { console.error("tick failed:", e.message); }
    // push on activity, or a heartbeat push every 20 min so the cloud cron
    // knows a live Runner exists and skips its own tick
    if (counts.opened > 0 || counts.settled > 0 || Date.now() - lastPush > 10 * 60000) {
      sh("git add tester/data/polymark.db tester/data/results.json RESULTS.md");
      sh("git add collector/data/latency.json collector/data/collector-status.json"); // latency report + health (raw db stays local)
      sh("git add reasoner/data/ai-scores.json"); // local-AI opinions for the AI tab
      sh('git commit -m "tick: ' + new Date().toISOString() + '"');
      let push = sh("git push origin main");
      if (!push.ok) {
        sh("git pull --rebase -X theirs origin main"); // keep our freshly-ticked db
        push = sh("git push origin main");
        if (!push.ok) { console.log("push conflict, resetting; next tick replays"); sh("git fetch origin main"); sh("git reset --hard origin/main"); }
      }
      if (push.ok) { lastPush = Date.now(); console.log("pushed — live view updates in ~1 min"); }
    }
    // interval override from repo file — cadence changes ship via git,
    // no app update needed
    let iv = intervalSec;
    try {
      const t = parseInt(fs.readFileSync(path.join(REPO_DIR, "tester", "interval.txt"), "utf8"), 10);
      if (t >= 10 && t <= 600) iv = t;
    } catch (e) { /* no override file */ }
    await sleep(iv * 1000);
  }
}

/* ---------------- report ---------------- */

function strategyStats(db, name) {
  const c = db.prepare(`SELECT COUNT(*) n, COALESCE(SUM(pnl),0) pnl,
      SUM(CASE WHEN pnl > 0 THEN 1 ELSE 0 END) wins,
      COALESCE(SUM(stake),0) staked
    FROM positions WHERE strategy=? AND status='closed'`).get(name);
  const os = openStake(db, name);
  const mv = db.prepare("SELECT COALESCE(SUM(shares * COALESCE(last_mark, entry)),0) v FROM positions WHERE strategy=? AND status='open'").get(name).v;
  const topWin = db.prepare("SELECT COALESCE(MAX(pnl),0) t FROM positions WHERE strategy=? AND status='closed'").get(name).t;
  return {
    name, closed: c.n, wins: c.wins || 0,
    winRate: c.n ? Math.round(100 * (c.wins || 0) / c.n) : null,
    realized: r2(c.pnl),
    roiClosed: c.staked ? r2(100 * c.pnl / c.staked) : null,
    topWin: r2(topWin),
    exTopWin: r2(c.pnl - topWin), // profit with the single best trade removed — luck detector
    open: os.n, openValue: r2(mv), openStake: r2(os.stake),
    equity: r2(BANKROLL + c.pnl - os.stake + mv)
  };
}

function report(db) {
  db = db || openDb();
  const ticks = db.prepare("SELECT COUNT(*) n, MAX(ts) last FROM ticks").get();
  const active = Object.keys(STRATEGIES);
  const inDb = db.prepare("SELECT DISTINCT strategy s FROM positions").all().map((r) => r.s);
  const allNames = [...new Set([...active, ...inDb])];
  const rows = allNames.map((n) => ({ ...strategyStats(db, n), retired: !active.includes(n) }))
    .sort((a, b) => (a.retired === b.retired ? b.equity - a.equity : a.retired ? 1 : -1));

  const pad = (s, w) => String(s).padEnd(w);
  console.log("\nstrategy          closed wins  wr    realized   roi     open  equity");
  for (const s of rows) {
    console.log(pad(s.name, 18) + pad(s.closed, 7) + pad(s.wins, 6) + pad(s.winRate === null ? "-" : s.winRate + "%", 6) +
      pad("$" + s.realized, 11) + pad(s.roiClosed === null ? "-" : s.roiClosed + "%", 8) + pad(s.open, 6) + "$" + s.equity);
  }

  const md = [];
  md.push("# Polymark paper-trading results");
  md.push("");
  md.push("**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $" + BANKROLL.toLocaleString() + " and bets $" + STAKE + " per position on markets resolving within " + MAX_DAYS + " days.");
  md.push("");
  md.push("Ticks: " + ticks.n + " · Last run: " + (ticks.last || "never") + " · Database: `tester/data/polymark.db`");
  md.push("");
  md.push("| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |");
  md.push("|---|---|---|---|---|---|---|---|");
  for (const s of rows) {
    const unreal = Math.round((s.openValue - s.openStake) * 100) / 100;
    md.push(`| ${s.name}${s.retired ? " (retired)" : ""} | **$${s.equity}** | $${s.realized} | $${unreal} | ${s.closed} | ${s.winRate === null ? "—" : s.winRate + "%"} | $${s.exTopWin} | ${s.open} |`);
  }
  md.push("");
  md.push("**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.");
  md.push("");
  md.push("**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.");
  md.push("");
  md.push("### Active strategies");
  md.push("- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)");
  md.push("- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)");
  md.push("- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)");
  md.push("- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)");
  md.push("- **mm_slow** — mid_momentum, only markets resolving in 2+ days");
  md.push("- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢");
  md.push("- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢");
  md.push("- **momentum** — buys whichever side moved ≥5¢ in 24h");
  md.push("- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side)");
  md.push("- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite");
  md.push("- **copy_top** — mirrors top-10 leaderboard wallets' pregame buys (in-play skipped)");
  md.push("- **copy_pro** — copy trading with all refinements: filtered wallets, 6h freshness, no chasing, conviction stakes");
  md.push("- **whale_fade** — bets against copy_top's picks (its control)");
  md.push("- **ai_judge** — bets when a local model (Ollama on the runner) disagrees with the market by >4¢ after costs; the AI's skill is judged like any other strategy");
  md.push("- **random_control** — coin flips, the baseline every strategy must beat");
  md.push("");
  md.push("Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.");
  md.push("");
  md.push("_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_");
  fs.writeFileSync(RESULTS_PATH, md.join("\n") + "\n");

  /* JSON feed for the live web view (served via GitHub Pages) */
  const recent = db.prepare(`SELECT strategy, side, entry, pnl, close_reason, closed_at, question, tag, outcome_name
    FROM positions WHERE status='closed' ORDER BY closed_at DESC LIMIT 1000`).all();
  const openPos = db.prepare(`SELECT strategy, side, entry, stake, shares, opened_at, end_date, last_mark, question, tag, outcome_name
    FROM positions WHERE status='open' ORDER BY end_date ASC`).all();
  /* Per-strategy equity curves covering the FULL retained history, each
     downsampled to ~120 points. A flat global row cap made every curve span
     only the last few minutes, so chart and table disagreed. */
  const POINTS = 120;
  const equitySeries = [];
  const strategyNames = db.prepare("SELECT DISTINCT strategy s FROM equity").all().map((r) => r.s);
  for (const s of strategyNames) {
    const all = db.prepare("SELECT ts, strategy, equity, realized FROM equity WHERE strategy=? ORDER BY ts").all(s);
    if (!all.length) continue;
    const step = Math.max(1, Math.floor(all.length / POINTS));
    for (let i = 0; i < all.length; i += step) equitySeries.push(all[i]);
    const last = all[all.length - 1];
    if (equitySeries[equitySeries.length - 1] !== last) equitySeries.push(last);
  }
  fs.writeFileSync(path.join(DATA_DIR, "results.json"), JSON.stringify({
    generated_at: new Date().toISOString(),
    source: process.env.PM_SOURCE || "cloud",
    ticks: ticks.n, last_tick: ticks.last,
    bankroll: BANKROLL, stake: STAKE,
    strategies: rows, recent: recent, open: openPos,
    equity: equitySeries
  }));
  console.log("\nRESULTS.md + results.json written.");
}

/* ---------------- main ---------------- */

/* When spawned by the desk app, die if the app dies — no zombie loops
   overwriting data with stale code after an app update */
if (process.argv.includes("--managed")) {
  const parentPid = process.ppid;
  setInterval(() => {
    try { process.kill(parentPid, 0); }
    catch (e) { console.log("parent app gone — exiting"); process.exit(0); }
  }, 30000);
}

const cmd = process.argv[2] || "tick";
if (cmd === "tick") {
  tick().catch((e) => { console.error("tick failed:", e); process.exit(1); });
} else if (cmd === "loop") {
  const interval = Math.max(60, parseInt(process.argv[3] || "120", 10));
  loop(interval).catch((e) => { console.error("loop crashed:", e); process.exit(1); });
} else if (cmd === "report") {
  report();
} else if (cmd === "reset") {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  console.log("database wiped");
} else {
  console.log("usage: node tester/index.js [tick|report|reset]");
  process.exit(1);
}
