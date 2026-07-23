# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1263 · Last run: 2026-07-23T00:08:19.290Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 76 | 18 | 24% | $707.42 | 9.31% | $-1320.24 | 25 | $10753.46 |
| momentum | 72 | 55 | 76% | $416.49 | 5.78% | $159.35 | 25 | $10409.75 |
| copy_top | 139 | 70 | 50% | $272.97 | 1.96% | $-1055.6 | 25 | $10361.7 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10023.07 |
| fade_longshot | 48 | 46 | 96% | $7.12 | 0.15% | $-2.77 | 25 | $9965.38 |
| whale_fade | 139 | 69 | 50% | $-245.96 | -1.77% | $-580.74 | 25 | $9815.62 |
| mid_momentum | 53 | 32 | 60% | $166.52 | 3.14% | $28.42 | 25 | $9783.58 |
| strong_dip | 22 | 12 | 55% | $-169.7 | -7.71% | $-262.01 | 23 | $9726.13 |
| copy_pro | 68 | 28 | 41% | $-904.45 | -8.08% | $-1754.45 | 25 | $9432.1 |
| longshot | 48 | 2 | 4% | $-1391.55 | -28.99% | $-3291.55 | 25 | $9317.06 |
| favorite | 65 | 42 | 65% | $-600.83 | -9.24% | $-664.76 | 25 | $9271.56 |
| late_favorite | 166 | 128 | 77% | $-1004.12 | -6.05% | $-1044.97 | 25 | $9096.19 |
| copy_month | 51 | 21 | 41% | $-1229.96 | -24.12% | $-1796.63 | 25 | $8904.54 |

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
