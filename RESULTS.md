# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 52 · Last run: 2026-07-20T19:03:44.262Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 86 | 50 | 58% | $1465.76 | 17.04% | 15 | $11393.23 |
| momentum | 43 | 34 | 79% | $268.25 | 6.24% | 25 | $10188.72 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10033.49 |
| favorite | 33 | 21 | 64% | $-403.34 | -12.22% | 25 | $9603.86 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9450.24 |
| late_favorite | 66 | 51 | 77% | $-403.15 | -6.11% | 18 | $9386.68 |
| mean_revert | 41 | 8 | 20% | $-646.01 | -15.76% | 25 | $9330.13 |
| whale_fade | 86 | 36 | 42% | $-1299.93 | -15.12% | 15 | $8894.66 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7620.03 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **late_favorite** — buys 70–93¢ favourites within 2 days of resolution
- **copy_top** — mirrors what the top-10 leaderboard wallets bought in the last 24h (≥$500, ≥70% agreement)
- **whale_fade** — bets against those same whale picks (the control for copy_top)
- **random_control** — coin flips, the baseline every strategy must beat

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
