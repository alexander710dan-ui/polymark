# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3356 · Last run: 2026-07-24T20:07:12.952Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 172 | 90 | 52% | $1200.48 | 6.98% | $-128.09 | 24 | $11133.17 |
| momentum | 95 | 69 | 73% | $447.11 | 4.71% | $-41.13 | 25 | $10820.49 |
| mean_revert | 106 | 28 | 26% | $652.31 | 6.15% | $-1375.35 | 25 | $10216.24 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10072.37 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $9997.04 |
| copy_month | 97 | 46 | 47% | $172.1 | 1.77% | $-636.99 | 23 | $9939.41 |
| mid_momentum | 89 | 50 | 56% | $-151.38 | -1.7% | $-314.54 | 25 | $9528.32 |
| strong_dip | 39 | 21 | 54% | $-379.23 | -9.72% | $-471.54 | 25 | $9495.4 |
| copy_pro | 127 | 58 | 46% | $-1558.38 | -7.68% | $-2408.38 | 21 | $9352.27 |
| whale_fade | 172 | 82 | 48% | $-833.76 | -4.85% | $-1168.54 | 24 | $9225.08 |
| favorite | 81 | 52 | 64% | $-896.49 | -11.07% | $-960.42 | 25 | $9160.79 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8756.66 |
| late_favorite | 270 | 205 | 76% | $-1831.78 | -6.78% | $-1872.63 | 25 | $8215.56 |

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
