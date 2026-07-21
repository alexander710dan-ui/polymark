# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80 · Last run: 2026-07-21T23:21:54.563Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 13 | 6 | 46% | $736.39 | 31.34% | $27.3 | 20 | $10778.08 |
| copy_top | 119 | 64 | 54% | $661.06 | 5.56% | $-667.51 | 25 | $10538.57 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10061.83 |
| momentum | 62 | 46 | 74% | $84.96 | 1.37% | $-172.18 | 25 | $10039.85 |
| strong_dip | 3 | 1 | 33% | $-111.32 | -37.11% | $-200 | 8 | $9988.57 |
| mid_momentum | 28 | 17 | 61% | $157.87 | 5.64% | $19.77 | 25 | $9957.07 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9670.77 |
| copy_month | 14 | 6 | 43% | $-515.29 | -36.81% | $-693.07 | 16 | $9409.43 |
| favorite | 51 | 32 | 63% | $-671.3 | -13.16% | $-732.85 | 25 | $9294.93 |
| mean_revert | 65 | 15 | 23% | $-761.64 | -11.72% | $-2070.09 | 25 | $9240.36 |
| late_favorite | 111 | 85 | 77% | $-814.53 | -7.34% | $-855.38 | 14 | $9108.03 |
| whale_fade | 119 | 55 | 46% | $-951.73 | -8% | $-1286.51 | 25 | $9106.55 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7350.13 |

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
