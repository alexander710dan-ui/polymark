# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1067 · Last run: 2026-07-22T19:57:56.584Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 68 | 52 | 76% | $334.31 | 4.92% | $77.17 | 25 | $10435.19 |
| fade_longshot | 47 | 46 | 98% | $107.12 | 2.28% | $97.23 | 25 | $10065.58 |
| mid_momentum | 47 | 30 | 64% | $395.5 | 8.41% | $257.4 | 25 | $10064 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10020.81 |
| strong_dip | 17 | 10 | 59% | $-19.99 | -1.18% | $-112.3 | 25 | $9967.66 |
| copy_top | 136 | 69 | 51% | $-93.7 | -0.69% | $-1422.27 | 25 | $9967.45 |
| whale_fade | 136 | 67 | 49% | $-440.47 | -3.24% | $-775.25 | 25 | $9706.11 |
| favorite | 62 | 41 | 66% | $-452.35 | -7.3% | $-516.28 | 25 | $9440.17 |
| copy_pro | 56 | 24 | 43% | $-1084 | -12.18% | $-1793.09 | 25 | $9275.91 |
| late_favorite | 145 | 112 | 77% | $-930.09 | -6.41% | $-970.94 | 25 | $9046.02 |
| mean_revert | 73 | 16 | 22% | $-1414.36 | -19.37% | $-2722.81 | 25 | $8688.72 |
| copy_month | 43 | 17 | 40% | $-1722.07 | -40.05% | $-1899.85 | 25 | $8507.18 |
| longshot | 47 | 1 | 2% | $-3291.55 | -70.03% | $-4600 | 25 | $7386.57 |

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
