# Mac Pro setup — the easy way (no Claude needed)

Total time: ~10 minutes, mostly waiting for installers. Two downloads, one
copy-paste, three clicks in the app.

## Step 1 — install two things (normal Mac installers, next-next-finish)

1. **Node.js** — https://nodejs.org → big green "LTS" download → open the
   .pkg → install.
2. **GitHub CLI** — https://cli.github.com → "Download for macOS" (.pkg) →
   install. (This is what lets the Mac save results to GitHub.)

## Step 2 — one copy-paste in Terminal

Open **Terminal** (Cmd+Space, type "terminal", Enter) and paste this whole
block, then press Enter:

```
gh auth login --hostname github.com --git-protocol https --web
```

It shows a code → press Enter → your browser opens → type the code → approve.
(Same dance as on the PC.) Then paste this block:

```
gh repo clone alexander710dan-ui/polymark ~/polymark && cd ~/polymark/app && npm install && npm start
```

- If the Mac asks to install "command line developer tools" — click Install,
  wait, then re-paste the second block.
- After a minute the **Polymark Desk window opens** and a brass **P** appears
  in the menu bar (top right of the screen).

## Step 3 — three clicks in the menu-bar P

Click the brass **P** in the menu bar:

1. **Runner (bets + collects on this machine)** ← makes the Mac the 24/7 bot
2. **Keep machine awake** ✓
3. **Start at login** ✓

Also do once, for good measure: System Settings → search "sleep" → turn ON
"Prevent automatic sleeping when the display is off".

**Then on the Windows PC:** right-click its tray P → switch it to **Viewer**.
One Runner at a time — that's the only rule.

## Daily use

- The menu-bar P shows the current leader in its tooltip; click → Open
  dashboard for the full view. Same numbers on every device, always.
- When the code changes on GitHub: press **⟳ Update** at the top of the
  dashboard — the app pulls the latest and restarts itself.
- Phone view anytime: https://alexander710dan-ui.github.io/polymark/live.html

## If something looks stuck

Quit the app (menu-bar P → Quit) and relaunch with:

```
cd ~/polymark/app && npm start
```

Everything is fake money and read-only public data. The app never touches a
wallet and cannot place real trades.
