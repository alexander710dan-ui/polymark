# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1401 · Last run: 2026-07-23T03:01:12.013Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 79 | 19 | 24% | $710.45 | 8.99% | $-1317.21 | 25 | $10480.45 |
| momentum | 75 | 56 | 75% | $261.42 | 3.49% | $4.28 | 25 | $10433.12 |
| copy_top | 145 | 73 | 50% | $161.69 | 1.12% | $-1166.88 | 21 | $10255.35 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10131.44 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9961.48 |
| whale_fade | 145 | 72 | 50% | $-297.01 | -2.05% | $-631.79 | 21 | $9828.91 |
| strong_dip | 23 | 13 | 57% | $-110.97 | -4.82% | $-203.28 | 24 | $9796.82 |
| mid_momentum | 58 | 33 | 57% | $-148.29 | -2.56% | $-286.39 | 25 | $9718.38 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $9334.82 |
| favorite | 68 | 44 | 65% | $-602.55 | -8.86% | $-666.48 | 25 | $9250.97 |
| late_favorite | 175 | 137 | 78% | $-783.81 | -4.48% | $-824.66 | 18 | $9191.05 |
| copy_pro | 81 | 34 | 42% | $-1335.18 | -9.89% | $-2185.18 | 19 | $8772.14 |
| copy_month | 60 | 24 | 40% | $-1639.49 | -27.32% | $-2206.16 | 18 | $8499.11 |

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
