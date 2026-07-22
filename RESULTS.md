# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1119 · Last run: 2026-07-22T21:08:02.770Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 73 | 16 | 22% | $-1414.36 | -19.37% | $-2722.81 | 25 | $10796.8 |
| copy_top | 136 | 69 | 51% | $-93.7 | -0.69% | $-1422.27 | 25 | $10511.96 |
| momentum | 69 | 53 | 77% | $438.39 | 6.35% | $181.25 | 25 | $10338.13 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9997.95 |
| fade_longshot | 47 | 46 | 98% | $107.12 | 2.28% | $97.23 | 25 | $9978.94 |
| copy_pro | 57 | 24 | 42% | $-1284 | -14.11% | $-1993.09 | 25 | $9897.63 |
| strong_dip | 18 | 11 | 61% | $37.99 | 2.11% | $-54.32 | 25 | $9871.73 |
| mid_momentum | 48 | 31 | 65% | $499.58 | 10.41% | $361.48 | 25 | $9871.5 |
| whale_fade | 136 | 67 | 49% | $-440.47 | -3.24% | $-775.25 | 25 | $9627.56 |
| favorite | 62 | 41 | 66% | $-452.35 | -7.3% | $-516.28 | 25 | $9268.37 |
| longshot | 47 | 1 | 2% | $-3291.55 | -70.03% | $-4600 | 25 | $9134 |
| copy_month | 43 | 17 | 40% | $-1722.07 | -40.05% | $-1899.85 | 25 | $8997.62 |
| late_favorite | 150 | 117 | 78% | $-785.76 | -5.24% | $-826.61 | 25 | $8979.53 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

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
