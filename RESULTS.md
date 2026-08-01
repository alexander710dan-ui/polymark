# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19919 · Last run: 2026-08-01T05:01:54.037Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 303 | 157 | 52% | $559.02 | 1.18% | $-290.98 | 20 | $10875.37 |
| copy_top | 327 | 172 | 53% | $575.17 | 1.76% | $-753.4 | 17 | $10811.54 |
| fade_longshot | 91 | 87 | 96% | $48.61 | 0.53% | $37.87 | 25 | $10010.03 |
| strong_dip | 80 | 49 | 61% | $-237.27 | -2.97% | $-329.58 | 21 | $9988.3 |
| mid_momentum | 168 | 94 | 56% | $73.98 | 0.44% | $-139.5 | 25 | $9896.64 |
| random_control | 94 | 53 | 56% | $-181.8 | -1.93% | $-796.09 | 25 | $9471.03 |
| ai_judge | 5 | 0 | 0% | $-500 | -100% | $-400 | 4 | $9463.55 |
| mm_tight | 119 | 60 | 50% | $-981.87 | -8.25% | $-1184.9 | 7 | $9332.81 |
| mm_max | 43 | 19 | 44% | $-974.26 | -22.66% | $-1091.65 | 3 | $9260.74 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9118.55 |
| mm_slow | 41 | 18 | 44% | $-1151.39 | -28.08% | $-1268.78 | 25 | $8893.68 |
| mm_sports | 137 | 70 | 51% | $-1468.43 | -10.72% | $-1671.46 | 8 | $8851.77 |
| mm_strong | 55 | 24 | 44% | $-1115.26 | -20.28% | $-1319.21 | 25 | $8642.27 |
| momentum | 210 | 140 | 67% | $-1406.09 | -6.7% | $-1894.33 | 25 | $8267.99 |
| whale_fade | 328 | 153 | 47% | $-2926.41 | -8.92% | $-3261.19 | 17 | $6520.93 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9312.18 |
| favorite (retired) | 126 | 85 | 67% | $-1120.76 | -8.89% | $-1184.69 | 10 | $9087.67 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 138 | 36 | 26% | $-1265.3 | -9.17% | $-3292.96 | 9 | $8035.3 |
| longshot (retired) | 76 | 2 | 3% | $-4191.55 | -55.15% | $-6091.55 | 8 | $5093.23 |

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
