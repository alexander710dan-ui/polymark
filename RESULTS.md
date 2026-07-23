# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2293 · Last run: 2026-07-23T21:39:09.625Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 156 | 78 | 50% | $-54.52 | -0.35% | $-1383.09 | 24 | $10731.65 |
| momentum | 86 | 63 | 73% | $116.47 | 1.35% | $-140.67 | 25 | $10624.88 |
| mean_revert | 92 | 22 | 24% | $197.95 | 2.15% | $-1829.71 | 25 | $10158.74 |
| random_control | 42 | 22 | 52% | $-226.77 | -5.4% | $-841.06 | 25 | $10150.08 |
| whale_fade | 156 | 78 | 50% | $-33.6 | -0.22% | $-368.38 | 24 | $10032.14 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9939.33 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9921.04 |
| mid_momentum | 72 | 43 | 60% | $231.91 | 3.22% | $68.75 | 25 | $9854.69 |
| copy_month | 79 | 34 | 43% | $-1248.55 | -15.8% | $-1815.22 | 20 | $9538.16 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9412.17 |
| copy_pro | 108 | 46 | 43% | $-2432.05 | -13.78% | $-3282.05 | 20 | $9054.81 |
| favorite | 75 | 48 | 64% | $-827.49 | -11.03% | $-891.42 | 25 | $9049.52 |
| late_favorite | 214 | 166 | 78% | $-1073.36 | -5.02% | $-1114.21 | 23 | $8524.67 |

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
