# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3752 · Last run: 2026-07-25T04:27:53.357Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 180 | 95 | 53% | $1496.6 | 8.31% | $168.03 | 23 | $11593.15 |
| momentum | 103 | 75 | 73% | $777.64 | 7.55% | $289.4 | 25 | $11160.37 |
| copy_month | 109 | 54 | 50% | $649.73 | 5.96% | $-159.36 | 21 | $10657.97 |
| random_control | 47 | 24 | 51% | $-354.35 | -7.54% | $-968.64 | 25 | $10197.71 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10010.57 |
| copy_pro | 147 | 70 | 48% | $-496.63 | -2.12% | $-1346.63 | 21 | $9989.64 |
| mean_revert | 111 | 29 | 26% | $379.58 | 3.42% | $-1648.08 | 25 | $9911.65 |
| mid_momentum | 96 | 54 | 56% | $55.47 | 0.58% | $-158.01 | 25 | $9487.89 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9338.39 |
| favorite | 85 | 55 | 65% | $-859.93 | -10.12% | $-923.86 | 25 | $9173.12 |
| whale_fade | 180 | 85 | 47% | $-1108.66 | -6.16% | $-1443.44 | 23 | $8714.08 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8625.59 |
| late_favorite | 299 | 231 | 77% | $-1481.94 | -4.96% | $-1522.79 | 14 | $8552.65 |

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
