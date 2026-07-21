# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 63 · Last run: 2026-07-21T12:57:39.562Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 106 | 58 | 55% | $1076.35 | 10.15% | 16 | $10980.88 |
| mid_momentum | 3 | 2 | 67% | $99.68 | 33.23% | 21 | $10097.46 |
| momentum | 56 | 42 | 75% | $98.24 | 1.75% | 25 | $10069.53 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10048.96 |
| strong_dip | 1 | 0 | 0% | $-100 | -100% | 5 | $9889.58 |
| copy_month | 1 | 0 | 0% | $-100 | -100% | 5 | $9815.68 |
| copy_pro | 1 | 0 | 0% | $-150 | -100% | 6 | $9646.06 |
| mean_revert | 55 | 13 | 24% | $-632.86 | -11.51% | 25 | $9524.15 |
| favorite | 43 | 27 | 63% | $-559.11 | -13% | 25 | $9432.29 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9396.02 |
| late_favorite | 79 | 59 | 75% | $-770.39 | -9.75% | 25 | $9163.86 |
| whale_fade | 106 | 48 | 45% | $-856.43 | -8.08% | 16 | $8791.37 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7425.21 |

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
