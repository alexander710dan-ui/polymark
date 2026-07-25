# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4678 · Last run: 2026-07-25T23:54:42.633Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 196 | 102 | 52% | $958.24 | 4.89% | $-370.33 | 21 | $11077.96 |
| momentum | 114 | 85 | 75% | $776.29 | 6.81% | $288.05 | 25 | $10588.09 |
| random_control | 53 | 29 | 55% | $-207.72 | -3.92% | $-822.01 | 25 | $10388.4 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10071.83 |
| copy_pro | 164 | 78 | 48% | $-872.67 | -3.37% | $-1722.67 | 25 | $9931.19 |
| copy_month | 127 | 59 | 46% | $-285.57 | -2.25% | $-1094.66 | 21 | $9775.41 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9688.23 |
| mid_momentum | 100 | 57 | 57% | $74.93 | 0.75% | $-138.55 | 25 | $9393.48 |
| mean_revert | 119 | 29 | 24% | $-324.26 | -2.72% | $-2351.92 | 25 | $9287.14 |
| favorite | 103 | 68 | 66% | $-930.06 | -9.03% | $-993.99 | 25 | $9040.69 |
| late_favorite | 348 | 272 | 78% | $-1159.08 | -3.33% | $-1199.93 | 24 | $8740.46 |
| whale_fade | 196 | 93 | 47% | $-942.14 | -4.81% | $-1276.92 | 21 | $8564.1 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7595.92 |

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
