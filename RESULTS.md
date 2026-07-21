# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 56 · Last run: 2026-07-21T00:12:18.594Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 88 | 50 | 57% | $1265.76 | 14.38% | 25 | $11286.9 |
| momentum | 49 | 38 | 78% | $261.12 | 5.33% | 25 | $10301.06 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10034.69 |
| favorite | 37 | 24 | 65% | $-416.34 | -11.25% | 25 | $9564.38 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9461.68 |
| late_favorite | 74 | 55 | 74% | $-745.24 | -10.07% | 13 | $9289.34 |
| mean_revert | 49 | 11 | 22% | $-653.16 | -13.33% | 25 | $9201.8 |
| whale_fade | 88 | 38 | 43% | $-1023.47 | -11.63% | 25 | $8912.78 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7571.95 |

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
