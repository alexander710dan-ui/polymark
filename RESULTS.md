# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16018 · Last run: 2026-07-30T20:10:22.341Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 151 | 93 | 62% | $1531.12 | 10.14% | $1317.64 | 25 | $10560.56 |
| copy_top | 279 | 141 | 51% | $503.53 | 1.8% | $-825.04 | 20 | $10550.56 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10247.3 |
| mm_max | 13 | 8 | 62% | $70.22 | 5.4% | $-47.17 | 4 | $10031.61 |
| copy_pro | 251 | 122 | 49% | $-748.77 | -1.88% | $-1598.77 | 25 | $9883.25 |
| mm_strong | 21 | 12 | 57% | $-16.95 | -0.81% | $-155.05 | 25 | $9856.6 |
| mm_tight | 26 | 15 | 58% | $71.39 | 2.75% | $-66.71 | 14 | $9770.94 |
| mm_slow | 15 | 8 | 53% | $-175.41 | -11.69% | $-292.8 | 21 | $9681.48 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9562.68 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9549.64 |
| mm_sports | 29 | 14 | 48% | $-460.04 | -15.86% | $-598.14 | 16 | $9497.42 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9496.68 |
| momentum | 187 | 132 | 71% | $-46.69 | -0.25% | $-534.93 | 25 | $9377.06 |
| random_control | 75 | 39 | 52% | $-680.95 | -9.08% | $-1295.24 | 25 | $8859.48 |
| whale_fade | 279 | 136 | 49% | $-1237.29 | -4.43% | $-1572.07 | 21 | $8384.24 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9669.46 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8945.62 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8553.94 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5217.43 |

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
