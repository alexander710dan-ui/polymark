# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 68 · Last run: 2026-07-21T20:02:52.387Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 115 | 63 | 55% | $783.28 | 6.81% | $-545.29 | 20 | $10616.01 |
| copy_pro | 10 | 5 | 50% | $830.83 | 48.87% | $121.74 | 10 | $10610.34 |
| momentum | 61 | 46 | 75% | $184.96 | 3.03% | $-72.18 | 25 | $10152.62 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10057.32 |
| strong_dip | 3 | 1 | 33% | $-111.32 | -37.11% | $-200 | 8 | $9964.01 |
| mid_momentum | 23 | 13 | 57% | $-102.37 | -4.45% | $-229.64 | 24 | $9837.93 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9704.52 |
| copy_month | 10 | 5 | 50% | $-393.07 | -39.31% | $-457 | 9 | $9494.68 |
| favorite | 49 | 31 | 63% | $-610.19 | -12.45% | $-671.74 | 25 | $9358.14 |
| mean_revert | 62 | 14 | 23% | $-916.19 | -14.78% | $-2224.64 | 25 | $9141.76 |
| whale_fade | 115 | 52 | 45% | $-1152.96 | -10.03% | $-1487.74 | 20 | $9096.24 |
| late_favorite | 102 | 76 | 75% | $-1006.85 | -9.87% | $-1047.7 | 18 | $9085.48 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7484.42 |

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
