#!/usr/bin/env node
/* System health check. One command, plain answers.
 *
 *   node tester/doctor.js
 *
 * Every check here exists because that exact thing broke at least once. */
"use strict";
const { DatabaseSync } = require("node:sqlite");
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const problems = [];
const ok = [];
const mins = (t) => Math.round((Date.now() - Date.parse(t)) / 60000);
const human = (m) => (m < 60 ? m + " min" : m < 1440 ? Math.round(m / 60) + " h" : Math.round(m / 1440) + " d");

function check(name, fn) {
  try {
    const r = fn();
    if (r === true) ok.push(name);
    else problems.push({ name, detail: r });
  } catch (e) { problems.push({ name, detail: e.message }); }
}

check("database integrity", () => {
  const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
  const r = db.prepare("PRAGMA integrity_check").get();
  return r.integrity_check === "ok" ? true : "corrupt: " + r.integrity_check;
});

check("tester heartbeat", () => {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "results.json"), "utf8"));
  const age = mins(j.generated_at);
  return age < 30 ? true : "last tick " + human(age) + " ago (source: " + (j.source || "?") + ")";
});

check("collector heartbeat", () => {
  const p = path.join(ROOT, "collector", "data", "collector-status.json");
  if (!fs.existsSync(p)) return "no heartbeat file — collector has never run here";
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  const age = mins(j.ts);
  return age < 60 ? true : "silent " + human(age) + " (" + (j.whaleTrades || 0).toLocaleString() + " trades captured)";
});

check("local model (AI)", () => {
  const p = path.join(ROOT, "reasoner", "data", "ai-scores.json");
  if (!fs.existsSync(p)) return "no scores yet — Ollama may not be installed";
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  const age = mins(j.generated_at);
  return age < 120 ? true : "stale " + human(age) + " (" + (j.scores || []).length + " opinions)";
});

/* The check this whole system was missing. Nine days of green ticks ran on a
   dead feed because "no markets qualified" and "cannot reach Polymarket" were
   the same empty list. A Danish ISP DNS block was the cause: the domain
   resolved to a TDC redirect server instead of Cloudflare. */
check("polymarket API reachable", () => {
  const probe = execSync(
    'node -e "fetch(\'https://gamma-api.polymarket.com/markets?limit=1\',{signal:AbortSignal.timeout(15000)})' +
    '.then(r=>console.log(\'ok \'+r.status)).catch(e=>console.log(\'fail \'+(e.cause&&e.cause.code||e.message)))"',
    { cwd: ROOT, timeout: 25000 }).toString().trim();
  if (probe.startsWith("ok")) return true;
  // distinguish a blocked domain from a plain outage — they need different fixes
  let hint = "";
  try {
    const dns = require("node:dns");
    const sys = execSync('node -e "require(\'dns\').promises.resolve4(\'gamma-api.polymarket.com\').then(a=>console.log(a.join(\',\'))).catch(e=>console.log(e.code))"',
      { cwd: ROOT, timeout: 15000 }).toString().trim();
    if (!/^(104\.|172\.6)/.test(sys)) hint = " — DNS returns " + sys + ", not Cloudflare: the domain is being blocked by your DNS resolver";
  } catch (e) { /* hint is best effort */ }
  return probe + hint;
});

check("runner is seeing live markets", () => {
  const p = path.join(__dirname, "data", "runner-status.json");
  if (!fs.existsSync(p)) return "no runner status yet";
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!j.dataFeed) return "runner is on old code that cannot report feed health";
  return j.dataFeed.startsWith("ok") ? true : j.dataFeed;
});

check("database not tracked by git", () => {
  const tracked = execSync("git ls-files tester/data/polymark.db", { cwd: ROOT }).toString().trim();
  return tracked ? "still tracked — binary sync corrupts across machines" : true;
});

check("git working tree", () => {
  const s = execSync("git status --porcelain", { cwd: ROOT }).toString();
  const conflicts = s.split("\n").filter((l) => l.startsWith("UU") || l.startsWith("AA"));
  if (conflicts.length) return conflicts.length + " unmerged file(s) — sync is wedged";
  const rebasing = fs.existsSync(path.join(ROOT, ".git", "rebase-merge")) || fs.existsSync(path.join(ROOT, ".git", "rebase-apply"));
  return rebasing ? "a rebase is in progress and unfinished" : true;
});

check("repository size", () => {
  try {
    const out = execSync("git count-objects -vH", { cwd: ROOT }).toString();
    const m = out.match(/size-pack: ([\d.]+) ([KMG])iB/);
    if (!m) return true;
    const gb = m[2] === "G" ? parseFloat(m[1]) : m[2] === "M" ? parseFloat(m[1]) / 1024 : 0;
    return gb < 3 ? true : "history is " + m[1] + m[2] + "iB — heavy but harmless; a fresh clone is the cure";
  } catch (e) { return true; }
});

check("open positions look sane", () => {
  const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
  const bad = db.prepare(`SELECT COUNT(*) n FROM positions
    WHERE status='open' AND (entry<=0 OR entry>=1 OR shares<=0 OR stake<=0)`).get().n;
  return bad === 0 ? true : bad + " impossible open position(s)";
});

check("fees charged on new taker bets", () => {
  // must key off OPENED, not closed: positions opened before fees existed
  // legitimately carry fee=0 and settle for days afterwards
  const db = new DatabaseSync(path.join(__dirname, "data", "polymark.db"));
  const r = db.prepare(`SELECT COUNT(*) n FROM positions
    WHERE COALESCE(is_maker,0)=0 AND COALESCE(fee,0)=0 AND opened_at > '2026-08-04'`).get().n;
  return r === 0 ? true : r + " taker bet(s) opened fee-free since fees went live";
});

console.log("POLYMARK DOCTOR — " + new Date().toISOString().slice(0, 16).replace("T", " ") + "\n");
for (const name of ok) console.log("  ok    " + name);
for (const p of problems) console.log("  FAIL  " + p.name + " — " + p.detail);
if (problems.length === 0) console.log("\nAll checks passed.");
else {
  console.log("\n" + problems.length + " problem(s).");
  // do not promise self-healing for things that cannot self-heal — that claim
  // is exactly why a nine-day outage was left alone
  if (problems.some((p) => p.name === "polymarket API reachable")) {
    console.log("\nThe API check is the one that matters: with no market feed the runner keeps"
      + "\nticking, settles nothing, places nothing, and every other number goes stale."
      + "\nNothing downstream can recover until it is reachable again.");
  } else if (problems.some((p) => p.name === "collector heartbeat")) {
    console.log("A stale collector is restarted by the tick loop within 10 minutes.");
  }
}
