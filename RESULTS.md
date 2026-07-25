# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4218 · Last run: 2026-07-25T14:18:49.113Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 188 | 99 | 53% | $1375.6 | 7.32% | $47.03 | 25 | $11350.03 |
| momentum | 107 | 79 | 74% | $845.51 | 7.9% | $357.27 | 25 | $10836.1 |
| random_control | 49 | 26 | 53% | $-327.05 | -6.67% | $-941.34 | 25 | $10400.67 |
| copy_month | 117 | 56 | 48% | $304.01 | 2.6% | $-505.08 | 25 | $10196.9 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10055.34 |
| copy_pro | 155 | 73 | 47% | $-856.38 | -3.48% | $-1706.38 | 25 | $9684.32 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9511.94 |
| mean_revert | 114 | 29 | 25% | $79.58 | 0.7% | $-1948.08 | 25 | $9372.48 |
| mid_momentum | 97 | 55 | 57% | $102.53 | 1.06% | $-110.95 | 25 | $9324.75 |
| favorite | 89 | 59 | 66% | $-764 | -8.58% | $-827.93 | 25 | $9296.91 |
| whale_fade | 188 | 88 | 47% | $-1235.16 | -6.57% | $-1569.94 | 25 | $8559.65 |
| late_favorite | 311 | 242 | 78% | $-1294.26 | -4.16% | $-1335.11 | 25 | $8510.03 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7931.64 |

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
