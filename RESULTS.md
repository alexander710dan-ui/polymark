# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 898 · Last run: 2026-07-22T16:25:20.089Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 67 | 51 | 76% | $270.38 | 4.04% | $13.24 | 25 | $10286.28 |
| strong_dip | 10 | 6 | 60% | $113.41 | 11.34% | $21.1 | 25 | $10114.39 |
| mid_momentum | 41 | 26 | 63% | $351.46 | 8.57% | $213.36 | 25 | $10072.88 |
| fade_longshot | 45 | 44 | 98% | $98.29 | 2.18% | $88.4 | 25 | $10062.69 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10015.38 |
| copy_top | 135 | 69 | 51% | $6.3 | 0.05% | $-1322.27 | 25 | $9935.17 |
| copy_pro | 51 | 23 | 45% | $-699.85 | -8.59% | $-1408.94 | 25 | $9700.23 |
| whale_fade | 135 | 66 | 49% | $-477.46 | -3.54% | $-812.24 | 25 | $9668.45 |
| favorite | 58 | 38 | 66% | $-483.61 | -8.34% | $-547.54 | 25 | $9350.87 |
| late_favorite | 136 | 105 | 77% | $-871.79 | -6.41% | $-912.64 | 25 | $8911.37 |
| mean_revert | 69 | 15 | 22% | $-1161.64 | -16.84% | $-2470.09 | 25 | $8804.99 |
| copy_month | 39 | 16 | 41% | $-1450.44 | -37.19% | $-1628.22 | 25 | $8487.25 |
| longshot | 45 | 1 | 2% | $-3091.55 | -68.7% | $-4400 | 25 | $7418.9 |

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
