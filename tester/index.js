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

const SPORT_RE = /\b(vs\.?|@)\b|NBA|NFL|NHL|MLB|UFC|Premier League|La Liga|Serie A|Bundesliga|Champions League|Grand Prix|F1|ATP|WTA|LoL|Dota|Counter-Strike|CS2|Valorant|tennis|Wimbledon|playoff|Super Bowl|World Series|spread|moneyline/i;
const POLITICS_RE = /election|president|senate|parliament|minister|congress|governor|nominee|referendum|impeach/i;
const CRYPTO_RE = /bitcoin|BTC|ethereum|ETH|solana|crypto|token|\$\d+k/i;

/* Each strategy maps a market snapshot to 'yes' | 'no' | null.
   'yes' means the FIRST listed outcome (literally "Yes" in Yes/No markets;
   team A in team-vs-team markets). ctx carries whale-copy signals.
   m = { yes, bid, ask, change24, liq, vol24, days, outcomes } */
const STRATEGIES = {
  favorite:      (m) => (m.yes >= 0.60 && m.yes <= 0.90 ? "yes" : m.yes <= 0.40 && m.yes >= 0.10 ? "no" : null),
  longshot:      (m) => (m.yes <= 0.10 && m.yes >= 0.02 ? "yes" : m.yes >= 0.90 && m.yes <= 0.98 ? "no" : null),
  fade_longshot: (m) => (m.yes <= 0.10 && m.yes >= 0.02 ? "no" : m.yes >= 0.90 && m.yes <= 0.98 ? "yes" : null),
  momentum:      (m) => (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null),
  mean_revert:   (m) => (m.change24 >= 0.08 ? "no" : m.change24 <= -0.08 ? "yes" : null),
  late_favorite: (m) => (m.days <= 2 ? (m.yes >= 0.70 && m.yes <= 0.93 ? "yes" : m.yes >= 0.07 && m.yes <= 0.30 ? "no" : null) : null),
  copy_top:      (m, ctx) => (ctx.whale ? (ctx.whale.index === 0 ? "yes" : "no") : null),
  whale_fade:    (m, ctx) => (ctx.whale ? (ctx.whale.index === 0 ? "no" : "yes") : null),
  /* copy_top variant 1 — every improvement at once: efficiency-filtered wallet
     pool, 6h freshness, refuses to chase a price that ran >5¢ past the whales'
     own average entry, and sizes stake ($100-250) by conviction. */
  copy_pro: (m, ctx) => {
    const s = ctx.pro;
    if (!s) return null;
    const cur = s.index === 0 ? m.yes : 1 - m.yes;
    if (s.avgPrice !== null && cur - s.avgPrice > 0.05) return null; // too late — whales got a better price
    let stake = STAKE;
    if (s.traders >= 2) stake += 50;
    if (s.usd >= 3000) stake += 50;
    if (s.usd >= 8000) stake += 50;
    return { side: s.index === 0 ? "yes" : "no", stake: Math.min(250, stake) };
  },
  /* copy_top variant 2 — identical rules, different wallet group: the top-10
     of the MONTHLY leaderboard (in-form traders) instead of all-time. */
  copy_month:    (m, ctx) => (ctx.month ? (ctx.month.index === 0 ? "yes" : "no") : null),
  /* momentum, repaired: only trade where payoffs are symmetric (30-70¢).
     Plain momentum won 75% of its bets and still lost money buying 95¢ sides. */
  mid_momentum:  (m) => (m.yes >= 0.30 && m.yes <= 0.70 ? (m.change24 >= 0.05 ? "yes" : m.change24 <= -0.05 ? "no" : null) : null),
  /* mean_revert, repaired: only buy a knocked-down side that is STILL the
     favourite. Plain mean_revert died buying dying longshots. */
  strong_dip:    (m) => (m.change24 <= -0.10 && m.yes >= 0.50 ? "yes" : m.change24 >= 0.10 && m.yes <= 0.50 ? "no" : null),
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
  for (const col of ["outcome_name TEXT", "condition_id TEXT"]) {
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
  return {
    id: String(raw.id),
    conditionId: raw.conditionId || "",
    question: raw.question || raw.slug || "?",
    outcomes: [String(outcomes[0]), String(outcomes[1])],
    yes, bid, ask, spread,
    change24: num(raw.oneDayPriceChange) ?? 0,
    liq, vol24, days,
    endDate: raw.endDate
  };
}

async function fetchUniverse() {
  const out = [];
  for (let page = 0; page < 3; page++) {
    const batch = await fetchJson(GAMMA + "/markets?closed=false&order=volume24hr&ascending=false&limit=100&offset=" + page * 100);
    if (!Array.isArray(batch) || !batch.length) break;
    for (const raw of batch) {
      const m = parseMarket(raw);
      if (!m) continue;
      if (m.liq < MIN_LIQ || m.vol24 < MIN_VOL24) continue;
      if (m.spread !== null && m.spread > MAX_SPREAD) continue;
      if (m.days < 0.02 || m.days > MAX_DAYS) continue;
      out.push(m);
    }
    await sleep(300);
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
  for (const w of activity.keys()) {
    try { activity.set(w, await fetchJson(DATA_API + "/activity?user=" + w + "&limit=100&type=TRADE")); }
    catch (e) { /* skip this wallet this tick */ }
    await sleep(150);
  }
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
  for (const row of open) {
    let raw;
    try { raw = await fetchJson(GAMMA + "/markets/" + row.market_id); }
    catch (e) { continue; } // transient failure: try again next tick
    await sleep(100);
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
        month: (whales.month && whales.month.get(m.conditionId)) || null
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
      db.prepare(`INSERT INTO positions(strategy, market_id, question, tag, side, entry, stake, shares, opened_at, end_date, last_mark, outcome_name, condition_id)
                  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`)
        .run(name, m.id, m.question, tag(m.question), side, Math.round(price * 10000) / 10000, stakeAmt,
             Math.round(shares * 100) / 100, now, m.endDate, Math.round(price * 10000) / 10000, outcomeName, m.conditionId);
      opened++; slots--; budgetLeft -= stakeAmt;
    }
  }
  return opened;
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
  note += (note ? " | " : "") + "whale signals top/pro/month: " + whales.top.size + "/" + whales.pro.size + "/" + whales.month.size;
  const opened = universe.length ? openNewPositions(db, universe, whales) : 0;
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
  let lastPush = 0;
  for (;;) {
    const pull = sh("git pull --rebase --autostash origin main");
    if (!pull.ok) {
      console.log("pull failed, resetting to remote:", pull.out.slice(0, 120));
      sh("git fetch origin main"); sh("git reset --hard origin/main");
    }
    let counts = { opened: 0, settled: 0 };
    try { counts = await tick(); } catch (e) { console.error("tick failed:", e.message); }
    // push on activity, or a heartbeat push every 20 min so the cloud cron
    // knows a live Runner exists and skips its own tick
    if (counts.opened > 0 || counts.settled > 0 || Date.now() - lastPush > 20 * 60000) {
      sh("git add tester/data/polymark.db tester/data/results.json RESULTS.md");
      sh("git add collector/data/whales.db"); // whale/latency data, when the collector runs
      sh('git commit -m "tick: ' + new Date().toISOString() + '"');
      let push = sh("git push origin main");
      if (!push.ok) {
        sh("git pull --rebase -X theirs origin main"); // keep our freshly-ticked db
        push = sh("git push origin main");
        if (!push.ok) { console.log("push conflict, resetting; next tick replays"); sh("git fetch origin main"); sh("git reset --hard origin/main"); }
      }
      if (push.ok) { lastPush = Date.now(); console.log("pushed — live view updates in ~1 min"); }
    }
    await sleep(intervalSec * 1000);
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
  const rows = Object.keys(STRATEGIES).map((n) => strategyStats(db, n))
    .sort((a, b) => b.equity - a.equity);

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
  md.push("| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |");
  md.push("|---|---|---|---|---|---|---|---|---|");
  for (const s of rows) {
    md.push(`| ${s.name} | ${s.closed} | ${s.wins} | ${s.winRate === null ? "—" : s.winRate + "%"} | $${s.realized} | ${s.roiClosed === null ? "—" : s.roiClosed + "%"} | $${s.exTopWin} | ${s.open} | $${s.equity} |`);
  }
  md.push("");
  md.push("**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.");
  md.push("");
  md.push("### Strategies");
  md.push("- **favorite** — buys the likely side (60–90¢)");
  md.push("- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.");
  md.push("- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.");
  md.push("- **momentum** — buys whichever side moved ≥5¢ in 24h");
  md.push("- **mean_revert** — fades ≥8¢ 24h moves");
  md.push("- **late_favorite** — buys 70–93¢ favourites within 2 days of resolution");
  md.push("- **copy_top** — mirrors what the top-10 leaderboard wallets bought in the last 24h (≥$500, ≥70% agreement)");
  md.push("- **copy_pro** — copy trading with everything turned on: efficiency-filtered top-25 wallets, 6h freshness, refuses to chase prices that ran >5¢ past the whales' entry, conviction-scaled stakes ($100–250)");
  md.push("- **copy_month** — copy_top's exact rules, but following the top-10 of the MONTHLY leaderboard (in-form traders)");
  md.push("- **whale_fade** — bets against copy_top's picks (the control for copy_top)");
  md.push("- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (momentum won 75% of bets and still lost money buying 95¢ sides)");
  md.push("- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite (mean_revert died buying dying longshots; this only catches falling *leaders*)");
  md.push("- **random_control** — coin flips, the baseline every strategy must beat");
  md.push("");
  md.push("_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_");
  fs.writeFileSync(RESULTS_PATH, md.join("\n") + "\n");

  /* JSON feed for the live web view (served via GitHub Pages) */
  const recent = db.prepare(`SELECT strategy, side, entry, pnl, close_reason, closed_at, question, tag, outcome_name
    FROM positions WHERE status='closed' ORDER BY closed_at DESC LIMIT 1000`).all();
  const openPos = db.prepare(`SELECT strategy, side, entry, stake, shares, opened_at, end_date, last_mark, question, tag, outcome_name
    FROM positions WHERE status='open' ORDER BY end_date ASC`).all();
  const equitySeries = db.prepare("SELECT ts, strategy, equity FROM equity ORDER BY ts").all();
  fs.writeFileSync(path.join(DATA_DIR, "results.json"), JSON.stringify({
    generated_at: new Date().toISOString(),
    ticks: ticks.n, last_tick: ticks.last,
    bankroll: BANKROLL, stake: STAKE,
    strategies: rows, recent: recent, open: openPos,
    equity: equitySeries.slice(-720)
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
