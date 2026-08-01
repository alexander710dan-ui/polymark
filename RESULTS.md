# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19859 · Last run: 2026-08-01T04:31:51.097Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 325 | 171 | 53% | $669.91 | 2.06% | $-658.66 | 18 | $10756.07 |
| copy_pro | 300 | 155 | 52% | $513.78 | 1.09% | $-336.22 | 22 | $10740.08 |
| strong_dip | 80 | 49 | 61% | $-237.27 | -2.97% | $-329.58 | 21 | $9998.94 |
| fade_longshot | 89 | 85 | 96% | $40.26 | 0.45% | $29.52 | 25 | $9989.26 |
| mid_momentum | 167 | 94 | 56% | $173.98 | 1.04% | $-39.5 | 25 | $9907.1 |
| random_control | 93 | 52 | 56% | $-260.37 | -2.8% | $-874.66 | 25 | $9492.7 |
| ai_judge | 5 | 0 | 0% | $-500 | -100% | $-400 | 4 | $9463.55 |
| mm_tight | 117 | 59 | 50% | $-931.12 | -7.96% | $-1134.15 | 9 | $9302.97 |
| mm_max | 42 | 19 | 45% | $-874.26 | -20.82% | $-991.65 | 4 | $9211.27 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9119.2 |
| mm_slow | 40 | 18 | 45% | $-1051.39 | -26.28% | $-1168.78 | 25 | $8865.29 |
| mm_sports | 135 | 69 | 51% | $-1417.68 | -10.5% | $-1620.71 | 10 | $8821.56 |
| mm_strong | 54 | 24 | 44% | $-1015.26 | -18.8% | $-1219.21 | 25 | $8601.89 |
| momentum | 208 | 139 | 67% | $-1346.94 | -6.48% | $-1835.18 | 25 | $8231.51 |
| whale_fade | 326 | 152 | 47% | $-2939.18 | -9.02% | $-3273.96 | 18 | $6619.74 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9312.18 |
| favorite (retired) | 126 | 85 | 67% | $-1120.76 | -8.89% | $-1184.69 | 10 | $9087.67 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 138 | 36 | 26% | $-1265.3 | -9.17% | $-3292.96 | 9 | $8035.3 |
| longshot (retired) | 76 | 2 | 3% | $-4191.55 | -55.15% | $-6091.55 | 8 | $5092.53 |

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
