# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3832 · Last run: 2026-07-25T06:13:03.739Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 183 | 97 | 53% | $1421.32 | 7.77% | $92.75 | 20 | $11630.56 |
| momentum | 107 | 79 | 74% | $845.51 | 7.9% | $357.27 | 25 | $11131.94 |
| copy_month | 111 | 54 | 49% | $449.73 | 4.05% | $-359.36 | 19 | $10547.83 |
| random_control | 48 | 25 | 52% | $-341.99 | -7.12% | $-956.28 | 25 | $10196 |
| fade_longshot | 55 | 53 | 96% | $56.42 | 1.03% | $46.53 | 25 | $10010.71 |
| copy_pro | 148 | 70 | 47% | $-696.63 | -2.95% | $-1546.63 | 23 | $9702.63 |
| mean_revert | 114 | 29 | 25% | $79.58 | 0.7% | $-1948.08 | 25 | $9650.44 |
| mid_momentum | 97 | 55 | 57% | $102.53 | 1.06% | $-110.95 | 25 | $9490.12 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9312.2 |
| favorite | 87 | 57 | 66% | $-836.4 | -9.61% | $-900.33 | 25 | $9194.45 |
| late_favorite | 300 | 232 | 77% | $-1468.3 | -4.89% | $-1509.15 | 19 | $8606.73 |
| whale_fade | 183 | 86 | 47% | $-1239.17 | -6.77% | $-1573.95 | 20 | $8580.86 |
| longshot | 55 | 2 | 4% | $-2091.55 | -38.03% | $-3991.55 | 25 | $8555.01 |

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
