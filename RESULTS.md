# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2201 · Last run: 2026-07-23T19:43:58.986Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 83 | 61 | 73% | $170.32 | 2.05% | $-86.82 | 25 | $10777.67 |
| copy_top | 153 | 77 | 50% | $53.17 | 0.35% | $-1275.4 | 24 | $10436.98 |
| random_control | 42 | 22 | 52% | $-226.77 | -5.4% | $-841.06 | 25 | $10244.58 |
| whale_fade | 153 | 76 | 50% | $-146.26 | -0.96% | $-481.04 | 24 | $10199.05 |
| mid_momentum | 68 | 41 | 60% | $333.13 | 4.9% | $169.97 | 25 | $9998.35 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9991.61 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9921.57 |
| mean_revert | 88 | 21 | 24% | $143.4 | 1.63% | $-1884.26 | 25 | $9826 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9387.06 |
| copy_month | 74 | 32 | 43% | $-1529.1 | -20.66% | $-2095.77 | 22 | $9303.79 |
| favorite | 73 | 47 | 64% | $-757.36 | -10.37% | $-821.29 | 25 | $9100.52 |
| copy_pro | 102 | 45 | 44% | $-1702.42 | -10.29% | $-2552.42 | 22 | $8953.51 |
| late_favorite | 206 | 161 | 78% | $-893.29 | -4.34% | $-934.14 | 25 | $8587.83 |

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
