#!/usr/bin/env node
/* Polymark whale collector — drinks Polymarket's public real-time trade
   firehose (wss://ws-live-data.polymarket.com, no auth), keeps only trades
   made by leaderboard whale wallets, and logs each one with orderbook
   snapshots at increasing delays. This passively builds the latency lab:
   what would copying this trade have cost at +2s, +30s, +2min, +5min...?

   Read-only public data. Fake money project. No wallet, no keys, no orders.

   Usage:
     node collector/index.js           # run forever (Ctrl+C stops)
     node collector/index.js stats     # what has been captured
     node collector/index.js analyze   # the latency answer: cost of copying late
*/
"use strict";

const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "whales.db");
const WS_URL = "wss://ws-live-data.polymarket.com";
const DATA_API = "https://data-api.polymarket.com";
const CLOB = "https://clob.polymarket.com";

const SNAP_DELAYS = [0, 2, 30, 120, 300, 900, 3600]; // seconds after detection
const WHALE_REFRESH_MS = 6 * 3600000;   // re-pull leaderboards every 6h
const RECONCILE_MS = 5 * 60000;         // REST catch-up sweep every 5 min
const WATCHDOG_MS = 60000;              // reconnect if silent for 60s
const PING_MS = 5000;                   // protocol keepalive

function openDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS whale_trades(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tx_hash TEXT, wallet TEXT NOT NULL, name TEXT,
      condition_id TEXT, asset TEXT, event_slug TEXT, title TEXT,
      outcome TEXT, outcome_index INTEGER,
      side TEXT, price REAL, size REAL, usd REAL,
      trade_ts INTEGER, detected_ts INTEGER NOT NULL,
      source TEXT NOT NULL,
      UNIQUE(tx_hash, asset, wallet, side, size)
    );
    CREATE TABLE IF NOT EXISTS snaps(
      trade_id INTEGER NOT NULL, delay_s INTEGER NOT NULL, ts INTEGER,
      best_bid REAL, best_ask REAL, mid REAL, bid_depth5 REAL, ask_depth5 REAL,
      PRIMARY KEY(trade_id, delay_s)
    );
    CREATE TABLE IF NOT EXISTS collector_stats(
      ts INTEGER, msgs INTEGER, whale_hits INTEGER, reconnects INTEGER, wallets INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_wt_wallet ON whale_trades(wallet);
    CREATE INDEX IF NOT EXISTS idx_wt_detected ON whale_trades(detected_ts);
  `);
  return db;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (x) => { const v = typeof x === "string" ? parseFloat(x) : x; return Number.isFinite(v) ? v : null; };

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "polymark-collector (fake money, read-only)", Accept: "application/json" },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error("HTTP " + res.status + " " + url);
  return res.json();
}

/* ---------------- whale wallet set ---------------- */

let WHALES = new Map(); // lowercased wallet -> display name

async function refreshWhales() {
  const next = new Map();
  for (const url of ["/v1/leaderboard?window=all&limit=25", "/v1/leaderboard?window=month&limit=10"]) {
    try {
      const board = await fetchJson(DATA_API + url);
      if (Array.isArray(board)) for (const u of board) {
        if (u.proxyWallet) next.set(String(u.proxyWallet).toLowerCase(), u.userName || u.proxyWallet.slice(0, 10));
      }
    } catch (e) { console.error("leaderboard fetch failed:", e.message); }
    await sleep(300);
  }
  if (next.size) { WHALES = next; console.log(new Date().toISOString(), "tracking", WHALES.size, "whale wallets"); }
}

/* ---------------- orderbook snapshots ---------------- */

async function takeSnap(db, tradeId, asset, delayS) {
  try {
    const book = await fetchJson(CLOB + "/book?token_id=" + asset);
    const bids = Array.isArray(book.bids) ? book.bids : [];
    const asks = Array.isArray(book.asks) ? book.asks : [];
    const bb = bids.reduce((m, l) => Math.max(m, num(l.price) ?? 0), 0) || null;
    const ba = asks.reduce((m, l) => Math.min(m, num(l.price) ?? 1), 1);
    const depth = (levels, best, sign) => levels
      .filter((l) => best !== null && Math.abs((num(l.price) ?? 0) - best) <= 0.05)
      .reduce((s, l) => s + (num(l.size) ?? 0), 0);
    db.prepare(`INSERT OR IGNORE INTO snaps(trade_id, delay_s, ts, best_bid, best_ask, mid, bid_depth5, ask_depth5)
                VALUES(?,?,?,?,?,?,?,?)`)
      .run(tradeId, delayS, Date.now(), bb, ba === 1 && !asks.length ? null : ba,
           bb !== null && ba !== null ? (bb + ba) / 2 : null,
           Math.round(depth(bids, bb) * 100) / 100, Math.round(depth(asks, ba) * 100) / 100);
  } catch (e) { /* snapshot missed — the row simply stays absent */ }
}

function scheduleSnaps(db, tradeId, asset) {
  for (const d of SNAP_DELAYS) {
    setTimeout(() => { takeSnap(db, tradeId, asset, d); }, d * 1000);
  }
}

/* ---------------- trade recording ---------------- */

function recordTrade(db, p, source) {
  const wallet = String(p.proxyWallet || "").toLowerCase();
  if (!wallet || !WHALES.has(wallet)) return false;
  const price = num(p.price), size = num(p.size);
  const info = db.prepare(`INSERT OR IGNORE INTO whale_trades
      (tx_hash, wallet, name, condition_id, asset, event_slug, title, outcome, outcome_index,
       side, price, size, usd, trade_ts, detected_ts, source)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .run(p.transactionHash || null, wallet, WHALES.get(wallet) || p.name || null,
         p.conditionId || null, p.asset || null, p.eventSlug || null, p.title || p.slug || null,
         p.outcome || null, Number.isInteger(p.outcomeIndex) ? p.outcomeIndex : null,
         p.side || "BUY", price, size, price !== null && size !== null ? Math.round(price * size * 100) / 100 : null,
         num(p.timestamp) ? (p.timestamp > 1e12 ? p.timestamp : p.timestamp * 1000) : null,
         Date.now(), source);
  if (info.changes > 0) {
    const id = info.lastInsertRowid;
    if (p.asset) scheduleSnaps(db, Number(id), p.asset);
    console.log(new Date().toISOString(), "WHALE", WHALES.get(wallet), (p.side || "BUY"), p.outcome, "@", price, "$" + Math.round((price * size) || 0), "|", (p.title || p.eventSlug || "").slice(0, 50));
    return true;
  }
  return false;
}

/* ---------------- REST reconciliation (catches websocket gaps) ---------------- */

async function reconcile(db) {
  let added = 0;
  for (const wallet of WHALES.keys()) {
    try {
      const acts = await fetchJson(DATA_API + "/activity?user=" + wallet + "&limit=25&type=TRADE");
      if (Array.isArray(acts)) for (const a of acts) {
        if (recordTrade(db, { ...a, proxyWallet: wallet }, "rest")) added++;
      }
    } catch (e) { /* next sweep catches it */ }
    await sleep(250);
  }
  if (added) console.log(new Date().toISOString(), "reconciliation recovered", added, "missed trades");
}

/* ---------------- main run loop ---------------- */

async function run() {
  const db = openDb();
  await refreshWhales();
  if (!WHALES.size) { console.error("no whale wallets loaded — check network"); process.exit(1); }
  setInterval(refreshWhales, WHALE_REFRESH_MS);
  setInterval(() => reconcile(db), RECONCILE_MS);

  let msgs = 0, hits = 0, reconnects = 0, lastMsg = Date.now(), ws = null, pingTimer = null;

  setInterval(() => {
    db.prepare("INSERT INTO collector_stats(ts, msgs, whale_hits, reconnects, wallets) VALUES(?,?,?,?,?)")
      .run(Date.now(), msgs, hits, reconnects, WHALES.size);
    console.log(new Date().toISOString(), "alive |", msgs, "msgs/min |", hits, "whale trades total");
    msgs = 0;
  }, 60000);

  function connect(attempt) {
    ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log(new Date().toISOString(), "firehose connected");
      ws.send(JSON.stringify({ action: "subscribe", subscriptions: [{ topic: "activity", type: "trades" }] }));
      attempt = 0;
      clearInterval(pingTimer);
      pingTimer = setInterval(() => { try { ws.send("ping"); } catch (e) {} }, PING_MS);
    };
    ws.onmessage = (ev) => {
      lastMsg = Date.now();
      const raw = typeof ev.data === "string" ? ev.data : "";
      if (!raw || raw === "pong") return;
      msgs++;
      try {
        const m = JSON.parse(raw);
        if (m && m.payload && m.payload.proxyWallet) {
          if (recordTrade(db, m.payload, "ws")) hits++;
        }
      } catch (e) { /* non-JSON frame */ }
    };
    ws.onclose = () => retry();
    ws.onerror = () => { try { ws.close(); } catch (e) {} };
    function retry() {
      clearInterval(pingTimer);
      reconnects++;
      const backoff = Math.min(60000, 1000 * Math.pow(2, Math.min(attempt, 6)));
      console.log(new Date().toISOString(), "disconnected — reconnect in", backoff / 1000 + "s");
      setTimeout(() => connect(attempt + 1), backoff);
    }
  }
  connect(0);

  setInterval(() => {
    if (Date.now() - lastMsg > WATCHDOG_MS) {
      console.log(new Date().toISOString(), "watchdog: feed silent >60s, forcing reconnect");
      lastMsg = Date.now();
      try { ws.close(); } catch (e) {}
    }
  }, 15000);
}

/* ---------------- reporting ---------------- */

function stats() {
  const db = openDb();
  const t = db.prepare("SELECT COUNT(*) n, COUNT(DISTINCT wallet) w, MIN(detected_ts) first, MAX(detected_ts) last FROM whale_trades").get();
  const bySrc = db.prepare("SELECT source, COUNT(*) n FROM whale_trades GROUP BY source").all();
  const snapped = db.prepare("SELECT COUNT(DISTINCT trade_id) n FROM snaps").get();
  console.log("whale trades captured:", t.n, "from", t.w, "wallets");
  if (t.first) console.log("window:", new Date(t.first).toISOString(), "->", new Date(t.last).toISOString());
  console.log("by source:", bySrc.map((r) => r.source + "=" + r.n).join(", ") || "none");
  console.log("trades with snapshots:", snapped.n);
  const top = db.prepare("SELECT name, COUNT(*) n, ROUND(SUM(usd)) usd FROM whale_trades GROUP BY wallet ORDER BY n DESC LIMIT 8").all();
  for (const r of top) console.log("  " + String(r.name).padEnd(24), r.n, "trades  $" + r.usd);
}

function analyze() {
  const db = openDb();
  console.log("Cost of copying late — buy-side whale trades, ask price at each delay vs the whale's own fill:");
  const rows = db.prepare(`
    SELECT s.delay_s, COUNT(*) n,
           ROUND(AVG((s.best_ask - t.price) * 100), 2) avg_chase_cents,
           ROUND(AVG(CASE WHEN s0.mid IS NOT NULL AND s.mid IS NOT NULL
                 THEN (CASE WHEN t.side='BUY' THEN s.mid - s0.mid ELSE s0.mid - s.mid END) * 100 END), 2) avg_drift_cents
    FROM snaps s
    JOIN whale_trades t ON t.id = s.trade_id
    LEFT JOIN snaps s0 ON s0.trade_id = s.trade_id AND s0.delay_s = 0
    WHERE t.side = 'BUY' AND s.best_ask IS NOT NULL
    GROUP BY s.delay_s ORDER BY s.delay_s`).all();
  if (!rows.length) { console.log("no data yet — let the collector run"); return; }
  console.log("delay    trades   chase cost (avg)   price drift in whale's direction");
  for (const r of rows) {
    const d = r.delay_s === 0 ? "instant" : r.delay_s < 60 ? "+" + r.delay_s + "s" : "+" + Math.round(r.delay_s / 60) + "min";
    console.log(d.padEnd(9), String(r.n).padEnd(8), (r.avg_chase_cents + "c").padEnd(18), r.avg_drift_cents === null ? "—" : r.avg_drift_cents + "c");
  }
  console.log("\nchase cost = what a copier pays above the whale's price. drift = whether whale trades predict the price's next move.");
}

/* When spawned by the desk app, die if the app dies — no zombie collectors */
if (process.argv.includes("--managed")) {
  const parentPid = process.ppid;
  setInterval(() => {
    try { process.kill(parentPid, 0); }
    catch (e) { console.log("parent app gone — exiting"); process.exit(0); }
  }, 30000);
}

const cmd = process.argv[2] || "run";
if (cmd === "run") run().catch((e) => { console.error("collector crashed:", e); process.exit(1); });
else if (cmd === "stats") stats();
else if (cmd === "analyze") analyze();
else { console.log("usage: node collector/index.js [run|stats|analyze]"); process.exit(1); }
