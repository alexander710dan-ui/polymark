# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24 · Last run: 2026-07-18T18:30:28.234Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 10 | 8 | 80% | $1746.49 | 174.65% | 21 | $11295.5 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10173.16 |
| whale_fade | 10 | 2 | 20% | $-593.25 | -59.32% | 21 | $9989.75 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9980.87 |
| momentum | 14 | 11 | 79% | $-144.41 | -10.31% | 25 | $9912.36 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9885.97 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9854.25 |
| late_favorite | 5 | 3 | 60% | $-125.29 | -25.06% | 25 | $9835.37 |
| mean_revert | 14 | 3 | 21% | $-920.75 | -65.77% | 25 | $9012.01 |

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
