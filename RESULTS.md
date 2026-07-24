# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2586 · Last run: 2026-07-24T03:45:44.424Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 92 | 67 | 73% | $42.59 | 0.46% | $-214.55 | 25 | $10622.84 |
| copy_top | 164 | 84 | 51% | $386.13 | 2.35% | $-942.44 | 18 | $10571.42 |
| mean_revert | 97 | 25 | 26% | $636.01 | 6.56% | $-1391.65 | 25 | $10557.96 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10092.5 |
| fade_longshot | 51 | 49 | 96% | $27.61 | 0.54% | $17.72 | 25 | $9956.43 |
| whale_fade | 164 | 80 | 49% | $-535.02 | -3.26% | $-869.8 | 18 | $9812.86 |
| mid_momentum | 78 | 45 | 58% | $-49.79 | -0.64% | $-212.95 | 25 | $9667.48 |
| copy_pro | 117 | 55 | 47% | $-1062.07 | -5.6% | $-1912.07 | 11 | $9666.56 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9481.2 |
| longshot | 51 | 2 | 4% | $-1691.55 | -33.17% | $-3591.55 | 25 | $9448.58 |
| copy_month | 87 | 39 | 45% | $-887.05 | -10.2% | $-1453.72 | 13 | $9422.54 |
| favorite | 77 | 49 | 64% | $-888.6 | -11.54% | $-952.53 | 25 | $9024.36 |
| late_favorite | 234 | 181 | 77% | $-1225.08 | -5.24% | $-1265.93 | 22 | $8418.72 |

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
