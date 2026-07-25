# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3818 · Last run: 2026-07-25T05:55:35.299Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 181 | 95 | 52% | $1396.6 | 7.72% | $68.03 | 22 | $11626.35 |
| momentum | 104 | 76 | 73% | $812.78 | 7.82% | $324.54 | 25 | $11140.82 |
| copy_month | 110 | 54 | 49% | $549.73 | 5% | $-259.36 | 20 | $10544.64 |
| random_control | 47 | 24 | 51% | $-354.35 | -7.54% | $-968.64 | 25 | $10197.94 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10012.42 |
| mean_revert | 112 | 29 | 26% | $279.58 | 2.5% | $-1748.08 | 25 | $9712.8 |
| copy_pro | 148 | 70 | 47% | $-696.63 | -2.95% | $-1546.63 | 23 | $9696.08 |
| mid_momentum | 97 | 55 | 57% | $102.53 | 1.06% | $-110.95 | 25 | $9462.04 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9306.55 |
| favorite | 85 | 55 | 65% | $-859.93 | -10.12% | $-923.86 | 25 | $9189.18 |
| late_favorite | 299 | 231 | 77% | $-1481.94 | -4.96% | $-1522.79 | 18 | $8603.1 |
| whale_fade | 181 | 86 | 48% | $-1039.17 | -5.74% | $-1373.95 | 22 | $8593.43 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8579.14 |

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
