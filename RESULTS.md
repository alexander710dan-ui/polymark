# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3646 · Last run: 2026-07-25T02:10:18.982Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 177 | 92 | 52% | $1266.37 | 7.15% | $-62.2 | 24 | $11484.29 |
| momentum | 99 | 72 | 73% | $843.02 | 8.52% | $354.78 | 25 | $11123.52 |
| copy_month | 104 | 49 | 47% | $169.55 | 1.63% | $-639.54 | 24 | $10424.65 |
| random_control | 46 | 24 | 52% | $-254.35 | -5.53% | $-868.64 | 25 | $10178.49 |
| mean_revert | 108 | 28 | 26% | $452.31 | 4.19% | $-1575.35 | 25 | $10085.87 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10004.09 |
| copy_pro | 142 | 65 | 46% | $-1277.54 | -5.64% | $-2127.54 | 21 | $9858.14 |
| mid_momentum | 92 | 53 | 58% | $293.66 | 3.19% | $80.18 | 25 | $9443.92 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9330.2 |
| favorite | 84 | 55 | 65% | $-759.93 | -9.05% | $-823.86 | 25 | $9203.07 |
| whale_fade | 177 | 85 | 48% | $-808.66 | -4.57% | $-1143.44 | 24 | $9022.81 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8696.92 |
| late_favorite | 292 | 224 | 77% | $-1689.73 | -5.79% | $-1730.58 | 20 | $8367.93 |

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
