# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1511 · Last run: 2026-07-23T05:18:45.074Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 81 | 19 | 23% | $510.45 | 6.3% | $-1517.21 | 25 | $10597.55 |
| momentum | 77 | 58 | 75% | $269.03 | 3.49% | $11.89 | 25 | $10370.5 |
| copy_top | 146 | 74 | 51% | $240.26 | 1.65% | $-1088.31 | 22 | $10272.89 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10124.28 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9948.61 |
| mid_momentum | 61 | 36 | 59% | $89.9 | 1.47% | $-48.2 | 25 | $9827.7 |
| strong_dip | 24 | 13 | 54% | $-210.97 | -8.79% | $-303.28 | 24 | $9794.45 |
| whale_fade | 146 | 72 | 49% | $-397.01 | -2.72% | $-731.79 | 22 | $9783.81 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9389.81 |
| favorite | 69 | 45 | 65% | $-586.27 | -8.5% | $-650.2 | 25 | $9244 |
| late_favorite | 178 | 140 | 79% | $-691 | -3.88% | $-731.85 | 17 | $9223.02 |
| copy_pro | 86 | 36 | 42% | $-1823.59 | -12.62% | $-2673.59 | 18 | $8754.55 |
| copy_month | 62 | 25 | 40% | $-1660.92 | -26.79% | $-2227.59 | 18 | $8481.57 |

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
