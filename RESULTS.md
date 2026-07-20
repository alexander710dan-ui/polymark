# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 51 · Last run: 2026-07-20T16:59:41.630Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 81 | 47 | 58% | $1557.95 | 19.23% | 17 | $11473.3 |
| momentum | 40 | 31 | 78% | $154.82 | 3.87% | 25 | $10086.03 |
| fade_longshot | 35 | 34 | 97% | $49.54 | 1.42% | 25 | $10019.14 |
| mean_revert | 37 | 8 | 22% | $-246.01 | -6.65% | 25 | $9581 |
| favorite | 30 | 18 | 60% | $-534.22 | -17.81% | 25 | $9565.87 |
| random_control | 37 | 20 | 54% | $-473.26 | -12.79% | 25 | $9508.54 |
| late_favorite | 62 | 47 | 76% | $-515.11 | -8.31% | 19 | $9497.7 |
| whale_fade | 81 | 34 | 42% | $-1196.69 | -14.77% | 17 | $8839.55 |
| longshot | 35 | 1 | 3% | $-2091.55 | -59.76% | 25 | $7926.24 |

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
