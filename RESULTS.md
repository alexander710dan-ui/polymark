# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3088 · Last run: 2026-07-24T14:26:41.620Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 168 | 87 | 52% | $519.88 | 3.09% | $-808.69 | 25 | $10628.84 |
| momentum | 93 | 68 | 73% | $58.87 | 0.63% | $-198.27 | 25 | $10411.71 |
| mean_revert | 100 | 25 | 25% | $336.01 | 3.36% | $-1691.65 | 25 | $10297.06 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10059.32 |
| fade_longshot | 52 | 50 | 96% | $37.5 | 0.72% | $27.61 | 25 | $9985.57 |
| whale_fade | 168 | 81 | 48% | $-671.86 | -4% | $-1006.64 | 25 | $9488.35 |
| copy_pro | 120 | 56 | 47% | $-1226.88 | -6.36% | $-2076.88 | 19 | $9461.45 |
| copy_month | 91 | 42 | 46% | $-753.3 | -8.28% | $-1319.97 | 21 | $9455.47 |
| strong_dip | 36 | 20 | 56% | $-302.27 | -8.4% | $-394.58 | 25 | $9417.29 |
| mid_momentum | 82 | 45 | 55% | $-449.79 | -5.49% | $-612.95 | 25 | $9258.41 |
| longshot | 52 | 2 | 4% | $-1791.55 | -34.45% | $-3691.55 | 25 | $9050.36 |
| favorite | 79 | 51 | 65% | $-845.74 | -10.71% | $-909.67 | 25 | $9013.65 |
| late_favorite | 251 | 192 | 76% | $-1520.5 | -6.06% | $-1561.35 | 25 | $8019.86 |

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
