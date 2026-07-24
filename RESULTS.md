# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2694 · Last run: 2026-07-24T06:00:57.223Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 93 | 68 | 73% | $58.87 | 0.63% | $-198.27 | 25 | $10594.38 |
| copy_top | 164 | 84 | 51% | $386.13 | 2.35% | $-942.44 | 19 | $10559.88 |
| mean_revert | 98 | 25 | 26% | $536.01 | 5.47% | $-1491.65 | 25 | $10558.82 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10079.02 |
| fade_longshot | 52 | 50 | 96% | $37.5 | 0.72% | $27.61 | 25 | $9960.38 |
| whale_fade | 164 | 80 | 49% | $-535.02 | -3.26% | $-869.8 | 19 | $9825.1 |
| mid_momentum | 79 | 45 | 57% | $-149.79 | -1.9% | $-312.95 | 25 | $9708.7 |
| copy_pro | 117 | 55 | 47% | $-1062.07 | -5.6% | $-1912.07 | 12 | $9677.17 |
| strong_dip | 34 | 18 | 53% | $-419.16 | -12.33% | $-511.47 | 25 | $9466.76 |
| copy_month | 87 | 39 | 45% | $-887.05 | -10.2% | $-1453.72 | 14 | $9411.34 |
| longshot | 52 | 2 | 4% | $-1791.55 | -34.45% | $-3691.55 | 25 | $9390.87 |
| favorite | 78 | 50 | 64% | $-872.32 | -11.18% | $-936.25 | 25 | $9041.77 |
| late_favorite | 238 | 183 | 77% | $-1389.75 | -5.84% | $-1430.6 | 22 | $8408.93 |

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
