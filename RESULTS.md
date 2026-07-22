# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 803 · Last run: 2026-07-22T14:26:30.320Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 66 | 50 | 76% | $268.55 | 4.07% | $11.41 | 25 | $10342.95 |
| strong_dip | 9 | 5 | 56% | $98.34 | 10.93% | $6.03 | 25 | $10214.16 |
| fade_longshot | 44 | 43 | 98% | $88.4 | 2.01% | $78.51 | 25 | $10044.04 |
| copy_top | 134 | 68 | 51% | $-69.14 | -0.52% | $-1397.71 | 25 | $9961.86 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9926.1 |
| mid_momentum | 38 | 23 | 61% | $193.35 | 5.09% | $55.25 | 25 | $9823.8 |
| whale_fade | 134 | 66 | 49% | $-377.46 | -2.82% | $-712.24 | 25 | $9795.54 |
| copy_pro | 45 | 18 | 40% | $-967.79 | -13.35% | $-1676.88 | 25 | $9703.04 |
| favorite | 57 | 37 | 65% | $-547.54 | -9.61% | $-609.09 | 25 | $9355.01 |
| late_favorite | 129 | 100 | 78% | $-760.08 | -5.89% | $-800.93 | 25 | $8952.4 |
| mean_revert | 68 | 15 | 22% | $-1061.64 | -15.61% | $-2370.09 | 25 | $8833.87 |
| copy_month | 36 | 14 | 39% | $-1430.05 | -39.72% | $-1607.83 | 25 | $8679.57 |
| longshot | 44 | 1 | 2% | $-2991.55 | -67.99% | $-4300 | 25 | $7632.22 |

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
