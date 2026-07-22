# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1161 · Last run: 2026-07-22T22:00:50.804Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 74 | 17 | 23% | $-1220.24 | -16.49% | $-2528.69 | 25 | $10795.22 |
| copy_top | 137 | 69 | 50% | $-193.7 | -1.41% | $-1522.27 | 25 | $10414.52 |
| momentum | 70 | 54 | 77% | $464.97 | 6.64% | $207.83 | 25 | $10372.54 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10002.55 |
| fade_longshot | 47 | 46 | 98% | $107.12 | 2.28% | $97.23 | 25 | $9970.01 |
| mid_momentum | 51 | 31 | 61% | $199.58 | 3.91% | $61.48 | 25 | $9915.63 |
| whale_fade | 137 | 68 | 50% | $-284.06 | -2.07% | $-618.84 | 25 | $9803.96 |
| strong_dip | 21 | 12 | 57% | $-69.7 | -3.32% | $-162.01 | 23 | $9777.35 |
| copy_pro | 61 | 25 | 41% | $-1584 | -16.16% | $-2293.09 | 25 | $9638.47 |
| longshot | 47 | 1 | 2% | $-3291.55 | -70.03% | $-4600 | 25 | $9271.15 |
| favorite | 63 | 41 | 65% | $-552.35 | -8.77% | $-616.28 | 25 | $9260.53 |
| late_favorite | 157 | 122 | 78% | $-872.32 | -5.56% | $-913.17 | 25 | $9021.16 |
| copy_month | 46 | 18 | 39% | $-1822.07 | -39.61% | $-1999.85 | 25 | $8978.24 |

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
