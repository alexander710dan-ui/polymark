# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16046 · Last run: 2026-07-30T20:24:07.968Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 279 | 141 | 51% | $503.53 | 1.8% | $-825.04 | 20 | $10574.5 |
| mid_momentum | 152 | 93 | 61% | $1431.12 | 9.42% | $1217.64 | 25 | $10525.14 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10247.17 |
| mm_max | 14 | 8 | 57% | $-29.78 | -2.13% | $-147.17 | 4 | $10037.76 |
| copy_pro | 252 | 123 | 49% | $-585.13 | -1.46% | $-1435.13 | 25 | $9897.56 |
| mm_tight | 27 | 15 | 56% | $-28.61 | -1.06% | $-166.71 | 13 | $9712.6 |
| mm_strong | 22 | 12 | 55% | $-116.95 | -5.32% | $-255.05 | 24 | $9672.02 |
| mm_slow | 16 | 9 | 56% | $-119.16 | -7.45% | $-236.55 | 20 | $9571.43 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9563.85 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9546.87 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9488.46 |
| momentum | 188 | 132 | 70% | $-146.69 | -0.78% | $-634.93 | 25 | $9347.88 |
| mm_sports | 30 | 14 | 47% | $-560.04 | -18.67% | $-698.14 | 15 | $9330.42 |
| random_control | 76 | 39 | 51% | $-780.95 | -10.28% | $-1395.24 | 25 | $8869.42 |
| whale_fade | 279 | 136 | 49% | $-1237.29 | -4.43% | $-1572.07 | 21 | $8338.93 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9673.5 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8943.11 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8563.94 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5217.98 |

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
