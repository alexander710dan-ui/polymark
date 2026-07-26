# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4818 · Last run: 2026-07-26T02:49:55.360Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 201 | 103 | 51% | $640.06 | 3.18% | $-688.51 | 19 | $10872.43 |
| momentum | 117 | 86 | 74% | $580.02 | 4.96% | $91.78 | 25 | $10423.44 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10331.47 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10075.93 |
| copy_pro | 172 | 83 | 48% | $-733.12 | -2.71% | $-1583.12 | 22 | $9856.08 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9753.58 |
| copy_month | 134 | 61 | 46% | $-631.34 | -4.71% | $-1440.43 | 17 | $9570.84 |
| mid_momentum | 101 | 58 | 57% | $156.75 | 1.55% | $-56.73 | 25 | $9354.41 |
| favorite | 106 | 69 | 65% | $-1080.81 | -10.2% | $-1144.74 | 25 | $8963.67 |
| mean_revert | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $8933.43 |
| late_favorite | 363 | 283 | 78% | $-1280.14 | -3.53% | $-1320.99 | 16 | $8778.03 |
| whale_fade | 201 | 97 | 48% | $-603.82 | -3% | $-938.6 | 19 | $8761.75 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7540.18 |

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
