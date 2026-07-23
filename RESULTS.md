# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2273 · Last run: 2026-07-23T21:14:08.406Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 154 | 77 | 50% | $-46.83 | -0.3% | $-1375.4 | 25 | $10730.3 |
| momentum | 85 | 62 | 73% | $86.6 | 1.02% | $-170.54 | 25 | $10708.81 |
| random_control | 42 | 22 | 52% | $-226.77 | -5.4% | $-841.06 | 25 | $10157.74 |
| whale_fade | 154 | 77 | 50% | $-90.01 | -0.58% | $-424.79 | 25 | $10107.32 |
| mean_revert | 91 | 22 | 24% | $297.95 | 3.27% | $-1729.71 | 25 | $10043.95 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $10010.39 |
| mid_momentum | 71 | 42 | 59% | $178.06 | 2.51% | $14.9 | 25 | $9960.3 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9919.65 |
| copy_month | 77 | 33 | 43% | $-1240.86 | -16.12% | $-1807.53 | 21 | $9613.68 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9405.71 |
| copy_pro | 105 | 46 | 44% | $-1832.05 | -10.75% | $-2682.05 | 22 | $9058.06 |
| favorite | 74 | 47 | 64% | $-857.36 | -11.59% | $-921.29 | 25 | $9045.67 |
| late_favorite | 209 | 163 | 78% | $-935.82 | -4.48% | $-976.67 | 25 | $8433.55 |

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
