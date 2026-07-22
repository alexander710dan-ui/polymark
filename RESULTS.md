# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1188 · Last run: 2026-07-22T22:34:30.697Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 75 | 18 | 24% | $807.42 | 10.77% | $-1220.24 | 25 | $10667.63 |
| momentum | 71 | 54 | 76% | $364.97 | 5.14% | $107.83 | 25 | $10441.86 |
| copy_top | 138 | 70 | 51% | $372.97 | 2.7% | $-955.6 | 25 | $10429.65 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10056.25 |
| fade_longshot | 48 | 46 | 96% | $7.12 | 0.15% | $-2.77 | 25 | $9964.66 |
| mid_momentum | 52 | 32 | 62% | $266.52 | 5.13% | $128.42 | 25 | $9894.21 |
| whale_fade | 138 | 68 | 49% | $-384.06 | -2.78% | $-718.84 | 25 | $9861.67 |
| strong_dip | 22 | 12 | 55% | $-169.7 | -7.71% | $-262.01 | 22 | $9755.35 |
| copy_pro | 63 | 26 | 41% | $-934 | -9.2% | $-1784 | 25 | $9728.64 |
| longshot | 48 | 2 | 4% | $-1391.55 | -28.99% | $-3291.55 | 25 | $9345.18 |
| favorite | 64 | 41 | 64% | $-652.35 | -10.19% | $-716.28 | 25 | $9290.15 |
| copy_month | 48 | 19 | 40% | $-1355.4 | -28.24% | $-1922.07 | 25 | $9027.32 |
| late_favorite | 160 | 124 | 78% | $-899.89 | -5.62% | $-940.74 | 25 | $9023.92 |

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
