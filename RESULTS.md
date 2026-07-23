# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2152 · Last run: 2026-07-23T18:42:36.187Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 82 | 60 | 73% | $152.67 | 1.86% | $-104.47 | 25 | $10786.84 |
| whale_fade | 151 | 75 | 50% | $-163.65 | -1.08% | $-498.43 | 25 | $10390.9 |
| copy_top | 151 | 76 | 50% | $110.31 | 0.73% | $-1218.26 | 25 | $10310.42 |
| random_control | 41 | 22 | 54% | $-126.77 | -3.09% | $-741.06 | 25 | $10265.62 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $10151.81 |
| mid_momentum | 67 | 40 | 60% | $290.27 | 4.33% | $127.11 | 25 | $10120.45 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9906.48 |
| mean_revert | 87 | 21 | 24% | $243.4 | 2.8% | $-1784.26 | 25 | $9885.39 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9346.97 |
| copy_month | 70 | 30 | 43% | $-1455.85 | -20.8% | $-2022.52 | 25 | $9261.1 |
| favorite | 72 | 46 | 64% | $-769.72 | -10.69% | $-833.65 | 25 | $9096.33 |
| late_favorite | 200 | 157 | 79% | $-781.97 | -3.91% | $-822.82 | 25 | $8889.06 |
| copy_pro | 98 | 44 | 45% | $-1397.35 | -8.68% | $-2247.35 | 25 | $8807.72 |

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
