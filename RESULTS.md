# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 55 · Last run: 2026-07-20T23:06:07.398Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 88 | 50 | 57% | $1265.76 | 14.38% | 25 | $11339.35 |
| momentum | 48 | 37 | 77% | $172.44 | 3.59% | 25 | $10260.96 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10034.35 |
| favorite | 37 | 24 | 65% | $-416.34 | -11.25% | 25 | $9521.35 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9501.95 |
| mean_revert | 48 | 11 | 23% | $-553.16 | -11.52% | 25 | $9307.3 |
| late_favorite | 73 | 54 | 74% | $-762.89 | -10.45% | 14 | $9267.35 |
| whale_fade | 88 | 38 | 43% | $-1023.47 | -11.63% | 25 | $8915.6 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7594.18 |

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
