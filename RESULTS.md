# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 343 · Last run: 2026-07-22T04:50:26.990Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 65 | 49 | 75% | $262.17 | 4.03% | $5.03 | 25 | $10171.59 |
| mid_momentum | 35 | 22 | 63% | $321.23 | 9.18% | $183.13 | 25 | $10124.83 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10068.91 |
| copy_pro | 33 | 14 | 42% | $-327.07 | -5.89% | $-1036.16 | 8 | $9943.51 |
| copy_top | 132 | 67 | 51% | $-41.55 | -0.31% | $-1370.12 | 17 | $9917.56 |
| strong_dip | 4 | 1 | 25% | $-115.16 | -28.79% | $-203.84 | 13 | $9895.45 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9677.19 |
| whale_fade | 132 | 65 | 49% | $-287.35 | -2.18% | $-622.13 | 17 | $9587.48 |
| favorite | 54 | 34 | 63% | $-675.86 | -12.52% | $-737.41 | 25 | $9327.31 |
| late_favorite | 116 | 89 | 77% | $-830.75 | -7.16% | $-871.6 | 19 | $9251.39 |
| mean_revert | 68 | 15 | 22% | $-1061.64 | -15.61% | $-2370.09 | 25 | $8996.84 |
| copy_month | 34 | 13 | 38% | $-1408.62 | -41.43% | $-1586.4 | 7 | $8600.74 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7250.19 |

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
