# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31 · Last run: 2026-07-19T06:40:40.308Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 41 | 23 | 56% | $1344.81 | 32.8% | 14 | $11264.02 |
| random_control | 13 | 7 | 54% | $445.34 | 34.26% | 25 | $10631.7 |
| momentum | 18 | 14 | 78% | $-135.43 | -7.52% | 25 | $10035.87 |
| fade_longshot | 10 | 10 | 100% | $42.68 | 4.27% | 25 | $10016.94 |
| favorite | 12 | 8 | 67% | $-95.91 | -7.99% | 25 | $9654.42 |
| whale_fade | 41 | 18 | 44% | $-547.79 | -13.36% | 14 | $9619.12 |
| late_favorite | 25 | 17 | 68% | $-428.31 | -17.13% | 24 | $9469.34 |
| longshot | 10 | 0 | 0% | $-1000 | -100% | 25 | $8987.69 |
| mean_revert | 18 | 3 | 17% | $-1320.75 | -73.37% | 25 | $8680.09 |

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
