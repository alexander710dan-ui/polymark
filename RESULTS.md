# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 14797 · Last run: 2026-07-30T09:57:09.737Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 147 | 90 | 61% | $1475.45 | 10.04% | $1261.97 | 25 | $10614.59 |
| copy_top | 275 | 139 | 51% | $448.12 | 1.63% | $-880.45 | 16 | $10568.44 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10243.53 |
| copy_pro | 246 | 120 | 49% | $-798.3 | -2.04% | $-1648.3 | 19 | $9694.53 |
| strong_dip | 60 | 34 | 57% | $-511.6 | -8.53% | $-603.91 | 25 | $9616.4 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9555.49 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9504.13 |
| momentum | 181 | 127 | 70% | $-114.03 | -0.63% | $-602.27 | 25 | $9480.87 |
| random_control | 71 | 37 | 52% | $-636.34 | -8.96% | $-1250.63 | 25 | $9080.74 |
| whale_fade | 275 | 134 | 49% | $-1206.97 | -4.39% | $-1541.75 | 16 | $8454.36 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9693.83 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8920.51 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8517.39 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5284.44 |

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
