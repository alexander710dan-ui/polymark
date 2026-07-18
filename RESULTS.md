# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25 · Last run: 2026-07-18T19:47:42.108Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 13 | 8 | 62% | $1446.49 | 111.27% | 23 | $11159.92 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10200.11 |
| momentum | 14 | 11 | 79% | $-144.41 | -10.31% | 25 | $10092.52 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9978.84 |
| whale_fade | 13 | 5 | 38% | $-415.41 | -31.95% | 23 | $9976.03 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9912.11 |
| late_favorite | 7 | 5 | 71% | $-63.96 | -9.14% | 25 | $9850.04 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9843.78 |
| mean_revert | 14 | 3 | 21% | $-920.75 | -65.77% | 25 | $8751.1 |

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
