# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5390 · Last run: 2026-07-26T14:46:01.299Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 205 | 107 | 52% | $1075.79 | 5.25% | $-252.78 | 25 | $11009.62 |
| momentum | 118 | 87 | 74% | $588.72 | 4.99% | $100.48 | 25 | $10290.16 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10287.64 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10081.27 |
| copy_month | 138 | 65 | 47% | $-195.61 | -1.42% | $-1004.7 | 23 | $9685.83 |
| strong_dip | 48 | 26 | 54% | $-451.83 | -9.41% | $-544.14 | 25 | $9650.24 |
| mid_momentum | 102 | 58 | 57% | $56.75 | 0.56% | $-156.73 | 25 | $9533.06 |
| copy_pro | 176 | 85 | 48% | $-922.98 | -3.34% | $-1772.98 | 25 | $9308.87 |
| mean_revert | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $8981.75 |
| favorite | 111 | 71 | 64% | $-1306.01 | -11.77% | $-1369.94 | 25 | $8796.78 |
| late_favorite | 374 | 291 | 78% | $-1388.81 | -3.71% | $-1429.66 | 25 | $8599.18 |
| whale_fade | 205 | 97 | 47% | $-1003.82 | -4.9% | $-1338.6 | 25 | $8505.99 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7335.44 |

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
