# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3668 · Last run: 2026-07-25T02:37:45.469Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 178 | 93 | 52% | $1305.26 | 7.33% | $-23.31 | 24 | $11566.13 |
| momentum | 101 | 73 | 72% | $766.48 | 7.59% | $278.24 | 25 | $11097.58 |
| copy_month | 106 | 51 | 48% | $325.83 | 3.07% | $-483.26 | 23 | $10509.27 |
| random_control | 46 | 24 | 52% | $-254.35 | -5.53% | $-868.64 | 25 | $10181.18 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10006.1 |
| mean_revert | 109 | 29 | 27% | $579.58 | 5.32% | $-1448.08 | 25 | $9963.36 |
| copy_pro | 143 | 66 | 46% | $-1195.72 | -5.26% | $-2045.72 | 24 | $9922.16 |
| mid_momentum | 93 | 53 | 57% | $193.66 | 2.08% | $-19.82 | 25 | $9471.99 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9316.81 |
| favorite | 84 | 55 | 65% | $-759.93 | -9.05% | $-823.86 | 25 | $9201.68 |
| whale_fade | 178 | 85 | 48% | $-908.66 | -5.1% | $-1243.44 | 24 | $8744.49 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8663.16 |
| late_favorite | 294 | 226 | 77% | $-1621.16 | -5.51% | $-1662.01 | 18 | $8464.57 |

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
