# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3859 · Last run: 2026-07-25T06:47:02.170Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 184 | 97 | 53% | $1321.32 | 7.18% | $-7.25 | 22 | $11627.24 |
| momentum | 107 | 79 | 74% | $845.51 | 7.9% | $357.27 | 25 | $11144.16 |
| copy_month | 112 | 54 | 48% | $349.73 | 3.12% | $-459.36 | 21 | $10549.66 |
| random_control | 49 | 26 | 53% | $-327.05 | -6.67% | $-941.34 | 25 | $10195.01 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10011.73 |
| copy_pro | 148 | 70 | 47% | $-696.63 | -2.95% | $-1546.63 | 24 | $9716.9 |
| mean_revert | 114 | 29 | 25% | $79.58 | 0.7% | $-1948.08 | 25 | $9600.64 |
| mid_momentum | 97 | 55 | 57% | $102.53 | 1.06% | $-110.95 | 25 | $9475.38 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9283.58 |
| favorite | 88 | 58 | 66% | $-825.29 | -9.38% | $-889.22 | 25 | $9201.88 |
| late_favorite | 300 | 232 | 77% | $-1468.3 | -4.89% | $-1509.15 | 20 | $8601.99 |
| whale_fade | 184 | 87 | 47% | $-1229.28 | -6.68% | $-1564.06 | 22 | $8562.3 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $8514.75 |

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
