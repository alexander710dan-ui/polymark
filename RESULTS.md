# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2352 · Last run: 2026-07-23T22:52:55.326Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 157 | 79 | 50% | $-53.31 | -0.34% | $-1381.88 | 25 | $10768.27 |
| momentum | 87 | 64 | 74% | $125.17 | 1.44% | $-131.97 | 25 | $10520.41 |
| mean_revert | 93 | 22 | 24% | $97.95 | 1.05% | $-1929.71 | 25 | $10248.89 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10109.22 |
| whale_fade | 157 | 78 | 50% | $-133.6 | -0.85% | $-468.38 | 25 | $9996.99 |
| fade_longshot | 50 | 48 | 96% | $24.52 | 0.49% | $14.63 | 25 | $9926.5 |
| longshot | 50 | 2 | 4% | $-1591.55 | -31.83% | $-3491.55 | 25 | $9908.76 |
| mid_momentum | 74 | 44 | 59% | $174.77 | 2.36% | $11.61 | 25 | $9735.02 |
| copy_month | 80 | 34 | 43% | $-1348.55 | -16.86% | $-1915.22 | 20 | $9470.93 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9428.63 |
| copy_pro | 109 | 47 | 43% | $-2327.97 | -13.12% | $-3177.97 | 19 | $9017.21 |
| favorite | 75 | 48 | 64% | $-827.49 | -11.03% | $-891.42 | 25 | $8961.98 |
| late_favorite | 219 | 168 | 77% | $-1326.48 | -6.06% | $-1367.33 | 25 | $8557.07 |

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
