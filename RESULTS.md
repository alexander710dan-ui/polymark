# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10.000 and bets $100 per position on markets resolving within 45 days.

Ticks: 17 · Last run: 2026-07-18T12:00:20.123Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10119.94 |
| late_favorite | 0 | 0 | — | $0 | — | 5 | $10000.01 |
| copy_top | 0 | 0 | — | $0 | — | 5 | $10000.01 |
| whale_fade | 0 | 0 | — | $0 | — | 5 | $9999.99 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9983.11 |
| momentum | 12 | 9 | 75% | $-164.3 | -13.69% | 25 | $9923.17 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9890.6 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9830.6 |
| mean_revert | 12 | 3 | 25% | $-720.75 | -60.06% | 25 | $8907.69 |

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
