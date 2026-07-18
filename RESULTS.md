# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22 · Last run: 2026-07-18T16:12:26.657Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 4 | 3 | 75% | $-24.82 | -6.2% | 20 | $11385.89 |
| whale_fade | 4 | 1 | 25% | $-116.71 | -29.18% | 20 | $10142.13 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10118.57 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9980.47 |
| momentum | 12 | 9 | 75% | $-164.3 | -13.69% | 25 | $9937.08 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9868.22 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9866.02 |
| late_favorite | 2 | 2 | 100% | $51.25 | 25.63% | 25 | $9823.65 |
| mean_revert | 12 | 3 | 25% | $-720.75 | -60.06% | 25 | $8887.96 |

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
