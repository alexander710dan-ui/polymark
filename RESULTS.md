# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2444 · Last run: 2026-07-24T00:48:09.259Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 160 | 82 | 51% | $406.61 | 2.54% | $-921.96 | 22 | $10785.21 |
| momentum | 90 | 65 | 72% | $-71.74 | -0.8% | $-328.88 | 25 | $10449.74 |
| mean_revert | 96 | 24 | 25% | $319.34 | 3.33% | $-1708.32 | 25 | $10249.28 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10129.3 |
| fade_longshot | 51 | 49 | 96% | $27.61 | 0.54% | $17.72 | 25 | $9934.34 |
| whale_fade | 160 | 78 | 49% | $-433.6 | -2.71% | $-768.38 | 22 | $9881.37 |
| longshot | 51 | 2 | 4% | $-1691.55 | -33.17% | $-3591.55 | 25 | $9780.1 |
| mid_momentum | 76 | 44 | 58% | $-25.23 | -0.33% | $-188.39 | 25 | $9654.99 |
| copy_pro | 111 | 49 | 44% | $-1763.68 | -9.72% | $-2613.68 | 17 | $9569.13 |
| strong_dip | 33 | 17 | 52% | $-464.09 | -14.06% | $-556.4 | 25 | $9418.16 |
| copy_month | 83 | 36 | 43% | $-1013.63 | -12.21% | $-1580.3 | 17 | $9408.67 |
| favorite | 76 | 48 | 63% | $-927.49 | -12.2% | $-991.42 | 25 | $8937.22 |
| late_favorite | 226 | 174 | 77% | $-1318.77 | -5.84% | $-1359.62 | 25 | $8605.45 |

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
