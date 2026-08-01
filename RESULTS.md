# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19953 · Last run: 2026-08-01T05:18:47.605Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 304 | 158 | 52% | $784.02 | 1.65% | $-65.98 | 20 | $10854.05 |
| copy_top | 327 | 172 | 53% | $575.17 | 1.76% | $-753.4 | 17 | $10793.46 |
| fade_longshot | 92 | 88 | 96% | $54.99 | 0.6% | $44.25 | 25 | $10012.79 |
| strong_dip | 81 | 49 | 60% | $-337.27 | -4.16% | $-429.58 | 20 | $9993.05 |
| mid_momentum | 168 | 94 | 56% | $73.98 | 0.44% | $-139.5 | 25 | $9889.07 |
| random_control | 95 | 53 | 56% | $-281.8 | -2.97% | $-896.09 | 25 | $9468.9 |
| ai_judge | 5 | 0 | 0% | $-500 | -100% | $-400 | 4 | $9463.6 |
| mm_tight | 120 | 61 | 51% | $-864.48 | -7.2% | $-1067.51 | 6 | $9326.49 |
| mm_max | 44 | 20 | 45% | $-856.87 | -19.47% | $-974.26 | 2 | $9263.24 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9121.53 |
| mm_slow | 41 | 18 | 44% | $-1151.39 | -28.08% | $-1268.78 | 25 | $8898.3 |
| mm_sports | 138 | 71 | 51% | $-1351.04 | -9.79% | $-1554.07 | 7 | $8846.2 |
| mm_strong | 56 | 25 | 45% | $-1002.49 | -17.9% | $-1206.44 | 25 | $8639.28 |
| momentum | 211 | 141 | 67% | $-1293.32 | -6.13% | $-1781.56 | 25 | $8265.7 |
| whale_fade | 328 | 153 | 47% | $-2926.41 | -8.92% | $-3261.19 | 17 | $6543.21 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9312.18 |
| favorite (retired) | 126 | 85 | 67% | $-1120.76 | -8.89% | $-1184.69 | 10 | $9087.74 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 138 | 36 | 26% | $-1265.3 | -9.17% | $-3292.96 | 9 | $8035.36 |
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
