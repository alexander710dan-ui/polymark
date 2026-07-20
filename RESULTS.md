# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 54 · Last run: 2026-07-20T21:52:23.473Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 88 | 50 | 57% | $1265.76 | 14.38% | 21 | $11399.75 |
| momentum | 47 | 36 | 77% | $125.38 | 2.67% | 25 | $10146.95 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10030.86 |
| favorite | 37 | 24 | 65% | $-416.34 | -11.25% | 25 | $9527.3 |
| mean_revert | 47 | 11 | 23% | $-453.16 | -9.64% | 25 | $9515.58 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9467.33 |
| late_favorite | 72 | 54 | 75% | $-662.89 | -9.21% | 12 | $9249.18 |
| whale_fade | 88 | 38 | 43% | $-1023.47 | -11.63% | 21 | $8861.33 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7646.28 |

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
