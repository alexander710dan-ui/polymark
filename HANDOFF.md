# HANDOFF — for the next Claude session (especially on the Mac Pro)

Read this top to bottom, then continue the project. Everything is fake money,
read-only public APIs, no wallet, no real orders — keep it that way.

## What this project is

A Polymarket strategy laboratory owned by Alexander (alexander@dan.dk):

1. **Web prototype** (repo root, `index.html` + `js/`) — a 7-page analysis desk
   with a transparent 0–100 scoring engine over hand-written demo data.
   Served at https://alexander710dan-ui.github.io/polymark/ via GitHub Pages.
2. **Tester** (`tester/index.js`) — zero-dependency Node bot betting fake $100
   stakes on live Polymarket markets. 13 strategies race each other; results
   in SQLite (`tester/data/polymark.db`), summarized to `RESULTS.md` and
   `tester/data/results.json` (feeds `live.html`). GitHub Actions cron ticks
   it every ~1–2h (throttled */15); `node tester/index.js loop 120` is the
   fast local mode which also pushes to GitHub.
3. **Collector** (`collector/index.js`) — real-time whale watcher. Subscribes
   to Polymarket's PUBLIC unauthenticated firehose
   (`wss://ws-live-data.polymarket.com`, topic `activity`/`trades`; every
   message carries `proxyWallet`). Filters the top-35 leaderboard wallets,
   logs every whale trade to `collector/data/whales.db` with orderbook
   snapshots at +0s/2s/30s/2m/5m/15m/60m — a passive latency lab.
   `node collector/index.js analyze` reports the cost of copying late.
4. **Desk app** (`app/`) — Electron tray/menu-bar app. `npm install && npm
   start` inside `app/`. Roles: **Runner** (spawns tester loop + collector as
   children, pushes to GitHub) and **Viewer** (pulls every 60s). The window
   is `live.html` served from a local port. Keep-awake + start-at-login
   toggles in the tray menu. Config in `app/config.json` (gitignored).

## Key empirical findings so far (all in RESULTS.md / db)

- copy_top (mirror top-10 leaderboard buys) led the scoreboard, BUT its
  entire profit was ONE trade (Karmine Corp 7¢ → +$1,329). The "P&L minus
  best win" column exists because of this. Not yet proven.
- fade_longshot is the only strategy profitable after removing its best win.
- Blind longshot buying: 1 win in 36+, worst strategy. Momentum: 75% win
  rate yet ~breakeven (payoff asymmetry — high-priced wins pay pennies).
- Polymarket rate limits are generous (documented at
  docs.polymarket.com/api-reference/rate-limits); polling was never the
  bottleneck, the GitHub cron was.

## Rules of the road

- One **Runner** machine at a time (two runners = git conflicts on the
  binary db). Everything else can be a Viewer.
- Ticks are idempotent replays — on any git mess, `git reset --hard
  origin/main` and re-tick; nothing is lost.
- Never present fake-data results as proof. Sample sizes are small; say so.
- All strategy changes should be data-justified (the audit trail lives in
  the chat history summarized in RESULTS.md and this file's findings).

## What the Mac session should do, in order

1. Clone, `cd app && npm install && npm start`. Verify tray appears, switch
   role to Runner, enable keep-awake + start-at-login. (System Settings →
   Energy: "Prevent automatic sleeping" is the belt to our suspenders.)
2. Windows PC then flips to Viewer (tray menu) — one runner rule.
3. Package a real .app: add electron-builder, `targets: dmg/zip`, deal with
   unsigned-app Gatekeeper (right-click → Open). The repo must ship inside
   extraResources or the app must clone/manage its own copy of the repo —
   decide there, it's the known open design question.
4. Discord streaming: webhook URL in app settings; post settlements + daily
   digest from the tester loop (batched, never per-tick spam).
5. After ~48h of collector data: `node collector/index.js analyze` — decide
   from the numbers whether seconds-fast copy execution is worth building
   (wire whale detections as entry triggers into the tester), and how much
   chase-cost budget a copier has.
6. Then: parameterized strategy grid (one engine + config hashes, frozen vs
   dynamic whale cohorts, walk-forward) — the design is agreed, see chat
   summary in repo history.

## Contacts between sessions

The GitHub repo IS the shared memory: db, results, this file. The Windows
session also keeps notes in its local Claude memory, but anything that
matters must land in the repo.
