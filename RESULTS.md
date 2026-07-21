# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 96 · Last run: 2026-07-21T23:41:03.024Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 13 | 6 | 46% | $736.39 | 31.34% | $27.3 | 20 | $10716.72 |
| copy_top | 120 | 64 | 53% | $561.06 | 4.68% | $-767.51 | 24 | $10503.24 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10062.15 |
| momentum | 63 | 47 | 75% | $97.45 | 1.55% | $-159.69 | 25 | $10041.23 |
| mid_momentum | 28 | 17 | 61% | $157.87 | 5.64% | $19.77 | 25 | $9993.21 |
| strong_dip | 3 | 1 | 33% | $-111.32 | -37.11% | $-200 | 9 | $9985.16 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9665.38 |
| copy_month | 15 | 6 | 40% | $-615.29 | -41.02% | $-793.07 | 15 | $9367.43 |
| favorite | 52 | 33 | 63% | $-658.81 | -12.67% | $-720.36 | 25 | $9260.92 |
| mean_revert | 66 | 15 | 23% | $-861.64 | -13.06% | $-2170.09 | 25 | $9258.05 |
| whale_fade | 120 | 56 | 47% | $-885.06 | -7.38% | $-1219.84 | 24 | $9144.88 |
| late_favorite | 111 | 85 | 77% | $-814.53 | -7.34% | $-855.38 | 15 | $9052.2 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7346.67 |

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
