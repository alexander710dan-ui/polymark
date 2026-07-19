# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30 · Last run: 2026-07-19T03:59:44.769Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 39 | 22 | 56% | $1393.29 | 35.73% | 14 | $11259.84 |
| random_control | 13 | 7 | 54% | $445.34 | 34.26% | 23 | $10628.08 |
| momentum | 16 | 13 | 81% | $-86.95 | -5.43% | 25 | $10044.11 |
| fade_longshot | 10 | 10 | 100% | $42.68 | 4.27% | 25 | $10011.84 |
| favorite | 11 | 8 | 73% | $4.09 | 0.37% | 25 | $9748.68 |
| whale_fade | 39 | 17 | 44% | $-551.87 | -14.15% | 14 | $9685.25 |
| late_favorite | 25 | 17 | 68% | $-428.31 | -17.13% | 19 | $9469.88 |
| longshot | 10 | 0 | 0% | $-1000 | -100% | 25 | $9125.42 |
| mean_revert | 17 | 3 | 18% | $-1220.75 | -71.81% | 25 | $8729.57 |

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
