#!/usr/bin/env node
/* Is it skill or luck? Four independent tests per strategy.

   1. Price-implied expectation — every bet's entry price IS a probability
      forecast. Summing them gives the wins a coin-flipper at those prices
      would expect. Beating it is the raw claim of edge.
   2. Binomial p-value on that comparison — the chance of doing this well
      by luck alone.
   3. Monte Carlo on P&L — replay each strategy's exact bets 20,000 times
      with outcomes drawn at the entry-price probability. Where does the
      real result fall in that distribution?
   4. Bootstrap confidence interval on ROI — resample the bet list with
      replacement to see how wide the plausible range really is.

   Usage: node tester/luck.js [strategy]
*/
"use strict";
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
const only = process.argv[2];
const TRIALS = 20000;
const MIN_BETS = 25;

/* deterministic RNG so repeated runs agree */
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* normal approximation to the binomial tail — good enough at n>=25 */
function pValue(wins, n, p) {
  const mean = n * p, sd = Math.sqrt(n * p * (1 - p));
  if (sd === 0) return 1;
  const z = (wins - 0.5 - mean) / sd;           // continuity-corrected
  return 0.5 * erfc(z / Math.SQRT2);            // one-sided: P(X >= wins)
}
function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + z / 2);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 +
    t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
    t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}

function analyze(name) {
  const bets = db.prepare(
    "SELECT entry, stake, shares, pnl FROM positions WHERE strategy=? AND status='closed' AND entry>0"
  ).all(name);
  if (bets.length < MIN_BETS) return null;

  const n = bets.length;
  const wins = bets.filter((b) => b.pnl > 0).length;
  const staked = bets.reduce((s, b) => s + b.stake, 0);
  const pnl = bets.reduce((s, b) => s + b.pnl, 0);
  // the market's own forecast: entry price = implied probability of winning
  const expWins = bets.reduce((s, b) => s + b.entry, 0);
  const pAvg = expWins / n;

  // 2 — binomial p-value against the price-implied win rate
  const p = pValue(wins, n, pAvg);

  // 3 — Monte Carlo: same bets, outcomes drawn at their entry probabilities
  const rand = rng(20260729);
  let beat = 0, sum = 0, sumSq = 0;
  for (let t = 0; t < TRIALS; t++) {
    let sim = 0;
    for (const b of bets) sim += rand() < b.entry ? b.shares - b.stake : -b.stake;
    sum += sim; sumSq += sim * sim;
    if (sim >= pnl) beat++;
  }
  const mcMean = sum / TRIALS;
  const mcSd = Math.sqrt(Math.max(0, sumSq / TRIALS - mcMean * mcMean));
  const mcP = beat / TRIALS;                 // P(luck alone does this well)

  // 4 — bootstrap ROI confidence interval
  const rand2 = rng(777);
  const rois = [];
  for (let t = 0; t < 4000; t++) {
    let bp = 0, bs = 0;
    for (let i = 0; i < n; i++) {
      const b = bets[(rand2() * n) | 0];
      bp += b.pnl; bs += b.stake;
    }
    rois.push(100 * bp / bs);
  }
  rois.sort((a, b) => a - b);
  const lo = rois[Math.floor(rois.length * 0.05)], hi = rois[Math.floor(rois.length * 0.95)];

  return {
    name, n, wins, expWins: Math.round(expWins * 10) / 10,
    edgeWins: Math.round((wins - expWins) * 10) / 10,
    pnl: Math.round(pnl), roi: Math.round(1000 * pnl / staked) / 10,
    p: p, mcP: mcP, mcMean: Math.round(mcMean), mcSd: Math.round(mcSd),
    ci: [Math.round(lo * 10) / 10, Math.round(hi * 10) / 10]
  };
}

const names = only ? [only]
  : db.prepare("SELECT strategy s, COUNT(*) n FROM positions WHERE status='closed' GROUP BY strategy HAVING n>=" + MIN_BETS)
      .all().map((r) => r.s);

const out = names.map(analyze).filter(Boolean).sort((a, b) => a.mcP - b.mcP);

console.log("SKILL OR LUCK — every bet's entry price is the market's own forecast;\nbeating it consistently is the only evidence of edge.\n");
console.log("strategy         bets   wins  expected  extra   P&L      ROI     luck-beats-this   verdict");
console.log("-".repeat(104));
for (const r of out) {
  const verdict = r.mcP < 0.01 ? "STRONG evidence of skill"
    : r.mcP < 0.05 ? "evidence of skill"
    : r.mcP < 0.20 ? "promising, not conclusive"
    : r.mcP > 0.80 ? "worse than luck"
    : "indistinguishable from luck";
  console.log(
    r.name.padEnd(16) + String(r.n).padStart(4) + String(r.wins).padStart(7) +
    String(r.expWins).padStart(10) + (r.edgeWins > 0 ? "+" : "") + String(r.edgeWins).padStart(7) +
    ("$" + r.pnl).padStart(9) + (r.roi + "%").padStart(8) +
    (Math.round(r.mcP * 1000) / 10 + "%").padStart(15) + "   " + verdict
  );
}

console.log("\n\nDetail — Monte Carlo (20,000 replays of each strategy's own bets at their entry prices)\n");
for (const r of out.slice(0, 6)) {
  const z = r.mcSd ? (r.pnl - r.mcMean) / r.mcSd : 0;
  console.log(r.name.padEnd(16) +
    "luck averages $" + String(r.mcMean).padStart(6) + " ±" + String(r.mcSd).padStart(4) +
    "  ·  actual $" + String(r.pnl).padStart(6) +
    "  ·  " + (z >= 0 ? "+" : "") + z.toFixed(2) + " sd" +
    "  ·  90% ROI range " + r.ci[0] + "% to " + r.ci[1] + "%");
}
/* How many bets until a verdict? If the observed per-bet edge is real and
   persists, this is the sample at which it would clear the usual bars. */
console.log("\n\nHow much more evidence is needed (assuming the observed edge is real and holds)\n");
for (const r of out.filter((x) => x.edgeWins > 0)) {
  const perBet = r.edgeWins / r.n;                       // extra wins per bet
  const sd = Math.sqrt(0.25);                            // worst-case variance p(1-p)
  const need = (z) => Math.ceil(Math.pow(z * sd / perBet, 2));
  const n05 = need(1.645), n01 = need(2.326);
  console.log(r.name.padEnd(16) + "has " + String(r.n).padStart(4) + " bets · needs ~" +
    String(n05).padStart(5) + " for 'not luck' (5%) · ~" + String(n01).padStart(5) + " for strong (1%)" +
    "   → " + (n05 > r.n ? Math.round((n05 - r.n) / 25) + " more days at ~25 bets/day" : "already there"));
}

/* Execution cost: signals read the mid, fills cross to the ask. That gap is
   paid on every bet and is measured directly where we recorded both prices. */
const cost = db.prepare(`SELECT COUNT(*) n, ROUND(AVG(entry - signal_price) * 100, 2) c,
  ROUND(AVG(spread_at_entry) * 100, 2) spr FROM positions
  WHERE signal_price IS NOT NULL AND entry IS NOT NULL`).get();
const implied = db.prepare(`SELECT COUNT(*) n, ROUND(AVG(entry), 4) p, ROUND(1.0 * SUM(pnl > 0) / COUNT(*), 4) w
  FROM positions WHERE status='closed'`).get();
console.log("\n\nEXECUTION COST — the drag every strategy pays before any edge\n");
if (cost.n > 0) {
  console.log("measured directly on " + cost.n + " bets: paid " + cost.c + "c above the signalled price, average spread " + cost.spr + "c");
}
const gap = (implied.p - implied.w) * 100;
const se = Math.sqrt(implied.w * (1 - implied.w) / implied.n) * 100;
console.log("lab-wide: " + implied.n + " settled bets, average entry " + (implied.p * 100).toFixed(2) +
  "c vs actual win rate " + (implied.w * 100).toFixed(2) + "% → " + gap.toFixed(2) +
  " points behind (z = " + (-gap / se).toFixed(2) + ")");
console.log("Any edge smaller than this cost cannot show up as profit, no matter the sample size.");

console.log("\nluck-beats-this = share of random replays that did at least as well.");
console.log("Below 5% is the usual bar for 'not luck'; below 1% is strong.");
console.log("A 90% ROI range straddling 0 means the true edge could still be zero.");
