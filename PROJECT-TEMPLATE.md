# Reusable project prompt — "the Polymark architecture" for a new idea

Copy everything below the line into a fresh Claude session (on any machine),
fill in the three placeholders, and it will build a new project with the same
proven architecture: local-first app + GitHub as the sync spine + Mac/PC tray
app + cloud backup — but for a completely different purpose.

---

I want you to build a project using an architecture I already know works.
Read this whole spec before writing code. Ask me only about the PURPOSE
section; the architecture is decided.

## PURPOSE (fill in)

- What the system does: [YOUR IDEA — e.g. "tracks X and reacts to Y"]
- The always-running worker does: [what a 60-second cycle should do]
- The dashboard shows: [3–5 panels max]
- Data it collects: [what accumulates in the database]

## ARCHITECTURE (decided — do not redesign)

**Repo layout** (one GitHub repo is the entire system and the sync spine):

```
repo/
├── worker/index.js       # zero-dependency Node worker (the "bot")
│   └── data/*.db         # SQLite via built-in node:sqlite (Node 22+)
├── collector/index.js    # optional: real-time feed listener (websocket)
├── live.html             # dashboard — plain HTML/CSS/JS, no framework
├── app/                  # Electron tray app wrapping it all
│   ├── main.js, package.json, gen-icon.js, brand.js, make-mac-app.sh
├── .github/workflows/tick.yml   # cloud backup cron
├── RESULTS.md            # human-readable summary, regenerated each cycle
└── worker/data/results.json     # JSON feed the dashboard reads
```

**Core rules learned the hard way — follow all of them:**

1. **Zero npm dependencies in the worker.** Node's built-in `fetch` and
   `node:sqlite` (`DatabaseSync`). The Electron app is the ONLY thing with
   node_modules.
2. **GitHub is the database sync.** The worker commits its SQLite db +
   results.json + RESULTS.md and pushes after each cycle with activity
   (plus a 10-min heartbeat push when quiet). Machines pull to stay
   identical. Never two writers: one **Runner**, everyone else **Viewer**.
3. **Worker cycles must be idempotent replays** — on any git conflict:
   `git reset --hard origin/main` and re-run the cycle. Design writes so
   replaying loses nothing (dedup keys, INSERT OR IGNORE).
4. **If any db uses WAL mode, never commit the raw file** — it tears.
   Export `VACUUM INTO 'name-sync.db'` every 5 min and commit the snapshot;
   gitignore the live db and `*.db-wal`/`*.db-shm`.
5. **Cloud backup, not cloud primary:** a GitHub Actions cron (`*/15`, which
   GitHub throttles to ~1–2h — accept it) runs one worker cycle, but FIRST
   checks the feed's `generated_at`; if a Runner pushed within 30 min, it
   skips. The feed carries `source: "runner" | "cloud"` so the dashboard
   can show who produced the data.
6. **The dashboard is one static live.html** reading results.json — served
   three identical ways: by the Electron app from a localhost port, by
   GitHub Pages (enable Pages on main branch root), and from disk in dev.
   Never let the app UI and web UI diverge — same file.

**The Electron tray app (`app/main.js`) — every lesson encoded:**

- Tray/menu-bar icon with a small window loading live.html from a local
  http server (serve the repo root on 127.0.0.1, one fixed port).
- **Roles:** Runner spawns the worker (+collector) as children and pushes;
  Viewer only `git pull`s every 60s. Menu radio to switch. One Runner rule.
- **Children run on the SYSTEM Node, never Electron's** (Electron bundles an
  old Node without node:sqlite). Probe candidates
  (`/usr/local/bin/node`, `/opt/homebrew/bin/node`, `node`, Windows
  `C:\Program Files\nodejs\node.exe`) by running
  `node -e "require('node:sqlite')"`.
- **Self-update:** record `git rev-parse HEAD` at boot; every 5 min (and on
  an Update button posting to a local `/__update` endpoint) pull and
  compare — restart on ANY drift (not on "pull fetched something": the
  Runner's own loop pulls constantly so pulls are usually no-ops).
- **No zombies:** stop children explicitly before `app.relaunch()`
  (`app.exit()` skips `before-quit`!), and children self-exit if their
  parent pid dies (spawn them with a `--managed` flag; check
  `process.kill(ppid, 0)` every 30s).
- **Single instance lock** (`app.requestSingleInstanceLock`), second launch
  focuses the window.
- **Quiet by default:** relaunches and login starts pass `--hidden` — only
  show the window on a fresh manual open or tray click.
- **Windows login item MUST register args**
  (`app.setLoginItemSettings({path, args: [appDir, "--hidden"]})`) or login
  boots Electron's welcome screen instead of your app.
- **macOS GUI apps get a stripped PATH** — append
  `/usr/local/bin:/opt/homebrew/bin` to `process.env.PATH` at startup or
  git/gh/node won't resolve.
- **Branding:** generate icons in code (gen-icon.js writing png + a real
  multi-size .ico), Windows: copy electron.exe → "AppName.exe" and patch
  icon/name with the `rcedit` npm lib (`brand.js`); macOS:
  `make-mac-app.sh` copies Electron.app → "AppName.app", symlinks
  `Contents/Resources/app` → repo app dir, edits Info.plist via PlistBuddy,
  builds icns with `sips`+`iconutil` (valid sizes ONLY: 16/32/128/256/512),
  ad-hoc `codesign --force --deep --sign -`, clear quarantine, install to
  /Applications, `open` it when done.
- `powerSaveBlocker` toggle ("keep machine awake") + start-at-login toggle.

**Setup flow (works for a non-technical owner):**

1. Windows dev machine: build everything, `git init`, create repo with
   `gh repo create NAME --public --source . --push` (gh auth via device
   flow — user clicks a code). Enable Pages:
   `gh api -X POST repos/OWNER/NAME/pages -f "source[branch]=main" -f "source[path]=/"`.
2. Mac (or second machine): install Node LTS pkg + GitHub CLI pkg,
   `gh auth login --web`, `gh repo clone`, `cd app && npm install &&
   npm start`, then `bash make-mac-app.sh`, add to Login Items, switch
   role to Runner; first machine becomes Viewer.
3. Write a HANDOFF.md in the repo so any future chat can continue with
   full context.

## UI SPEC (the look that worked — adapt colors to the new purpose)

- Single-column, max-width 860px, generous whitespace, panels with 1px
  borders and 10px radius. No framework, no build step.
- Fonts: display = an italic serif (Fraunces), UI = a characterful
  grotesk (Schibsted Grotesk), ALL numbers = a mono (Spline Sans Mono)
  with tabular numerals.
- Dark default + light mode via CSS variables on `body.light`, toggle
  button persisted in localStorage. Style the scrollbars (`--scroll` var)
  — default scrollbars ruin dark UIs.
- Header row: italic serif wordmark, status pills (live/delayed/offline
  computed from feed age + source), right-aligned: hidden extra-page link
  (low opacity "◦"), theme toggle "◐", "⟳ Update" (Electron only, detect
  via userAgent).
- Status line: "Data generated HH:MM:SS · checked Xs ago · [viewer synced
  Ys ago]" — a 1s ticker for the age, red warning when sync fails
  (app exposes `/__app_status` with role + last sync).
- Every long list: paginated (size picker 10/20/50/100/300/500/All,
  default 50, pager at top AND bottom, persisted per-list) and grouped
  with uppercase micro-headers where a natural grouping exists.
- Charts: inline SVG lines, y-axis fitted to VISIBLE series only, dashed
  baseline, clickable legend to isolate one series, range label. No chart
  libraries.
- Page refetches its feed every 20s with cache-busting.
- Footer: honest scope statement (what's simulated/read-only) on every page.

## HONESTY RULES (non-negotiable)

- Fake/simulated things are labeled as such on every surface.
- Metrics include a "minus best win"-style robustness column — never let
  one lucky outlier masquerade as skill.
- Controls stay in the experiment (a random baseline everything must beat).
- When something is retired/changed, history is kept, never deleted.

Build it in this order: worker core → repo + Actions + Pages → live.html →
Electron app → branding scripts → HANDOFF.md. Verify each stage by running
it for real before moving on. Then hand me the two-machine setup steps.
