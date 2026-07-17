# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4 · Last run: 2026-07-17T03:37:29.765Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| momentum | 3 | 3 | 100% | $72.16 | 24.05% | 17 | $10043.27 |
| random_control | 0 | 0 | — | $0 | — | 18 | $10009.61 |
| longshot | 0 | 0 | — | $0 | — | 20 | $9999.35 |
| fade_longshot | 0 | 0 | — | $0 | — | 20 | $9993.05 |
| favorite | 0 | 0 | — | $0 | — | 20 | $9908.58 |
| mean_revert | 2 | 0 | 0% | $-200 | -100% | 18 | $9783.22 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **random_control** — coin flips, the baseline every strategy must beat

_Updated automatically by GitHub Actions every 6 hours._
