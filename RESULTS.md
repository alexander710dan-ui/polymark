# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3230 · Last run: 2026-07-24T17:29:35.930Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 169 | 88 | 52% | $548.09 | 3.24% | $-780.48 | 25 | $10860.35 |
| mean_revert | 103 | 27 | 26% | $497.76 | 4.83% | $-1529.9 | 25 | $10521.06 |
| momentum | 94 | 68 | 72% | $-41.13 | -0.44% | $-298.27 | 25 | $10401.57 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10059.49 |
| fade_longshot | 52 | 50 | 96% | $37.5 | 0.72% | $27.61 | 25 | $10014.76 |
| copy_month | 93 | 44 | 47% | $-575.09 | -6.18% | $-1141.76 | 23 | $9567.82 |
| copy_pro | 123 | 57 | 46% | $-1384.57 | -7.05% | $-2234.57 | 22 | $9489.27 |
| strong_dip | 37 | 20 | 54% | $-304.23 | -8.22% | $-396.54 | 25 | $9356.37 |
| mid_momentum | 85 | 46 | 54% | $-577.38 | -6.79% | $-740.54 | 25 | $9288.38 |
| whale_fade | 169 | 81 | 48% | $-771.86 | -4.57% | $-1106.64 | 25 | $9184.52 |
| favorite | 81 | 52 | 64% | $-896.49 | -11.07% | $-960.42 | 25 | $9128.23 |
| longshot | 52 | 2 | 4% | $-1791.55 | -34.45% | $-3691.55 | 25 | $8577.7 |
| late_favorite | 262 | 200 | 76% | $-1654.33 | -6.31% | $-1695.18 | 24 | $8125 |

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
