# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16 · Last run: 2026-07-18T11:10:21.788Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10108.85 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9982.39 |
| momentum | 12 | 9 | 75% | $-164.3 | -13.69% | 25 | $9918 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9892.41 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9850.04 |
| mean_revert | 12 | 3 | 25% | $-720.75 | -60.06% | 25 | $8888.51 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **random_control** — coin flips, the baseline every strategy must beat

_Updated automatically by GitHub Actions every 15 minutes. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
