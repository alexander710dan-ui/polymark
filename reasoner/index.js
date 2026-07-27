#!/usr/bin/env node
/* Polymark reasoner — local AI market scoring via Ollama (http://127.0.0.1:11434).
   Runs on the Runner. Every cycle it asks a small local model to estimate the
   probability of the leading markets, logs every answer, and exports the
   latest scores for the ai_judge shadow strategy and the AI tab.

   Zero cloud calls, zero keys. If Ollama isn't installed it idles politely.

   Usage: node reasoner/index.js run [--managed]
   Mac setup (one time):  brew install ollama && brew services start ollama
                          ollama pull qwen3:4b
*/
"use strict";

const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "ai.db");
const EXPORT_PATH = path.join(DATA_DIR, "ai-scores.json");
const OLLAMA = "http://127.0.0.1:11434";
const GAMMA = "https://gamma-api.polymarket.com";
const CYCLE_MS = 5 * 60000;
const PER_CYCLE = 15;          // markets scored per cycle
const RESCORE_MIN = 60;        // don't re-ask about a market within this window
const MODEL_PREFS = ["qwen3:4b", "qwen3", "qwen2.5:3b", "llama3.2:3b", "phi4-mini", "gemma3:4b", "llama3.2", "qwen2.5"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (x) => { const v = typeof x === "string" ? parseFloat(x) : x; return Number.isFinite(v) ? v : null; };

if (process.argv.includes("--managed")) {
  const parentPid = process.ppid;
  setInterval(() => {
    try { process.kill(parentPid, 0); } catch (e) { process.exit(0); }
  }, 30000);
}

function openDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ai_scores(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL, model TEXT, ms INTEGER,
      market_id TEXT, condition_id TEXT, question TEXT,
      outcome0 TEXT, price_yes REAL, ai_p REAL, reason TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_ai_cond ON ai_scores(condition_id, ts);
  `);
  return db;
}

async function fetchJson(url, opts) {
  const res = await fetch(url, { ...(opts || {}), signal: AbortSignal.timeout(opts && opts.timeoutMs || 20000) });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

async function pickModel() {
  try {
    const tags = await fetchJson(OLLAMA + "/api/tags");
    const names = (tags.models || []).map((m) => m.name);
    if (!names.length) return null;
    for (const p of MODEL_PREFS) {
      const hit = names.find((n) => n === p || n.startsWith(p));
      if (hit) return hit;
    }
    return names[0];
  } catch (e) { return null; }
}

async function candidates(db) {
  const raw = await fetchJson(GAMMA + "/markets?closed=false&order=volume24hr&ascending=false&limit=100");
  const out = [];
  const fresh = Date.now() - RESCORE_MIN * 60000;
  for (const r of Array.isArray(raw) ? raw : []) {
    let outcomes, prices;
    try { outcomes = JSON.parse(r.outcomes); prices = JSON.parse(r.outcomePrices); } catch (e) { continue; }
    if (!Array.isArray(outcomes) || outcomes.length !== 2) continue;
    const yes = num(prices && prices[0]);
    if (yes === null || yes <= 0.03 || yes >= 0.97) continue;
    const end = r.endDate ? Date.parse(r.endDate) : NaN;
    const days = (end - Date.now()) / 86400000;
    if (!Number.isFinite(days) || days < 0.05 || days > 45) continue;
    const gs = r.gameStartTime ? Date.parse(r.gameStartTime) : null;
    if (Number.isFinite(gs) && Date.now() > gs) continue; // never in-play
    if ((num(r.liquidityNum) ?? 0) < 10000 || (num(r.volume24hr) ?? 0) < 2000) continue;
    const recent = db.prepare("SELECT 1 FROM ai_scores WHERE condition_id=? AND ts>? LIMIT 1").get(r.conditionId || "", fresh);
    if (recent) continue;
    out.push({
      id: String(r.id), conditionId: r.conditionId || "", question: r.question || "?",
      outcome0: String(outcomes[0]), outcome1: String(outcomes[1]), yes, days: Math.round(days * 10) / 10
    });
    if (out.length >= PER_CYCLE) break;
  }
  return out;
}

async function score(model, m) {
  const prompt =
    "You estimate probabilities for prediction markets. Be calibrated, not agreeable.\n" +
    "Question: " + m.question + "\n" +
    "Outcomes: \"" + m.outcome0 + "\" vs \"" + m.outcome1 + "\". Resolves in ~" + m.days + " days.\n" +
    "(The market currently prices \"" + m.outcome0 + "\" at " + Math.round(m.yes * 100) + "% — you may disagree.)\n" +
    "Reply ONLY with JSON: {\"p\": <your probability 0..1 that \"" + m.outcome0 + "\" wins>, \"reason\": \"<max 20 words>\"}";
  const t0 = Date.now();
  const res = await fetchJson(OLLAMA + "/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, stream: false, format: "json", options: { temperature: 0, num_predict: 160 } }),
    timeoutMs: 120000
  });
  const ms = Date.now() - t0;
  const j = JSON.parse(res.response);
  const p = num(j.p);
  if (p === null || p < 0 || p > 1) throw new Error("bad probability");
  return { p, reason: String(j.reason || "").slice(0, 160), ms };
}

function exportScores(db) {
  const rows = db.prepare(`
    SELECT a.* FROM ai_scores a
    JOIN (SELECT condition_id, MAX(ts) mt FROM ai_scores GROUP BY condition_id) l
      ON l.condition_id = a.condition_id AND l.mt = a.ts
    ORDER BY a.ts DESC LIMIT 100`).all();
  fs.writeFileSync(EXPORT_PATH, JSON.stringify({
    generated_at: new Date().toISOString(),
    scores: rows.map((r) => ({
      conditionId: r.condition_id, marketId: r.market_id, q: r.question, outcome0: r.outcome0,
      yes: r.price_yes, ai: r.ai_p, reason: r.reason, model: r.model, ms: r.ms, ts: r.ts
    }))
  }));
}

async function run() {
  const db = openDb();
  console.log("reasoner up — looking for Ollama at " + OLLAMA);
  for (;;) {
    const model = await pickModel();
    if (!model) {
      console.log("Ollama not reachable or no models installed — idle. (brew install ollama; ollama pull qwen3:4b)");
      await sleep(CYCLE_MS);
      continue;
    }
    let list = [];
    try { list = await candidates(db); } catch (e) { console.error("candidates failed:", e.message); }
    for (const m of list) {
      try {
        const s = await score(model, m);
        db.prepare(`INSERT INTO ai_scores(ts, model, ms, market_id, condition_id, question, outcome0, price_yes, ai_p, reason)
                    VALUES(?,?,?,?,?,?,?,?,?,?)`)
          .run(Date.now(), model, s.ms, m.id, m.conditionId, m.question, m.outcome0, m.yes, s.p, s.reason);
        console.log("scored", Math.round(s.p * 100) + "% vs mkt " + Math.round(m.yes * 100) + "%", "(" + s.ms + "ms)", "|", m.question.slice(0, 50));
      } catch (e) { console.error("score failed:", e.message, "|", m.question.slice(0, 40)); }
    }
    try { exportScores(db); } catch (e) { console.error("export failed:", e.message); }
    db.prepare("DELETE FROM ai_scores WHERE ts < ?").run(Date.now() - 30 * 86400000);
    await sleep(CYCLE_MS);
  }
}

const cmd = process.argv[2] || "run";
if (cmd === "run") run().catch((e) => { console.error("reasoner crashed:", e); process.exit(1); });
else { console.log("usage: node reasoner/index.js run"); process.exit(1); }
