# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13 · Last run: 2026-07-18T05:53:37.926Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10110.11 |
| fade_longshot | 1 | 1 | 100% | $2.15 | 2.15% | 25 | $9981.72 |
| longshot | 1 | 0 | 0% | $-100 | -100% | 25 | $9903.94 |
| momentum | 11 | 8 | 73% | $-167.29 | -15.21% | 25 | $9903.93 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9881.86 |
| mean_revert | 11 | 3 | 27% | $-620.75 | -56.43% | 25 | $9129.89 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **random_control** — coin flips, the baseline every strategy must beat

_Updated automatically by GitHub Actions every 15 minutes. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
