# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2438 · Last run: 2026-07-24T00:40:29.803Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 159 | 81 | 51% | $381.61 | 2.4% | $-946.96 | 23 | $10851.38 |
| momentum | 90 | 65 | 72% | $-71.74 | -0.8% | $-328.88 | 25 | $10416.37 |
| mean_revert | 96 | 24 | 25% | $319.34 | 3.33% | $-1708.32 | 25 | $10171.84 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10122.74 |
| fade_longshot | 51 | 49 | 96% | $27.61 | 0.54% | $17.72 | 25 | $9932.76 |
| whale_fade | 159 | 78 | 49% | $-333.6 | -2.1% | $-668.38 | 23 | $9864.06 |
| longshot | 51 | 2 | 4% | $-1691.55 | -33.17% | $-3591.55 | 25 | $9798.79 |
| mid_momentum | 76 | 44 | 58% | $-25.23 | -0.33% | $-188.39 | 25 | $9705.43 |
| copy_pro | 110 | 48 | 44% | $-1813.68 | -10.1% | $-2663.68 | 18 | $9543.01 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9420.47 |
| copy_month | 82 | 36 | 44% | $-913.63 | -11.14% | $-1480.3 | 18 | $9378.83 |
| favorite | 76 | 48 | 63% | $-927.49 | -12.2% | $-991.42 | 25 | $8905.28 |
| late_favorite | 224 | 172 | 77% | $-1373.56 | -6.13% | $-1414.41 | 25 | $8622.57 |

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
