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
console.log("\n" + (problems.length === 0
  ? "All checks passed."
  : problems.length + " problem(s). Most fix themselves within a tick; a stale collector is"
    + "\nrestarted automatically by the tick loop within 10 minutes."));
