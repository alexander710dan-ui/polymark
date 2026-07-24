# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2490 · Last run: 2026-07-24T01:45:35.489Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 96 | 24 | 25% | $319.34 | 3.33% | $-1708.32 | 25 | $10557.25 |
| copy_top | 161 | 83 | 52% | $482.05 | 2.99% | $-846.52 | 21 | $10536.39 |
| momentum | 90 | 65 | 72% | $-71.74 | -0.8% | $-328.88 | 25 | $10523.46 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10131.09 |
| fade_longshot | 51 | 49 | 96% | $27.61 | 0.54% | $17.72 | 25 | $9963.65 |
| whale_fade | 161 | 78 | 48% | $-533.6 | -3.31% | $-868.38 | 21 | $9815.84 |
| copy_pro | 112 | 50 | 45% | $-1688.24 | -9.25% | $-2538.24 | 16 | $9648.65 |
| mid_momentum | 76 | 44 | 58% | $-25.23 | -0.33% | $-188.39 | 25 | $9627.56 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9485.74 |
| copy_month | 84 | 37 | 44% | $-938.19 | -11.17% | $-1504.86 | 16 | $9384.98 |
| longshot | 51 | 2 | 4% | $-1691.55 | -33.17% | $-3591.55 | 25 | $9335.85 |
| favorite | 76 | 48 | 63% | $-927.49 | -12.2% | $-991.42 | 25 | $9032.25 |
| late_favorite | 229 | 177 | 77% | $-1209.35 | -5.28% | $-1250.2 | 24 | $8392.88 |

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
