# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3185 · Last run: 2026-07-24T16:33:12.139Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 169 | 88 | 52% | $548.09 | 3.24% | $-780.48 | 25 | $10715.96 |
| mean_revert | 102 | 26 | 25% | $448.51 | 4.4% | $-1579.15 | 25 | $10465.33 |
| momentum | 94 | 68 | 72% | $-41.13 | -0.44% | $-298.27 | 25 | $10250.29 |
| fade_longshot | 52 | 50 | 96% | $37.5 | 0.72% | $27.61 | 25 | $10020.7 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10007.75 |
| copy_month | 92 | 43 | 47% | $-725.09 | -7.88% | $-1291.76 | 24 | $9496.98 |
| strong_dip | 37 | 20 | 54% | $-304.23 | -8.22% | $-396.54 | 25 | $9470.04 |
| copy_pro | 122 | 57 | 47% | $-1284.57 | -6.57% | $-2134.57 | 23 | $9246.44 |
| whale_fade | 169 | 81 | 48% | $-771.86 | -4.57% | $-1106.64 | 25 | $9203.85 |
| favorite | 80 | 51 | 64% | $-945.74 | -11.82% | $-1009.67 | 25 | $9128.75 |
| mid_momentum | 84 | 46 | 55% | $-477.38 | -5.68% | $-640.54 | 25 | $9118.91 |
| longshot | 52 | 2 | 4% | $-1791.55 | -34.45% | $-3691.55 | 25 | $8478.7 |
| late_favorite | 259 | 197 | 76% | $-1720.61 | -6.64% | $-1761.46 | 25 | $8163.02 |

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
