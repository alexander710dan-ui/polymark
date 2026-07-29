# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 12089 · Last run: 2026-07-29T11:18:42.652Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 219 | 109 | 50% | $-103.94 | -0.3% | $-953.94 | 25 | $11217.31 |
| copy_top | 249 | 126 | 51% | $447.09 | 1.8% | $-881.48 | 23 | $11049.65 |
| random_control | 58 | 32 | 55% | $-137.91 | -2.38% | $-752.2 | 25 | $10197.48 |
| mid_momentum | 134 | 78 | 58% | $611.46 | 4.56% | $397.98 | 25 | $10146.59 |
| fade_longshot | 63 | 61 | 97% | $102.46 | 1.63% | $92.57 | 25 | $10132.5 |
| momentum | 153 | 108 | 71% | $-84.03 | -0.55% | $-572.27 | 25 | $9920.24 |
| ai_judge | 1 | 0 | 0% | $-100 | -100% | $0 | 8 | $9724.23 |
| super | 41 | 18 | 44% | $-243.59 | -4.6% | $-459.44 | 20 | $9636.54 |
| strong_dip | 56 | 31 | 55% | $-485.28 | -8.67% | $-577.59 | 25 | $9500.24 |
| whale_fade | 249 | 121 | 49% | $-760.45 | -3.05% | $-1095.23 | 23 | $8592.46 |
| copy_month (retired) | 152 | 73 | 48% | $-146.4 | -0.96% | $-955.49 | 13 | $10081.98 |
| favorite (retired) | 115 | 75 | 65% | $-1196.99 | -10.41% | $-1260.92 | 21 | $8787.78 |
| mean_revert (retired) | 126 | 29 | 23% | $-1024.26 | -8.13% | $-3051.92 | 21 | $8519.56 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| longshot (retired) | 62 | 2 | 3% | $-2791.55 | -45.02% | $-4691.55 | 22 | $6928.17 |

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
