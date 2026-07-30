# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 15615 · Last run: 2026-07-30T16:47:46.912Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 276 | 139 | 50% | $348.12 | 1.26% | $-980.45 | 21 | $10700.45 |
| mid_momentum | 149 | 92 | 62% | $1569.83 | 10.54% | $1356.35 | 25 | $10611.43 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10233.89 |
| mm_strong | 8 | 4 | 50% | $-94.35 | -11.79% | $-232.45 | 25 | $10219.28 |
| mm_tight | 7 | 3 | 43% | $-114.05 | -16.29% | $-252.15 | 18 | $10047.67 |
| mm_slow | 5 | 2 | 40% | $-175.31 | -35.06% | $-250.75 | 21 | $10025.44 |
| mm_sports | 9 | 4 | 44% | $-194.35 | -21.59% | $-332.45 | 23 | $9968.88 |
| mm_max | 4 | 1 | 25% | $-224.56 | -56.14% | $-300 | 5 | $9925.25 |
| copy_pro | 248 | 120 | 48% | $-1048.3 | -2.67% | $-1898.3 | 23 | $9807.25 |
| strong_dip | 60 | 34 | 57% | $-511.6 | -8.53% | $-603.91 | 25 | $9594.08 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9556.16 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9468.89 |
| momentum | 184 | 129 | 70% | $-168.61 | -0.92% | $-656.85 | 25 | $9402.03 |
| random_control | 72 | 38 | 53% | $-528.01 | -7.33% | $-1142.3 | 25 | $8939.48 |
| whale_fade | 276 | 135 | 49% | $-1175.39 | -4.26% | $-1510.17 | 22 | $8027.47 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9642.91 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8952.47 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8580.92 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5244.58 |

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
