#!/usr/bin/env node
/* Does our own confidence mean anything?
 *
 * The conviction strategy scores every trade 0-100 before placing it. That
 * number is worthless unless high-confidence trades actually do better than
 * low-confidence ones. This is the test most likely to embarrass us, which is
 * exactly why it exists.
 *
 * Also reports which SIGNAL COMBINATIONS earn their keep, so the strategy can
 * be pruned by evidence rather than by taste.
 *
 * Usage: node tester/calibration.js
 */
"use strict";
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));

const rows = db.prepare(`SELECT confidence, reason, entry, pnl, stake, tag, side, question, closed_at
  FROM positions WHERE strategy='conviction' AND status='closed' AND confidence IS NOT NULL`).all();
const open = db.prepare(`SELECT COUNT(*) n, ROUND(COALESCE(SUM(stake),0)) staked, ROUND(AVG(confidence)) conf
  FROM positions WHERE strategy='conviction' AND status='open'`).get();

console.log("CONVICTION — is our confidence worth anything?\n");

if (!rows.length) {
  console.log("No settled conviction trades yet.");
  console.log("Open: " + open.n + " positions, $" + (open.staked || 0) + " staked" +
    (open.conf ? ", average confidence " + open.conf : "") + ".");
  console.log("\nThis strategy is built to trade rarely: five gates, then two independent");
  console.log("signals must agree unanimously. Silence is the expected state, not a fault.");
  process.exit(0);
}

function block(label, rs) {
  if (!rs.length) return;
  const n = rs.length;
  const wins = rs.filter((r) => r.pnl > 0).length;
  const exp = rs.reduce((s, r) => s + r.entry, 0);
  const pnl = rs.reduce((s, r) => s + r.pnl, 0);
  const staked = rs.reduce((s, r) => s + r.stake, 0);
  const extra = wins - exp;
  const varr = rs.reduce((s, r) => s + r.entry * (1 - r.entry), 0);
  const z = varr > 0 ? extra / Math.sqrt(varr) : 0;
  console.log(label.padEnd(26) + String(n).padStart(4) + " bets  " +
    (Math.round(100 * wins / n) + "%").padStart(5) + "   extra " +
    ((extra > 0 ? "+" : "") + extra.toFixed(1)).padStart(6) + "   z=" + z.toFixed(2).padStart(6) +
    "   $" + Math.round(pnl).toString().padStart(6) +
    "   ROI " + (staked ? (100 * pnl / staked).toFixed(1) : "0") + "%");
}

console.log("BY CONFIDENCE BAND — if the score means anything, these should ascend");
console.log("-".repeat(98));
block("conf < 72", rows.filter((r) => r.confidence < 72));
block("conf 72-84", rows.filter((r) => r.confidence >= 72 && r.confidence < 85));
block("conf >= 85", rows.filter((r) => r.confidence >= 85));

console.log("\nBY SIGNAL COMBINATION — which agreements actually pay");
console.log("-".repeat(98));
for (const c of [...new Set(rows.map((r) => r.reason).filter(Boolean))]) {
  block(c, rows.filter((r) => r.reason === c));
}

console.log("\nOVERALL");
console.log("-".repeat(98));
block("all conviction", rows);
console.log("\nopen now: " + open.n + " positions, $" + (open.staked || 0) + " staked");

/* the honest check: does confidence correlate with beating the price? */
if (rows.length >= 20) {
  const xs = rows.map((r) => r.confidence);
  const ys = rows.map((r) => (r.pnl > 0 ? 1 : 0) - r.entry);
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    dx += Math.pow(xs[i] - mx, 2);
    dy += Math.pow(ys[i] - my, 2);
  }
  const r = dx && dy ? num / Math.sqrt(dx * dy) : 0;
  console.log("\ncorrelation between confidence and beating the price: r = " + r.toFixed(3));
  console.log(Math.abs(r) < 0.1
    ? "  -> our confidence carries no information. The score is decoration."
    : r > 0
      ? "  -> higher confidence really does do better. The score is earning its keep."
      : "  -> confidence is INVERTED: the trades we liked most did worst.");
} else {
  console.log("\n(correlation check needs 20+ settled trades)");
}
console.log("\nSamples here are small by design. Read z, not P&L.");
