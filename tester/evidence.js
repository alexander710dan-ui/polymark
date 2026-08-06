#!/usr/bin/env node
/* EVIDENCE — the honest scoreboard.
 *
 * Three upgrades over a naive win/loss table, each fixing a way this lab has
 * already fooled itself:
 *
 *   1. CLOSING LINE VALUE. Waiting for resolution takes days and adds outcome
 *      noise. CLV asks a faster, cleaner question: after we bet, did the price
 *      move our way? A strategy with real edge beats the closing line whether
 *      or not any single bet wins. Sports betting uses this as the primary
 *      skill metric for exactly this reason.
 *
 *   2. MULTIPLE COMPARISONS. Running 20 strategies and celebrating the best is
 *      how noise gets promoted. With 20 tries, one p<0.05 is expected by luck.
 *      Reported here with Benjamini-Hochberg FDR control and Bonferroni.
 *
 *   3. CORRELATION. Bets on the same event are one bet wearing several hats.
 *      Significance is computed on event-clustered errors, not per-bet, so a
 *      strategy cannot inflate its sample by betting the same game five ways.
 *
 * Usage: node tester/evidence.js
 */
"use strict";
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
const MIN_BETS = 30;

/* ---------- stats helpers ---------- */
function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + z / 2);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 +
    t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
    t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const pOneSided = (z) => 0.5 * erfc(z / Math.SQRT2);
const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;

/* Cluster-robust standard error: group observations by event, so five bets on
   one game count as one independent observation, not five. */
function clusteredStats(rows, valueOf, keyOf) {
  const groups = new Map();
  for (const r of rows) {
    const k = keyOf(r) || ("solo:" + r.id);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(valueOf(r));
  }
  const clusterSums = [];
  let n = 0, total = 0;
  for (const vals of groups.values()) {
    const s = vals.reduce((a, b) => a + b, 0);
    clusterSums.push(s);
    total += s; n += vals.length;
  }
  const G = clusterSums.length;
  const m = total / n;                       // per-bet mean
  // variance of the total, treating clusters as independent
  const clusterMean = total / G;
  const varTotal = clusterSums.reduce((s, c) => s + Math.pow(c - clusterMean, 2), 0) * G / Math.max(1, G - 1);
  const seTotal = Math.sqrt(varTotal);
  return { n, clusters: G, mean: m, total, seTotal, z: seTotal > 0 ? total / seTotal : 0 };
}

/* Benjamini-Hochberg: control the false discovery rate across many tests */
function benjaminiHochberg(items, alpha) {
  const sorted = items.slice().sort((a, b) => a.p - b.p);
  const m = sorted.length;
  let cutoff = -1;
  for (let i = 0; i < m; i++) if (sorted[i].p <= ((i + 1) / m) * alpha) cutoff = i;
  const passing = new Set();
  for (let i = 0; i <= cutoff; i++) passing.add(sorted[i].name);
  return passing;
}

/* ---------- gather ---------- */
const names = db.prepare(
  "SELECT strategy s, COUNT(*) n FROM positions WHERE status='closed' GROUP BY strategy HAVING n>=" + MIN_BETS
).all().map((r) => r.s);

const results = [];
for (const name of names) {
  // OUTCOME evidence: wins versus what the entry prices implied
  const closed = db.prepare(
    "SELECT id, entry, pnl, stake, condition_id, end_date FROM positions WHERE strategy=? AND status='closed' AND entry>0"
  ).all(name);
  const err = (r) => (r.pnl > 0 ? 1 : 0) - r.entry;
  const outcome = clusteredStats(closed, err, (r) => r.condition_id);
  /* Stricter: cluster by RESOLUTION DAY. The post-mortem showed nine "will X
     happen by July 31" bets were really one bet on one deadline — different
     markets, same underlying question. Day-clustering catches that. */
  const byDay = clusteredStats(closed, err, (r) => (r.end_date || "").slice(0, 10) || String(r.id));

  // CLV evidence: did the price move our way while the market was still live?
  const clvRows = db.prepare(
    `SELECT id, entry, clv_mark, condition_id FROM positions
     WHERE strategy=? AND clv_mark IS NOT NULL AND entry>0
       AND clv_mark > 0.02 AND clv_mark < 0.98`
  ).all(name);
  const clv = clvRows.length >= 10 ? clusteredStats(clvRows, (r) => r.clv_mark - r.entry, (r) => r.condition_id) : null;

  // money
  const pnl = closed.reduce((s, r) => s + r.pnl, 0);
  const staked = closed.reduce((s, r) => s + r.stake, 0);

  results.push({
    name, n: outcome.n, clusters: outcome.clusters,
    extraWins: Math.round(outcome.total * 10) / 10,
    zOutcome: outcome.z, pOutcome: pOneSided(outcome.z),
    dayClusters: byDay.clusters, zDay: byDay.z, pDay: pOneSided(byDay.z),
    pnl: Math.round(pnl), roi: staked ? Math.round(1000 * pnl / staked) / 10 : 0,
    clvN: clv ? clv.n : 0,
    clvPerBet: clv ? Math.round(clv.mean * 10000) / 100 : null,   // in cents
    zClv: clv ? clv.z : null, pClv: clv ? pOneSided(clv.z) : null
  });
}

results.sort((a, b) => (b.zClv ?? -99) - (a.zClv ?? -99) || b.zOutcome - a.zOutcome);

/* ---------- multiple-comparison control ---------- */
const M = results.length;
const bonferroni = 0.05 / M;
const bhOutcome = benjaminiHochberg(results.map((r) => ({ name: r.name, p: r.pOutcome })), 0.05);
const bhClv = benjaminiHochberg(results.filter((r) => r.pClv !== null).map((r) => ({ name: r.name, p: r.pClv })), 0.05);

/* ---------- report ---------- */
console.log("EVIDENCE REPORT — " + new Date().toISOString().slice(0, 16).replace("T", " ") + "\n");
console.log("Testing " + M + " strategies at once. A single p<0.05 among " + M +
  " is expected by chance, so the honest bar is Bonferroni p<" + bonferroni.toFixed(4) +
  " or Benjamini-Hochberg FDR control.\n");

console.log("CLOSING LINE VALUE — did the price move our way after we bet? (the fast skill signal)");
console.log("strategy          bets  events   CLV/bet     z      p        verdict");
console.log("-".repeat(92));
for (const r of results) {
  if (r.pClv === null) { console.log(r.name.padEnd(17) + "   — not enough live-price observations yet"); continue; }
  const v = bhClv.has(r.name) ? (r.pClv < bonferroni ? "REAL EDGE (survives Bonferroni)" : "survives FDR control")
    : r.pClv < 0.05 ? "nominally positive, fails multi-test correction"
    : r.zClv > 0 ? "positive but weak" : "no CLV edge";
  console.log(r.name.padEnd(17) + String(r.clvN).padStart(5) + String(r.clusters).padStart(8) +
    ((r.clvPerBet > 0 ? "+" : "") + r.clvPerBet + "c").padStart(10) +
    r.zClv.toFixed(2).padStart(7) + r.pClv.toFixed(4).padStart(9) + "   " + v);
}

console.log("\n\nOUTCOME EVIDENCE — wins beyond what entry prices implied (event-clustered)");
console.log("strategy          bets  events  extra wins     z      p        P&L      verdict");
console.log("-".repeat(100));
for (const r of results) {
  const v = bhOutcome.has(r.name) ? (r.pOutcome < bonferroni ? "REAL EDGE (survives Bonferroni)" : "survives FDR control")
    : r.pOutcome < 0.05 ? "nominal only — fails correction"
    : "indistinguishable from the price";
  console.log(r.name.padEnd(17) + String(r.n).padStart(5) + String(r.clusters).padStart(8) +
    ((r.extraWins > 0 ? "+" : "") + r.extraWins).padStart(12) +
    r.zOutcome.toFixed(2).padStart(7) + r.pOutcome.toFixed(4).padStart(9) +
    ("$" + r.pnl).padStart(9) + "   " + v);
}

console.log("\n\nSAME TEST, CLUSTERED BY RESOLUTION DAY (bets sharing a deadline count once)");
console.log("strategy          bets  days      z      p       verdict");
console.log("-".repeat(80));
for (const r of results.slice(0, 8)) {
  console.log(r.name.padEnd(17) + String(r.n).padStart(5) + String(r.dayClusters).padStart(6) +
    r.zDay.toFixed(2).padStart(7) + r.pDay.toFixed(4).padStart(9) + "   " +
    (r.pDay < bonferroni ? "REAL EDGE" : r.pDay < 0.05 ? "nominal only" : "indistinguishable from the price"));
}

const winners = results.filter((r) => bhClv.has(r.name) || bhOutcome.has(r.name));
console.log("\n" + "=".repeat(100));
console.log(winners.length
  ? "SURVIVES MULTIPLE-COMPARISON CONTROL: " + winners.map((w) => w.name).join(", ")
  : "NOTHING survives multiple-comparison control. No strategy here has demonstrated edge.");

const clustering = results.length ? mean(results.map((r) => r.n / Math.max(1, r.clusters))) : 1;
console.log("Average bets per event: " + clustering.toFixed(2) +
  " — effective sample is ~" + Math.round(100 / clustering) + "% of the raw bet count.");
console.log("=".repeat(100));

/* ---------- fees: the cost that was invisible until 2026-08-03 ---------- */
const FEE_RATE = { sports: 0.05, crypto: 0.07, politics: 0.04, other: 0.05 };
const feeRows = db.prepare("SELECT strategy, tag, entry, shares, stake, pnl, COALESCE(fee,0) fee, COALESCE(is_maker,0) mk FROM positions WHERE status='closed'").all();
const feeAgg = {};
for (const r of feeRows) {
  const a = (feeAgg[r.strategy] = feeAgg[r.strategy] || { n: 0, pnl: 0, feeCharged: 0, feeImplied: 0, stake: 0, makers: 0 });
  a.n++; a.pnl += r.pnl; a.stake += r.stake; a.feeCharged += r.fee; a.makers += r.mk;
  // impute the fee PER BET for taker bets booked before fees existed.
  // (Was gated per strategy, so one fee-booked bet zeroed the whole
  //  strategy's adjustment and the "fee-adjusted" column printed gross.)
  if (!r.mk && r.fee === 0) a.feeImplied += r.shares * (FEE_RATE[r.tag] ?? 0.05) * r.entry * (1 - r.entry);
}
console.log("\n\nFEES — Polymarket charges takers  fee = shares × rate × p × (1−p);  MAKERS PAY ZERO");
console.log("strategy          bets   reported P&L   fees (modelled+implied)   fee-adjusted   ROI");
console.log("-".repeat(94));
for (const r of results.slice(0, 10)) {
  const a = feeAgg[r.name];
  if (!a) continue;
  // pnl already nets fees that WERE booked; subtract only the imputed ones
  const net = a.pnl - a.feeImplied;
  console.log(r.name.padEnd(17) + String(a.n).padStart(5) + ("$" + Math.round(a.pnl)).padStart(15) +
    ("$" + Math.round(a.feeImplied)).padStart(25) + ("$" + Math.round(net)).padStart(15) +
    ((a.stake ? (100 * net / a.stake).toFixed(1) : "0") + "%").padStart(8));
}
console.log("\nA $100 taker bet near 50c pays ~$2.30 in fees — larger than any edge measured here.");
console.log("This is why patient (maker) execution is the most promising remaining experiment.");

/* ---------- patient execution: did avoiding the spread help? ---------- */
const makerPairs = [["maker_sports", "mm_sports"], ["maker_flat", null]];
const mk = db.prepare(`SELECT strategy, SUM(status='filled') filled, SUM(status='expired') expired,
  SUM(status='pending') pending, ROUND(AVG(CASE WHEN status='filled' THEN ask_at_signal - fill_price END)*100,2) saved
  FROM pending_orders GROUP BY strategy`).all();
if (mk.length) {
  console.log("\n\nPATIENT EXECUTION — posting at the bid instead of crossing the spread");
  console.log("strategy         filled  expired  pending  fill rate  spread saved  vs taker twin");
  console.log("-".repeat(96));
  for (const [maker, twin] of makerPairs) {
    const r = mk.find((x) => x.strategy === maker);
    if (!r) continue;
    const done = r.filled + r.expired;
    const me = results.find((x) => x.name === maker), tw = twin ? results.find((x) => x.name === twin) : null;
    const cmp = me && tw ? ((me.roi - tw.roi > 0 ? "+" : "") + (Math.round((me.roi - tw.roi) * 10) / 10) + "% ROI vs " + twin)
      : me ? "no twin" : "no fills yet";
    console.log(maker.padEnd(16) + String(r.filled).padStart(6) + String(r.expired).padStart(9) +
      String(r.pending).padStart(9) + (done ? Math.round(100 * r.filled / done) + "%" : "—").padStart(11) +
      ((r.saved === null ? "—" : "+" + r.saved + "c")).padStart(14) + "   " + cmp);
  }
  console.log("\nAdverse selection is the failure mode to watch: if fills are plentiful but results poor,");
  console.log("we are only getting filled when the market is about to move against us.");
}

/* ---------- pre-registration check ---------- */
try {
  const reg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "strategies", "registry.json"), "utf8"));
  const testing = Object.entries(reg.strategies).filter(([, v]) => (v.status || "").startsWith("TESTING"));
  console.log("\n\nPRE-REGISTERED AND STILL UNDER TEST (" + testing.length + ")");
  for (const [name, v] of testing) {
    const r = results.find((x) => x.name === name);
    console.log("  " + name.padEnd(15) + (r ? (r.n + " bets, p=" + r.pOutcome.toFixed(3)) : "no data yet").padEnd(28) +
      "predicted: " + v.predicts);
  }
} catch (e) { /* registry optional */ }

/* machine-readable for the dashboard */
fs.writeFileSync(path.join(__dirname, "data", "evidence.json"), JSON.stringify({
  generated_at: new Date().toISOString(),
  strategiesTested: M, bonferroniThreshold: bonferroni,
  survivors: winners.map((w) => w.name),
  results: results.map((r) => ({ ...r, fdrOutcome: bhOutcome.has(r.name), fdrClv: bhClv.has(r.name) }))
}, null, 1));
console.log("\nevidence.json written for the dashboard.");
