# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4636 · Last run: 2026-07-25T23:02:16.177Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 194 | 101 | 52% | $988.75 | 5.1% | $-339.82 | 23 | $11083.38 |
| momentum | 112 | 83 | 74% | $754.04 | 6.73% | $265.8 | 25 | $10676.36 |
| random_control | 53 | 29 | 55% | $-207.72 | -3.92% | $-822.01 | 25 | $10289.29 |
| fade_longshot | 58 | 56 | 97% | $77.34 | 1.33% | $67.45 | 25 | $10063.86 |
| copy_month | 125 | 58 | 46% | $-255.06 | -2.04% | $-1064.15 | 23 | $9824.48 |
| copy_pro | 164 | 78 | 48% | $-872.67 | -3.37% | $-1722.67 | 25 | $9785.89 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9598.85 |
| mean_revert | 117 | 29 | 25% | $-124.26 | -1.06% | $-2151.92 | 25 | $9409.58 |
| mid_momentum | 100 | 57 | 57% | $74.93 | 0.75% | $-138.55 | 25 | $9402.8 |
| favorite | 101 | 66 | 65% | $-1006.29 | -9.96% | $-1070.22 | 25 | $9030.05 |
| late_favorite | 348 | 272 | 78% | $-1159.08 | -3.33% | $-1199.93 | 22 | $8668.72 |
| whale_fade | 194 | 92 | 47% | $-964.36 | -4.97% | $-1299.14 | 23 | $8647.26 |
| longshot | 58 | 2 | 3% | $-2391.55 | -41.23% | $-4291.55 | 25 | $7699.33 |

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
