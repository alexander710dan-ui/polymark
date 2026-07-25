# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3825 · Last run: 2026-07-25T06:04:21.144Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 182 | 96 | 53% | $1408.96 | 7.74% | $80.39 | 21 | $11628.12 |
| momentum | 105 | 77 | 73% | $819.16 | 7.8% | $330.92 | 25 | $11135.88 |
| copy_month | 111 | 54 | 49% | $449.73 | 4.05% | $-359.36 | 19 | $10545.83 |
| random_control | 48 | 25 | 52% | $-341.99 | -7.12% | $-956.28 | 25 | $10196.63 |
| fade_longshot | 54 | 52 | 96% | $47.72 | 0.88% | $37.83 | 25 | $10013.11 |
| mean_revert | 113 | 29 | 26% | $179.58 | 1.59% | $-1848.08 | 25 | $9704.79 |
| copy_pro | 148 | 70 | 47% | $-696.63 | -2.95% | $-1546.63 | 23 | $9698.82 |
| mid_momentum | 97 | 55 | 57% | $102.53 | 1.06% | $-110.95 | 25 | $9484.93 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9302.87 |
| favorite | 86 | 56 | 65% | $-846.29 | -9.84% | $-910.22 | 25 | $9192.54 |
| late_favorite | 299 | 231 | 77% | $-1481.94 | -4.96% | $-1522.79 | 19 | $8600.02 |
| whale_fade | 182 | 86 | 47% | $-1139.17 | -6.26% | $-1473.95 | 21 | $8587.09 |
| longshot | 54 | 2 | 4% | $-1991.55 | -36.88% | $-3891.55 | 25 | $8565.77 |

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
