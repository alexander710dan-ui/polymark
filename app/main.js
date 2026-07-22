/* Polymark Desk — cross-platform tray app (Windows tray / macOS menu bar).
   One codebase, two roles:
     Runner — runs the tester loop + whale collector as child processes,
              pushes data to GitHub (one machine at a time).
     Viewer — pulls from GitHub every minute; always shows the same numbers.
   The window is the existing live.html served from a local port, so the
   app, the GitHub Pages site, and RESULTS.md can never disagree. */
"use strict";

const { app, Tray, Menu, BrowserWindow, powerSaveBlocker, nativeImage, shell } = require("electron");
const { spawn } = require("node:child_process");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(__dirname, "config.json");
const PORT = 17888;
const SMOKE = process.argv.includes("--smoke");

// macOS GUI apps get a stripped PATH; make sure git/gh/node from the usual
// install locations are reachable for every child we spawn
if (process.platform === "darwin") {
  process.env.PATH = (process.env.PATH || "/usr/bin:/bin:/usr/sbin:/sbin") + ":/usr/local/bin:/opt/homebrew/bin";
}

let config = { role: "viewer", keepAwake: false, openAtLogin: false };
try { config = { ...config, ...JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8").replace(/^﻿/, "")) }; } catch (e) {}
function saveConfig() { fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2)); }

let tray = null, win = null, children = [], blockerId = null, viewerTimer = null;
let startHead = null, lastSync = 0, lastSyncOk = true;
function gitHead(cb) {
  const g = spawn("git", ["rev-parse", "HEAD"], { cwd: ROOT });
  let o = "";
  g.stdout.on("data", (d) => (o += d));
  g.on("exit", (c) => cb(c === 0 ? o.trim() : null));
  g.on("error", () => cb(null));
}
const logBuf = [];
function log(line) {
  const entry = new Date().toISOString().slice(11, 19) + " " + line;
  logBuf.push(entry); if (logBuf.length > 400) logBuf.shift();
  console.log(entry);
}

/* ---------- tiny static server so live.html works identically to the web ---------- */
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".md": "text/plain", ".db": "application/octet-stream" };
function startServer() {
  const srv = http.createServer((req, res) => {
    handle(req, res);
  });
  srv.on("error", (e) => log("server: " + e.message + " (another instance may hold the port)"));
  function handle(req, res) {
    if (req.method === "POST" && req.url === "/__update") {
      log("update requested — pulling from GitHub");
      const git = spawn("git", ["pull", "--rebase", "--autostash", "origin", "main"], { cwd: ROOT });
      let errOut = "";
      git.stderr.on("data", (d) => (errOut += d));
      git.on("exit", (code) => {
        if (code !== 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ status: "error", detail: errOut.slice(0, 300) }));
          log("update pull failed: " + errOut.slice(0, 200));
          return;
        }
        // restart if the running code differs from the repo — even when the
        // pull itself was a no-op (the Runner's loop pulls constantly, so the
        // repo is often already current while the app still runs old code)
        gitHead((head) => {
          const updated = head && startHead && head !== startHead;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ status: updated ? "updated" : "current" }));
          if (updated) {
            log("new version " + head.slice(0, 7) + " — restarting in 2s");
            setTimeout(() => { stopChildren(); app.relaunch(); app.isQuittingForReal = true; app.exit(0); }, 2000);
          }
        });
      });
      return;
    }
    if (req.url && req.url.split("?")[0] === "/__app_status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ role: config.role, lastSync: lastSync, lastSyncOk: lastSyncOk, children: children.length }));
      return;
    }
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = urlPath === "/" ? "/live.html" : urlPath;
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(path.normalize(ROOT)) || rel.includes("..")) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end("not found"); return; }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(data);
    });
  }
  srv.listen(PORT, "127.0.0.1");
  return srv;
}

/* ---------- child processes (Runner role) ----------
   Electron bundles its own (older) Node without node:sqlite, so the bot
   children must run on the SYSTEM Node installed from nodejs.org. */
let systemNodeCache;
function findSystemNode() {
  if (systemNodeCache !== undefined) return systemNodeCache;
  const { spawnSync } = require("node:child_process");
  const candidates = process.platform === "win32"
    ? ["node", "C:\\Program Files\\nodejs\\node.exe"]
    : ["/usr/local/bin/node", "/opt/homebrew/bin/node", "/usr/bin/node", "node"];
  for (const c of candidates) {
    try {
      const r = spawnSync(c, ["-e", "require('node:sqlite')"], { timeout: 10000 });
      if (r.status === 0) { systemNodeCache = c; log("system node: " + c); return c; }
    } catch (e) { /* try next */ }
  }
  systemNodeCache = null;
  return null;
}

const quickFails = {};
function startChild(label, args) {
  const nodeBin = findSystemNode();
  if (!nodeBin) {
    log("[" + label + "] CANNOT START: no Node 22+ with node:sqlite found — install the LTS from nodejs.org, then switch role off and on");
    return null;
  }
  const startedAt = Date.now();
  const child = spawn(nodeBin, args, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  const tag = (d) => String(d).trim().split("\n").forEach((l) => l && log("[" + label + "] " + l.slice(0, 160)));
  child.stdout.on("data", tag);
  child.stderr.on("data", (d) => { if (!String(d).includes("Experimental")) tag(d); });
  child.on("exit", (code) => {
    log("[" + label + "] exited (" + code + ")");
    if (!children.includes(child) || config.role !== "runner") return;
    if (Date.now() - startedAt < 10000) quickFails[label] = (quickFails[label] || 0) + 1;
    else quickFails[label] = 0;
    if (quickFails[label] >= 5) {
      log("[" + label + "] crashed 5x fast — giving up; fix the cause, then toggle the role to retry");
      return;
    }
    log("[" + label + "] restarting in 15s");
    setTimeout(() => { if (config.role === "runner") replaceChild(child, label, args); }, 15000);
  });
  children.push(child);
  return child;
}
function replaceChild(old, label, args) {
  children = children.filter((c) => c !== old);
  startChild(label, args);
}
function stopChildren() {
  for (const c of children) { try { c.kill(); } catch (e) {} }
  children = [];
}

/* ---------- roles ---------- */
function applyRole() {
  stopChildren();
  clearInterval(viewerTimer);
  if (config.role === "runner") {
    log("role: RUNNER — betting, collecting, pushing");
    startChild("loop", [path.join(ROOT, "tester", "index.js"), "loop", "60", "--managed"]);
    startChild("whales", [path.join(ROOT, "collector", "index.js"), "run", "--managed"]);
  } else {
    log("role: VIEWER — pulling every 60s");
    const pull = () => {
      const git = spawn("git", ["pull", "--rebase", "--autostash", "origin", "main"], { cwd: ROOT });
      git.on("exit", (code) => {
        lastSync = Date.now(); lastSyncOk = code === 0;
        if (code !== 0) log("[sync] git pull failed (" + code + ")");
      });
    };
    pull();
    viewerTimer = setInterval(pull, 60000);
  }
  applyKeepAwake();
  refreshMenu();
}

/* Windows login items launch the exe WITHOUT arguments by default, which
   boots Electron's welcome screen instead of Polymark — always register
   the app-directory argument explicitly. */
function setLoginItem(enable) {
  if (process.platform === "win32") {
    app.setLoginItemSettings({ openAtLogin: enable, path: process.execPath, args: [__dirname] });
  } else {
    app.setLoginItemSettings({ openAtLogin: enable });
  }
}

function applyKeepAwake() {
  if (config.keepAwake && config.role === "runner") {
    if (blockerId === null) { blockerId = powerSaveBlocker.start("prevent-app-suspension"); log("keep-awake ON"); }
  } else if (blockerId !== null) {
    powerSaveBlocker.stop(blockerId); blockerId = null; log("keep-awake off");
  }
}

/* ---------- UI ---------- */
function leaderLine() {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, "tester", "data", "results.json"), "utf8"));
    const best = (j.strategies || []).slice().sort((a, b) => b.equity - a.equity)[0];
    return best ? best.name + " $" + Math.round(best.equity).toLocaleString() : "no data yet";
  } catch (e) { return "no data yet"; }
}

function showWindow() {
  if (win) { win.show(); win.focus(); return; }
  win = new BrowserWindow({
    width: 960, height: 760, title: "Polymark Desk",
    icon: path.join(__dirname, "assets", "icon.png"),
    backgroundColor: "#0b0e13", autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  win.loadURL("http://127.0.0.1:" + PORT + "/live.html");
  win.on("close", (e) => { if (!app.isQuittingForReal) { e.preventDefault(); win.hide(); } });
  win.on("closed", () => { win = null; });
}

function refreshMenu() {
  if (!tray) return;
  tray.setToolTip("Polymark Desk — " + config.role + " — leader: " + leaderLine());
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Polymark Desk (" + config.role + ")", enabled: false },
    { label: "Leader: " + leaderLine(), enabled: false },
    { type: "separator" },
    { label: "Open dashboard", click: showWindow },
    { label: "Open web version", click: () => shell.openExternal("https://alexander710dan-ui.github.io/polymark/live.html") },
    { type: "separator" },
    { label: "Runner (bets + collects on this machine)", type: "radio", checked: config.role === "runner", click: () => { config.role = "runner"; saveConfig(); applyRole(); } },
    { label: "Viewer (mirror only)", type: "radio", checked: config.role === "viewer", click: () => { config.role = "viewer"; saveConfig(); applyRole(); } },
    { type: "separator" },
    { label: "Keep machine awake (runner)", type: "checkbox", checked: config.keepAwake, click: (i) => { config.keepAwake = i.checked; saveConfig(); applyKeepAwake(); } },
    { label: "Start at login", type: "checkbox", checked: config.openAtLogin, click: (i) => { config.openAtLogin = i.checked; saveConfig(); setLoginItem(i.checked); } },
    { type: "separator" },
    { label: "Quit", click: () => { app.isQuittingForReal = true; app.quit(); } }
  ]));
}

/* ---------- boot ---------- */
app.setAppUserModelId("dk.polymark.desk"); // Windows: own taskbar identity + icon
if (!app.requestSingleInstanceLock()) {
  app.quit(); // an instance already runs in the tray — just surface it
} else {
  app.on("second-instance", () => showWindow());
}

app.setName("Polymark Desk");

app.whenReady().then(() => {
  if (!app.hasSingleInstanceLock()) return;
  if (process.platform === "darwin" && app.dock) {
    app.dock.setIcon(nativeImage.createFromPath(path.join(__dirname, "assets", "icon.png")));
  }
  startServer();
  const trayIcon = nativeImage.createFromPath(path.join(__dirname, "assets", "tray.png"));
  tray = new Tray(process.platform === "darwin" ? trayIcon.resize({ width: 18, height: 18 }) : trayIcon);
  tray.on("double-click", showWindow);
  refreshMenu();
  setInterval(refreshMenu, 60000);
  gitHead((h) => { startHead = h; if (h) log("running version " + h.slice(0, 7)); });
  // self-update: whenever the repo (auto-pulled by loop or viewer sync)
  // differs from the running code, restart into the new version
  setInterval(() => {
    gitHead((h) => {
      if (h && startHead && h !== startHead) {
        log("new version " + h.slice(0, 7) + " pulled — auto-restarting");
        stopChildren(); app.relaunch(); app.isQuittingForReal = true; app.exit(0);
      }
    });
  }, 5 * 60000);
  applyRole();
  if (config.openAtLogin) setLoginItem(true);
  if (!SMOKE) showWindow();
  if (SMOKE) { log("SMOKE OK"); setTimeout(() => { app.isQuittingForReal = true; app.quit(); }, 1500); }
});

app.on("window-all-closed", () => { /* stay in tray */ });
app.on("before-quit", () => { app.isQuittingForReal = true; stopChildren(); });
