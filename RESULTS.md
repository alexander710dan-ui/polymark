# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 58 · Last run: 2026-07-21T06:35:57.066Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 105 | 58 | 55% | $1176.35 | 11.2% | 12 | $11179.62 |
| momentum | 56 | 42 | 75% | $98.24 | 1.75% | 25 | $10068.54 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10038.97 |
| mean_revert | 55 | 13 | 24% | $-632.86 | -11.51% | 25 | $9424.97 |
| favorite | 43 | 27 | 63% | $-559.11 | -13% | 25 | $9405.66 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9391.63 |
| late_favorite | 78 | 58 | 74% | $-791.9 | -10.15% | 17 | $9184.84 |
| whale_fade | 105 | 47 | 45% | $-928.84 | -8.85% | 12 | $8903.11 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7522.3 |

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
