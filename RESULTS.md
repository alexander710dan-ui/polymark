# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 240 · Last run: 2026-07-22T02:41:21.764Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 64 | 48 | 75% | $189.76 | 2.97% | $-67.38 | 25 | $10137.43 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10069.18 |
| copy_top | 124 | 65 | 52% | $353.37 | 2.85% | $-975.2 | 25 | $10009.27 |
| mid_momentum | 30 | 18 | 60% | $127.36 | 4.25% | $-10.74 | 25 | $9958.16 |
| copy_pro | 20 | 9 | 45% | $386.05 | 11.03% | $-323.04 | 20 | $9937.77 |
| strong_dip | 4 | 1 | 25% | $-115.16 | -28.79% | $-203.84 | 10 | $9882.82 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9683.56 |
| whale_fade | 124 | 59 | 48% | $-635.57 | -5.13% | $-970.35 | 25 | $9516.22 |
| favorite | 54 | 34 | 63% | $-675.86 | -12.52% | $-737.41 | 25 | $9282.57 |
| late_favorite | 115 | 89 | 77% | $-730.75 | -6.35% | $-771.6 | 16 | $9142.04 |
| mean_revert | 67 | 15 | 22% | $-961.64 | -14.35% | $-2270.09 | 25 | $9077.82 |
| copy_month | 21 | 8 | 38% | $-918.81 | -43.75% | $-1096.59 | 20 | $8719.23 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7248.81 |

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
