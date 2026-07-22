# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 704 · Last run: 2026-07-22T12:22:16.133Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 66 | 50 | 76% | $268.55 | 4.07% | $11.41 | 25 | $10318.65 |
| strong_dip | 5 | 1 | 20% | $-215.16 | -43.03% | $-303.84 | 25 | $10165.18 |
| copy_pro | 36 | 15 | 42% | $-330.64 | -5.51% | $-1039.73 | 25 | $10098.92 |
| fade_longshot | 43 | 42 | 98% | $85.31 | 1.98% | $75.42 | 25 | $10016.37 |
| mid_momentum | 38 | 23 | 61% | $193.35 | 5.09% | $55.25 | 25 | $9889.56 |
| copy_top | 134 | 68 | 51% | $-69.14 | -0.52% | $-1397.71 | 24 | $9883.27 |
| whale_fade | 134 | 66 | 49% | $-377.46 | -2.82% | $-712.24 | 24 | $9844.95 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9840.86 |
| favorite | 55 | 35 | 64% | $-630.93 | -11.47% | $-692.48 | 25 | $9317.09 |
| late_favorite | 124 | 95 | 77% | $-886.37 | -7.15% | $-927.22 | 25 | $9135.38 |
| mean_revert | 68 | 15 | 22% | $-1061.64 | -15.61% | $-2370.09 | 25 | $8759.9 |
| copy_month | 36 | 14 | 39% | $-1430.05 | -39.72% | $-1607.83 | 19 | $8648.94 |
| longshot | 43 | 1 | 2% | $-2891.55 | -67.25% | $-4200 | 25 | $8031.32 |

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
