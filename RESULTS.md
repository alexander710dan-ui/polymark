# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3288 · Last run: 2026-07-24T18:42:04.874Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 171 | 89 | 52% | $586.19 | 3.43% | $-742.38 | 24 | $11226.37 |
| momentum | 94 | 68 | 72% | $-41.13 | -0.44% | $-298.27 | 25 | $10799.19 |
| mean_revert | 103 | 27 | 26% | $497.76 | 4.83% | $-1529.9 | 25 | $10345.74 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10056.69 |
| copy_month | 95 | 45 | 47% | $-536.99 | -5.65% | $-1103.66 | 22 | $10028.73 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10003.99 |
| mid_momentum | 87 | 48 | 55% | $-364.92 | -4.19% | $-528.08 | 25 | $9514.28 |
| strong_dip | 37 | 20 | 54% | $-304.23 | -8.22% | $-396.54 | 25 | $9450.03 |
| copy_pro | 125 | 58 | 46% | $-1208.38 | -6.06% | $-2058.38 | 21 | $9210.14 |
| whale_fade | 171 | 82 | 48% | $-733.76 | -4.29% | $-1068.54 | 24 | $9210.08 |
| favorite | 81 | 52 | 64% | $-896.49 | -11.07% | $-960.42 | 25 | $9158.33 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8726.51 |
| late_favorite | 264 | 201 | 76% | $-1713.48 | -6.49% | $-1754.33 | 25 | $8076.97 |

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
