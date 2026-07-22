# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 222 · Last run: 2026-07-22T02:18:57.872Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 122 | 65 | 53% | $553.37 | 4.54% | $-775.2 | 25 | $10426.58 |
| momentum | 63 | 47 | 75% | $97.45 | 1.55% | $-159.69 | 25 | $10122.6 |
| copy_pro | 18 | 9 | 50% | $736.05 | 23.37% | $26.96 | 22 | $10097.4 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10066.17 |
| strong_dip | 4 | 1 | 25% | $-115.16 | -28.79% | $-203.84 | 10 | $9937.38 |
| mid_momentum | 30 | 18 | 60% | $127.36 | 4.25% | $-10.74 | 25 | $9881.67 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9689.62 |
| whale_fade | 122 | 57 | 47% | $-862.84 | -7.07% | $-1197.62 | 25 | $9427.73 |
| favorite | 53 | 33 | 62% | $-692.14 | -13.06% | $-753.69 | 25 | $9271.52 |
| late_favorite | 115 | 89 | 77% | $-730.75 | -6.35% | $-771.6 | 16 | $9177.34 |
| mean_revert | 66 | 15 | 23% | $-861.64 | -13.06% | $-2170.09 | 25 | $9138.98 |
| copy_month | 19 | 8 | 42% | $-718.81 | -37.83% | $-896.59 | 22 | $8881.46 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7284.22 |

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
