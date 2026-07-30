# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 14043 · Last run: 2026-07-30T03:39:35.227Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 271 | 136 | 50% | $227.76 | 0.84% | $-1100.81 | 18 | $10484.24 |
| mid_momentum | 142 | 85 | 60% | $1141.02 | 8.04% | $927.54 | 25 | $10277.82 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10242.41 |
| copy_pro | 241 | 119 | 49% | $-643.54 | -1.68% | $-1493.54 | 20 | $9831.81 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9543.2 |
| strong_dip | 60 | 34 | 57% | $-511.6 | -8.53% | $-603.91 | 25 | $9523.37 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9511.92 |
| momentum | 174 | 124 | 71% | $0.21 | 0% | $-488.03 | 25 | $9445.13 |
| random_control | 70 | 37 | 53% | $-536.34 | -7.66% | $-1150.63 | 25 | $9134.06 |
| whale_fade | 271 | 133 | 49% | $-973.64 | -3.59% | $-1308.42 | 18 | $8568.84 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9661.93 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8914.67 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8447.51 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5347.5 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite
- **copy_top** — mirrors top-10 leaderboard wallets' pregame buys (in-play skipped)
- **copy_pro** — copy trading with all refinements: filtered wallets, 6h freshness, no chasing, conviction stakes
- **whale_fade** — bets against copy_top's picks (its control)
- **ai_judge** — bets when a local model (Ollama on the runner) disagrees with the market by >4¢ after costs; the AI's skill is judged like any other strategy
- **random_control** — coin flips, the baseline every strategy must beat

Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
