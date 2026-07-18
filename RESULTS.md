# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 11 · Last run: 2026-07-18T00:11:36.591Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10120.81 |
| fade_longshot | 1 | 1 | 100% | $2.15 | 2.15% | 25 | $9979.17 |
| momentum | 9 | 7 | 78% | $-75.99 | -8.44% | 25 | $9961.22 |
| longshot | 1 | 0 | 0% | $-100 | -100% | 25 | $9958.75 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9867.55 |
| mean_revert | 9 | 2 | 22% | $-593.16 | -65.91% | 25 | $9164.05 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **random_control** — coin flips, the baseline every strategy must beat

_Updated automatically by GitHub Actions every 15 minutes. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
