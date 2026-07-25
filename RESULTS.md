# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3656 · Last run: 2026-07-25T02:22:43.961Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 177 | 92 | 52% | $1266.37 | 7.15% | $-62.2 | 25 | $11593.49 |
| momentum | 101 | 73 | 72% | $766.48 | 7.59% | $278.24 | 25 | $11109.54 |
| copy_month | 104 | 49 | 47% | $169.55 | 1.63% | $-639.54 | 25 | $10564.62 |
| random_control | 46 | 24 | 52% | $-254.35 | -5.53% | $-868.64 | 25 | $10198.33 |
| mean_revert | 109 | 29 | 27% | $579.58 | 5.32% | $-1448.08 | 25 | $10111.72 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10003.51 |
| copy_pro | 143 | 66 | 46% | $-1195.72 | -5.26% | $-2045.72 | 24 | $9985.66 |
| mid_momentum | 93 | 53 | 57% | $193.66 | 2.08% | $-19.82 | 25 | $9498.5 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9325.81 |
| favorite | 84 | 55 | 65% | $-759.93 | -9.05% | $-823.86 | 25 | $9193.71 |
| whale_fade | 177 | 85 | 48% | $-808.66 | -4.57% | $-1143.44 | 25 | $8783.73 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8708.86 |
| late_favorite | 293 | 225 | 77% | $-1658.15 | -5.66% | $-1699 | 19 | $8460.47 |

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
