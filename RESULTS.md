# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 856 · Last run: 2026-07-22T15:32:31.338Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 66 | 50 | 76% | $268.55 | 4.07% | $11.41 | 25 | $10313.61 |
| strong_dip | 9 | 5 | 56% | $98.34 | 10.93% | $6.03 | 25 | $10162.05 |
| fade_longshot | 44 | 43 | 98% | $88.4 | 2.01% | $78.51 | 25 | $10051.9 |
| mid_momentum | 40 | 25 | 63% | $306.53 | 7.66% | $168.43 | 25 | $10047.19 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10003.62 |
| copy_top | 135 | 69 | 51% | $6.3 | 0.05% | $-1322.27 | 25 | $9907.1 |
| copy_pro | 47 | 20 | 43% | $-821.31 | -11.02% | $-1530.4 | 25 | $9834.46 |
| whale_fade | 135 | 66 | 49% | $-477.46 | -3.54% | $-812.24 | 25 | $9808.05 |
| favorite | 58 | 38 | 66% | $-483.61 | -8.34% | $-547.54 | 25 | $9433.39 |
| late_favorite | 131 | 101 | 77% | $-839.6 | -6.41% | $-880.45 | 25 | $8871.36 |
| mean_revert | 68 | 15 | 22% | $-1061.64 | -15.61% | $-2370.09 | 25 | $8830.54 |
| copy_month | 37 | 15 | 41% | $-1354.61 | -36.61% | $-1532.39 | 25 | $8722.92 |
| longshot | 44 | 1 | 2% | $-2991.55 | -67.99% | $-4300 | 25 | $7543.13 |

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
