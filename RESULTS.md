# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4602 · Last run: 2026-07-25T22:19:34.186Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 191 | 99 | 52% | $1075.6 | 5.63% | $-252.97 | 25 | $11091.61 |
| momentum | 110 | 81 | 74% | $747.83 | 6.8% | $259.59 | 25 | $10675.09 |
| random_control | 51 | 27 | 53% | $-241.34 | -4.73% | $-855.63 | 25 | $10275.38 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10056.3 |
| copy_month | 122 | 57 | 47% | $-57.1 | -0.47% | $-866.19 | 25 | $9853.25 |
| copy_pro | 163 | 78 | 48% | $-785.03 | -3.05% | $-1635.03 | 25 | $9709.45 |
| strong_dip | 46 | 25 | 54% | $-517.48 | -11.25% | $-609.79 | 25 | $9618.92 |
| mean_revert | 115 | 29 | 25% | $-20.42 | -0.18% | $-2048.08 | 25 | $9502.01 |
| mid_momentum | 99 | 56 | 57% | $72.89 | 0.74% | $-140.59 | 25 | $9356.51 |
| favorite | 99 | 64 | 65% | $-1046.03 | -10.57% | $-1109.96 | 25 | $9088.21 |
| late_favorite | 341 | 267 | 78% | $-1118.83 | -3.28% | $-1159.68 | 25 | $8812.48 |
| whale_fade | 191 | 91 | 48% | $-960.52 | -5.03% | $-1295.3 | 25 | $8648.84 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7792.05 |

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
