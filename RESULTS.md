# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19159 · Last run: 2026-07-31T22:35:18.882Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 308 | 161 | 52% | $884.74 | 2.87% | $-443.83 | 23 | $10854.13 |
| mid_momentum | 158 | 94 | 59% | $1073.98 | 6.8% | $860.5 | 25 | $10329.85 |
| copy_pro | 283 | 145 | 51% | $83.57 | 0.19% | $-766.43 | 25 | $10092.65 |
| fade_longshot | 74 | 70 | 95% | $-43.79 | -0.59% | $-53.68 | 25 | $9983.31 |
| strong_dip | 67 | 38 | 57% | $-571.53 | -8.53% | $-663.84 | 25 | $9799.72 |
| random_control | 84 | 45 | 54% | $-398.6 | -4.75% | $-1012.89 | 25 | $9529.08 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9468.11 |
| mm_max | 35 | 16 | 46% | $-698.99 | -19.97% | $-816.38 | 4 | $9265.88 |
| mm_tight | 100 | 51 | 51% | $-649.4 | -6.49% | $-852.43 | 11 | $9178.66 |
| super | 54 | 24 | 44% | $-449.65 | -6.2% | $-665.5 | 14 | $9025.28 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8915.67 |
| mm_strong | 47 | 23 | 49% | $-497.08 | -10.58% | $-701.03 | 25 | $8900.54 |
| momentum | 195 | 134 | 69% | $-616.64 | -3.16% | $-1104.88 | 25 | $8557.51 |
| mm_sports | 113 | 55 | 49% | $-1640.2 | -14.52% | $-1843.23 | 13 | $8233.66 |
| whale_fade | 309 | 145 | 47% | $-2389.43 | -7.73% | $-2724.21 | 23 | $6879.68 |
| copy_month (retired) | 158 | 76 | 48% | $-384.95 | -2.44% | $-1194.04 | 7 | $9319.25 |
| favorite (retired) | 121 | 80 | 66% | $-1208.65 | -9.99% | $-1272.58 | 15 | $9081.85 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 133 | 33 | 25% | $-1188.72 | -8.94% | $-3216.38 | 14 | $8056.63 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5139.66 |

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
