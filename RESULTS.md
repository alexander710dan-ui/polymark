# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2 · Last run: 2026-07-16T15:10:05.024Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| fade_longshot | 0 | 0 | — | $0 | — | 10 | $9999.67 |
| momentum | 0 | 0 | — | $0 | — | 10 | $9998.51 |
| random_control | 0 | 0 | — | $0 | — | 10 | $9998.45 |
| favorite | 0 | 0 | — | $0 | — | 10 | $9997.7 |
| mean_revert | 0 | 0 | — | $0 | — | 10 | $9994.55 |
| longshot | 0 | 0 | — | $0 | — | 10 | $9987.4 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **random_control** — coin flips, the baseline every strategy must beat

_Updated automatically by GitHub Actions every 6 hours._
