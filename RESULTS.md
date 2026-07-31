# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19217 · Last run: 2026-07-31T23:04:18.675Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 311 | 164 | 53% | $1043.79 | 3.36% | $-284.78 | 22 | $10846.86 |
| mid_momentum | 159 | 94 | 59% | $973.98 | 6.13% | $760.5 | 25 | $10240.95 |
| copy_pro | 287 | 148 | 52% | $153.63 | 0.34% | $-696.37 | 25 | $10051.26 |
| fade_longshot | 76 | 72 | 95% | $-36.49 | -0.48% | $-46.38 | 25 | $9982.25 |
| strong_dip | 69 | 40 | 58% | $-496.4 | -7.19% | $-588.71 | 25 | $9838.89 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9470.08 |
| random_control | 85 | 46 | 54% | $-266.04 | -3.13% | $-880.33 | 25 | $9453.65 |
| mm_max | 35 | 16 | 46% | $-698.99 | -19.97% | $-816.38 | 5 | $9165.31 |
| mm_tight | 102 | 51 | 50% | $-849.4 | -8.33% | $-1052.43 | 12 | $9050.14 |
| super | 54 | 24 | 44% | $-449.65 | -6.2% | $-665.5 | 15 | $9009.94 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8879.42 |
| mm_strong | 48 | 23 | 48% | $-597.08 | -12.44% | $-801.03 | 25 | $8825.69 |
| momentum | 196 | 134 | 68% | $-716.64 | -3.66% | $-1204.88 | 25 | $8484.29 |
| mm_sports | 116 | 56 | 48% | $-1727.43 | -14.89% | $-1930.46 | 14 | $8212.99 |
| whale_fade | 312 | 145 | 46% | $-2689.43 | -8.62% | $-3024.21 | 22 | $6872.69 |
| copy_month (retired) | 159 | 76 | 48% | $-484.95 | -3.05% | $-1294.04 | 6 | $9301.65 |
| favorite (retired) | 122 | 81 | 66% | $-1187.88 | -9.74% | $-1251.81 | 14 | $9081.44 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 134 | 34 | 25% | $-1122.05 | -8.37% | $-3149.71 | 13 | $8058.18 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5136.16 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)
- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)
- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)
- **mm_slow** — mid_momentum, only markets resolving in 2+ days
- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢
- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢
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
