# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1368 · Last run: 2026-07-23T02:19:50.564Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 78 | 19 | 24% | $810.45 | 10.39% | $-1217.21 | 25 | $10718.03 |
| momentum | 74 | 55 | 74% | $216.49 | 2.93% | $-40.65 | 25 | $10412.08 |
| copy_top | 144 | 72 | 50% | $83.12 | 0.58% | $-1245.45 | 21 | $10230.48 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10070.07 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9963.08 |
| whale_fade | 144 | 72 | 50% | $-197.01 | -1.37% | $-531.79 | 21 | $9849.93 |
| strong_dip | 23 | 13 | 57% | $-110.97 | -4.82% | $-203.28 | 24 | $9811.56 |
| mid_momentum | 56 | 33 | 59% | $51.71 | 0.92% | $-86.39 | 25 | $9655.08 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9313.57 |
| favorite | 67 | 43 | 64% | $-639.54 | -9.55% | $-703.47 | 25 | $9251.14 |
| late_favorite | 172 | 134 | 78% | $-869.11 | -5.05% | $-909.96 | 21 | $9154.93 |
| copy_pro | 75 | 31 | 41% | $-1313.8 | -10.55% | $-2163.8 | 23 | $9045.88 |
| copy_month | 58 | 23 | 40% | $-1618.06 | -27.9% | $-2184.73 | 19 | $8490.54 |

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
