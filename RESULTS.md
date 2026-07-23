# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1447 · Last run: 2026-07-23T03:58:38.140Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 81 | 19 | 23% | $510.45 | 6.3% | $-1517.21 | 25 | $10516.21 |
| momentum | 77 | 58 | 75% | $269.03 | 3.49% | $11.89 | 25 | $10410.05 |
| copy_top | 145 | 73 | 50% | $161.69 | 1.12% | $-1166.88 | 22 | $10287.31 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10176.24 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9954.69 |
| whale_fade | 145 | 72 | 50% | $-297.01 | -2.05% | $-631.79 | 22 | $9801.03 |
| strong_dip | 23 | 13 | 57% | $-110.97 | -4.82% | $-203.28 | 24 | $9783.59 |
| mid_momentum | 59 | 34 | 58% | $-81.62 | -1.38% | $-219.72 | 25 | $9662.05 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9387.98 |
| favorite | 69 | 45 | 65% | $-586.27 | -8.5% | $-650.2 | 25 | $9243.49 |
| late_favorite | 175 | 137 | 78% | $-783.81 | -4.48% | $-824.66 | 20 | $9211.46 |
| copy_pro | 85 | 35 | 41% | $-1902.16 | -13.26% | $-2752.16 | 16 | $8799.59 |
| copy_month | 61 | 24 | 39% | $-1739.49 | -28.52% | $-2306.16 | 18 | $8526.61 |

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
