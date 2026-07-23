# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1338 · Last run: 2026-07-23T01:42:25.103Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 77 | 18 | 23% | $607.42 | 7.89% | $-1420.24 | 25 | $10756.55 |
| momentum | 73 | 55 | 75% | $316.49 | 4.34% | $59.35 | 25 | $10413.99 |
| copy_top | 140 | 71 | 51% | $351.54 | 2.51% | $-977.03 | 25 | $10249.69 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10112.52 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9963.8 |
| whale_fade | 140 | 69 | 49% | $-345.96 | -2.47% | $-680.74 | 25 | $9828.45 |
| strong_dip | 23 | 13 | 57% | $-110.97 | -4.82% | $-203.28 | 23 | $9807.49 |
| mid_momentum | 54 | 32 | 59% | $66.52 | 1.23% | $-71.58 | 25 | $9686.27 |
| copy_pro | 69 | 29 | 42% | $-786.59 | -6.93% | $-1636.59 | 25 | $9439.54 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9306.08 |
| favorite | 66 | 43 | 65% | $-539.54 | -8.17% | $-603.47 | 25 | $9241.95 |
| late_favorite | 168 | 130 | 77% | $-982.68 | -5.85% | $-1023.53 | 24 | $9158.13 |
| copy_month | 52 | 22 | 42% | $-1151.39 | -22.14% | $-1718.06 | 25 | $8585.55 |

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
