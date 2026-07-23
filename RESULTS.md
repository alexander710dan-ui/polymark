# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2030 · Last run: 2026-07-23T16:09:45.614Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 80 | 59 | 74% | $232.19 | 2.9% | $-24.95 | 25 | $10785.72 |
| copy_top | 149 | 75 | 50% | $196.67 | 1.32% | $-1131.9 | 25 | $10460.34 |
| random_control | 41 | 22 | 54% | $-126.77 | -3.09% | $-741.06 | 25 | $10346.89 |
| whale_fade | 149 | 74 | 50% | $-159.73 | -1.07% | $-494.51 | 25 | $10275.13 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $10273.79 |
| mean_revert | 85 | 20 | 24% | $314.53 | 3.7% | $-1713.13 | 25 | $10089.7 |
| mid_momentum | 65 | 38 | 58% | $153.46 | 2.36% | $-9.7 | 25 | $10046.27 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9898.1 |
| strong_dip | 31 | 16 | 52% | $-456.4 | -14.72% | $-548.71 | 25 | $9401.09 |
| late_favorite | 191 | 148 | 77% | $-1004.82 | -5.26% | $-1045.67 | 25 | $9245.91 |
| favorite | 71 | 45 | 63% | $-786.27 | -11.07% | $-850.2 | 25 | $9106.52 |
| copy_month | 67 | 28 | 42% | $-1563.61 | -23.34% | $-2130.28 | 25 | $9036.01 |
| copy_pro | 94 | 40 | 43% | $-2114.01 | -13.73% | $-2964.01 | 25 | $8900.56 |

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
