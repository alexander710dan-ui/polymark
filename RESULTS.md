# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5250 · Last run: 2026-07-26T11:50:44.657Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 204 | 106 | 52% | $1003.38 | 4.92% | $-325.19 | 22 | $10945.9 |
| momentum | 118 | 87 | 74% | $588.72 | 4.99% | $100.48 | 25 | $10375.39 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10345.54 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10084.86 |
| strong_dip | 48 | 26 | 54% | $-451.83 | -9.41% | $-544.14 | 25 | $9744.51 |
| copy_month | 137 | 64 | 47% | $-268.02 | -1.96% | $-1077.11 | 20 | $9621.47 |
| copy_pro | 175 | 84 | 48% | $-1031.6 | -3.75% | $-1881.6 | 25 | $9405.38 |
| mid_momentum | 102 | 58 | 57% | $56.75 | 0.56% | $-156.73 | 25 | $9309.69 |
| mean_revert | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $8876.38 |
| late_favorite | 368 | 287 | 78% | $-1289.66 | -3.5% | $-1330.51 | 25 | $8861.27 |
| favorite | 111 | 71 | 64% | $-1306.01 | -11.77% | $-1369.94 | 25 | $8769.61 |
| whale_fade | 204 | 97 | 48% | $-903.82 | -4.43% | $-1238.6 | 22 | $8605.04 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7355.81 |

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
