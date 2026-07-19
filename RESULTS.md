# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 40 · Last run: 2026-07-19T18:40:56.303Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 44 | 24 | 55% | $1150.07 | 26.14% | 25 | $11399.32 |
| random_control | 13 | 7 | 54% | $445.34 | 34.26% | 25 | $10690.06 |
| momentum | 20 | 16 | 80% | $-87.26 | -4.36% | 25 | $10184.51 |
| fade_longshot | 11 | 11 | 100% | $45.56 | 4.14% | 25 | $10013.75 |
| favorite | 12 | 8 | 67% | $-95.91 | -7.99% | 25 | $9665.86 |
| late_favorite | 27 | 19 | 70% | $-372.52 | -13.8% | 25 | $9514.85 |
| whale_fade | 44 | 20 | 45% | $-487.9 | -11.09% | 25 | $9413.58 |
| longshot | 11 | 0 | 0% | $-1100 | -100% | 25 | $9142.18 |
| mean_revert | 19 | 3 | 16% | $-1420.75 | -74.78% | 25 | $8263.18 |

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
