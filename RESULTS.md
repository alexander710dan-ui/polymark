# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4570 · Last run: 2026-07-25T21:39:30.945Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 191 | 99 | 52% | $1075.6 | 5.63% | $-252.97 | 25 | $11119.8 |
| momentum | 109 | 80 | 73% | $746.72 | 6.85% | $258.48 | 25 | $10688.24 |
| random_control | 51 | 27 | 53% | $-241.34 | -4.73% | $-855.63 | 25 | $10218.59 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10067.59 |
| copy_month | 122 | 57 | 47% | $-57.1 | -0.47% | $-866.19 | 25 | $9884.75 |
| copy_pro | 163 | 78 | 48% | $-785.03 | -3.05% | $-1635.03 | 25 | $9688.1 |
| strong_dip | 46 | 25 | 54% | $-517.48 | -11.25% | $-609.79 | 25 | $9615.33 |
| mean_revert | 115 | 29 | 25% | $-20.42 | -0.18% | $-2048.08 | 25 | $9450.36 |
| mid_momentum | 99 | 56 | 57% | $72.89 | 0.74% | $-140.59 | 25 | $9371.26 |
| favorite | 97 | 63 | 65% | $-962.31 | -9.92% | $-1026.24 | 25 | $9184.77 |
| late_favorite | 338 | 264 | 78% | $-1233.66 | -3.65% | $-1274.51 | 25 | $8842.76 |
| whale_fade | 191 | 91 | 48% | $-960.52 | -5.03% | $-1295.3 | 25 | $8619.46 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7673 |

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
