# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19564 · Last run: 2026-08-01T02:04:03.071Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 320 | 168 | 53% | $808.95 | 2.53% | $-519.62 | 18 | $10768.36 |
| strong_dip | 75 | 46 | 61% | $-195.77 | -2.61% | $-288.08 | 25 | $10076.84 |
| copy_pro | 293 | 150 | 51% | $70.73 | 0.15% | $-779.27 | 24 | $10051.34 |
| fade_longshot | 84 | 80 | 95% | $9.84 | 0.12% | $-0.9 | 25 | $9966.28 |
| mid_momentum | 163 | 94 | 58% | $573.98 | 3.52% | $360.5 | 25 | $9879.3 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9464.82 |
| random_control | 89 | 49 | 55% | $-268.88 | -3.02% | $-883.17 | 25 | $9390.71 |
| super | 55 | 25 | 45% | $-349.65 | -4.72% | $-565.5 | 14 | $9130.25 |
| mm_max | 40 | 18 | 45% | $-852.83 | -21.32% | $-970.22 | 5 | $9130.01 |
| mm_tight | 110 | 55 | 50% | $-968.87 | -8.81% | $-1171.9 | 14 | $8976.99 |
| mm_slow | 40 | 18 | 45% | $-1051.39 | -26.28% | $-1168.78 | 25 | $8891.98 |
| mm_strong | 53 | 24 | 45% | $-915.26 | -17.27% | $-1119.21 | 25 | $8493.34 |
| mm_sports | 126 | 63 | 50% | $-1583.39 | -12.57% | $-1786.42 | 16 | $8487.76 |
| momentum | 202 | 135 | 67% | $-1213.55 | -6.01% | $-1701.79 | 25 | $8101.36 |
| whale_fade | 321 | 150 | 47% | $-2816.68 | -8.77% | $-3151.46 | 18 | $6942.37 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9324.09 |
| favorite (retired) | 123 | 82 | 67% | $-1175.39 | -9.56% | $-1239.32 | 13 | $9082.01 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 136 | 36 | 26% | $-1065.3 | -7.83% | $-3092.96 | 11 | $8062.07 |
| longshot (retired) | 72 | 2 | 3% | $-3791.55 | -52.66% | $-5691.55 | 12 | $5121.14 |

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
