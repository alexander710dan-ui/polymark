# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4327 · Last run: 2026-07-25T16:35:22.007Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 189 | 99 | 52% | $1275.6 | 6.75% | $-52.97 | 25 | $11332.8 |
| momentum | 108 | 79 | 73% | $745.51 | 6.9% | $257.27 | 25 | $10750.43 |
| random_control | 50 | 27 | 54% | $-141.34 | -2.83% | $-755.63 | 25 | $10437.72 |
| copy_month | 118 | 56 | 47% | $204.01 | 1.73% | $-605.08 | 25 | $10159.63 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10054.32 |
| strong_dip | 45 | 24 | 53% | $-528.71 | -11.75% | $-621.02 | 25 | $9579.39 |
| copy_pro | 157 | 73 | 46% | $-1106.38 | -4.45% | $-1956.38 | 25 | $9495.73 |
| mean_revert | 114 | 29 | 25% | $79.58 | 0.7% | $-1948.08 | 25 | $9399.2 |
| mid_momentum | 98 | 55 | 56% | $2.53 | 0.03% | $-210.95 | 25 | $9345.95 |
| favorite | 90 | 59 | 66% | $-864 | -9.6% | $-927.93 | 25 | $9226.38 |
| whale_fade | 189 | 89 | 47% | $-1049.45 | -5.55% | $-1384.23 | 25 | $8554.29 |
| late_favorite | 316 | 246 | 78% | $-1292.56 | -4.09% | $-1333.41 | 25 | $8528.19 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7902.82 |

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
