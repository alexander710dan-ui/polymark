# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1914 · Last run: 2026-07-23T13:44:30.854Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 78 | 58 | 74% | $169.03 | 2.17% | $-88.11 | 25 | $10823.7 |
| random_control | 40 | 21 | 53% | $-244.16 | -6.1% | $-858.45 | 25 | $10430.97 |
| copy_top | 148 | 75 | 51% | $296.67 | 2% | $-1031.9 | 25 | $10383.66 |
| mean_revert | 82 | 19 | 23% | $410.45 | 5.01% | $-1617.21 | 25 | $10279.11 |
| whale_fade | 148 | 73 | 49% | $-268.06 | -1.81% | $-602.84 | 25 | $10166.97 |
| mid_momentum | 63 | 37 | 59% | $90.3 | 1.43% | $-47.8 | 25 | $9942.47 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9934.65 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9919.69 |
| strong_dip | 29 | 15 | 52% | $-423.07 | -14.59% | $-515.38 | 25 | $9459.88 |
| favorite | 70 | 45 | 64% | $-686.27 | -9.8% | $-750.2 | 25 | $9108.99 |
| late_favorite | 184 | 145 | 79% | $-677.47 | -3.68% | $-718.32 | 25 | $9075.3 |
| copy_month | 66 | 28 | 42% | $-1463.61 | -22.18% | $-2030.28 | 23 | $8701.12 |
| copy_pro | 92 | 39 | 42% | $-1977.94 | -13.1% | $-2827.94 | 23 | $8672.6 |

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
