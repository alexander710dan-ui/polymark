#!/usr/bin/env node
/* Walk-forward check: does a strategy's edge survive out-of-sample?

   Splits each strategy's settled bets chronologically into halves. The first
   half is "in-sample" (where you'd have found the pattern), the second is
   "out-of-sample" (where reality tests it). A strategy that only works
   in-sample is curve-fitted; one that works in both has a real signal.

   Also runs the same split on mid_momentum's price bands, which is the
   specific question behind the mm_tight variant.

   Usage: node tester/walkforward.js
*/
"use strict";
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
const MIN = 30; // fewer settled bets than this and a split says nothing

function stats(rows) {
  if (!rows.length) return null;
  const pnl = rows.reduce((s, r) => s + r.pnl, 0);
  const wins = rows.filter((r) => r.pnl > 0).length;
  const staked = rows.reduce((s, r) => s + r.stake, 0);
  return {
    n: rows.length, wr: Math.round(100 * wins / rows.length),
    pnl: Math.round(pnl), roi: staked ? Math.round(1000 * pnl / staked) / 10 : 0
  };
}
const fmt = (s) => s ? String(s.n).padStart(4) + " bets  " + String(s.wr + "%").padStart(4) + "  " +
  ("$" + s.pnl).padStart(7) + "  " + (s.roi + "%").padStart(7) : "   — insufficient";

console.log("WALK-FORWARD VALIDATION — chronological halves, per strategy\n");
console.log("strategy         in-sample (first half)              out-of-sample (second half)        verdict");
console.log("-".repeat(104));

const names = db.prepare("SELECT DISTINCT strategy s FROM positions WHERE status='closed'").all().map((r) => r.s);
const verdicts = [];
for (const name of names) {
  const rows = db.prepare(
    "SELECT pnl, stake, entry, tag FROM positions WHERE strategy=? AND status='closed' ORDER BY closed_at"
  ).all(name);
  if (rows.length < MIN) continue;
  const mid = Math.floor(rows.length / 2);
  const a = stats(rows.slice(0, mid)), b = stats(rows.slice(mid));
  let v;
  if (a.pnl > 0 && b.pnl > 0) v = "HOLDS — profitable in both halves";
  else if (a.pnl > 0 && b.pnl <= 0) v = "FADED — early edge did not persist";
  else if (a.pnl <= 0 && b.pnl > 0) v = "IMPROVING — recent half profitable";
  else v = "no edge in either half";
  verdicts.push({ name, a, b, v });
  console.log(name.padEnd(16) + fmt(a) + "   " + fmt(b) + "   " + v);
}

console.log("\n\nmid_momentum by price band, split the same way");
console.log("(the mm_tight question: is sub-45c genuinely bad, or just unlucky early?)\n");
const mm = db.prepare(
  "SELECT pnl, stake, entry, tag FROM positions WHERE strategy='mid_momentum' AND status='closed' ORDER BY closed_at"
).all();
const half = Math.floor(mm.length / 2);
const bands = [[0.30, 0.45, "30-45c"], [0.45, 0.70, "45-70c"]];
console.log("band     in-sample                            out-of-sample");
for (const [lo, hi, label] of bands) {
  const inS = stats(mm.slice(0, half).filter((r) => r.entry >= lo && r.entry < hi));
  const outS = stats(mm.slice(half).filter((r) => r.entry >= lo && r.entry < hi));
  console.log(label.padEnd(9) + fmt(inS) + "   " + fmt(outS));
}
console.log("\nsports vs other, same split");
for (const t of ["sports", "other"]) {
  const inS = stats(mm.slice(0, half).filter((r) => (r.tag === "sports") === (t === "sports")));
  const outS = stats(mm.slice(half).filter((r) => (r.tag === "sports") === (t === "sports")));
  console.log(t.padEnd(9) + fmt(inS) + "   " + fmt(outS));
}

const holds = verdicts.filter((x) => x.v.startsWith("HOLDS")).map((x) => x.name);
console.log("\nSurvives out-of-sample: " + (holds.length ? holds.join(", ") : "none yet"));
console.log("Reminder: halves this small (tens of bets) are indicative, not proof.");
