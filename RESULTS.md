# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19623 · Last run: 2026-08-01T02:33:33.368Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 322 | 168 | 52% | $608.95 | 1.89% | $-719.62 | 20 | $10814.92 |
| strong_dip | 75 | 46 | 61% | $-195.77 | -2.61% | $-288.08 | 25 | $10082.17 |
| copy_pro | 296 | 152 | 51% | $-10.49 | -0.02% | $-860.49 | 25 | $9999.43 |
| fade_longshot | 84 | 80 | 95% | $9.84 | 0.12% | $-0.9 | 25 | $9978.89 |
| mid_momentum | 164 | 94 | 57% | $473.98 | 2.89% | $260.5 | 25 | $9868.24 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9464.38 |
| random_control | 89 | 49 | 55% | $-268.88 | -3.02% | $-883.17 | 25 | $9407.03 |
| super | 55 | 25 | 45% | $-349.65 | -4.72% | $-565.5 | 14 | $9128.58 |
| mm_max | 42 | 19 | 45% | $-874.26 | -20.82% | $-991.65 | 3 | $9112.1 |
| mm_tight | 113 | 57 | 50% | $-901.62 | -7.98% | $-1104.65 | 12 | $8983.68 |
| mm_slow | 40 | 18 | 45% | $-1051.39 | -26.28% | $-1168.78 | 25 | $8857.18 |
| mm_sports | 130 | 66 | 51% | $-1454.85 | -11.19% | $-1657.88 | 14 | $8492.6 |
| mm_strong | 53 | 24 | 45% | $-915.26 | -17.27% | $-1119.21 | 25 | $8466.05 |
| momentum | 204 | 136 | 67% | $-1311.82 | -6.43% | $-1800.06 | 25 | $8068.57 |
| whale_fade | 323 | 152 | 47% | $-2639.18 | -8.17% | $-2973.96 | 20 | $6607.54 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9320 |
| favorite (retired) | 123 | 82 | 67% | $-1175.39 | -9.56% | $-1239.32 | 13 | $9082.18 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 136 | 36 | 26% | $-1065.3 | -7.83% | $-3092.96 | 11 | $8056.93 |
| longshot (retired) | 72 | 2 | 3% | $-3791.55 | -52.66% | $-5691.55 | 12 | $5118.48 |

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
