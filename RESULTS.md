# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 66 · Last run: 2026-07-21T16:47:41.014Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_pro | 9 | 5 | 56% | $1030.83 | 68.72% | 7 | $11040.49 |
| copy_top | 112 | 61 | 54% | $856.55 | 7.65% | 20 | $10869.41 |
| fade_longshot | 37 | 36 | 97% | $61.33 | 1.66% | 25 | $10064 |
| momentum | 57 | 43 | 75% | $183.43 | 3.22% | 25 | $10013.45 |
| strong_dip | 2 | 1 | 50% | $-11.32 | -5.66% | 7 | $10010.49 |
| mid_momentum | 14 | 8 | 57% | $-1.71 | -0.12% | 23 | $9841.69 |
| copy_month | 7 | 3 | 43% | $-319.8 | -45.69% | 9 | $9707.3 |
| mean_revert | 56 | 13 | 23% | $-732.86 | -13.09% | 25 | $9688.42 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9523.44 |
| favorite | 46 | 30 | 65% | $-445.33 | -9.68% | 25 | $9271.48 |
| late_favorite | 91 | 68 | 75% | $-882.62 | -9.7% | 24 | $9032.09 |
| whale_fade | 112 | 51 | 46% | $-959.34 | -8.57% | 20 | $8785.59 |
| longshot | 37 | 1 | 3% | $-2291.55 | -61.93% | 25 | $7454.07 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **late_favorite** — buys 70–93¢ favourites within 2 days of resolution
- **copy_top** — mirrors what the top-10 leaderboard wallets bought in the last 24h (≥$500, ≥70% agreement)
- **copy_pro** — copy trading with everything turned on: efficiency-filtered top-25 wallets, 6h freshness, refuses to chase prices that ran >5¢ past the whales' entry, conviction-scaled stakes ($100–250)
- **copy_month** — copy_top's exact rules, but following the top-10 of the MONTHLY leaderboard (in-form traders)
- **whale_fade** — bets against copy_top's picks (the control for copy_top)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (momentum won 75% of bets and still lost money buying 95¢ sides)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite (mean_revert died buying dying longshots; this only catches falling *leaders*)
- **random_control** — coin flips, the baseline every strategy must beat

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
