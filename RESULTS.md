# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21 · Last run: 2026-07-18T15:01:50.570Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 4 | 3 | 75% | $-24.82 | -6.2% | 15 | $11480.91 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10128.28 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $9980.3 |
| momentum | 12 | 9 | 75% | $-164.3 | -13.69% | 25 | $9919.87 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9894.47 |
| whale_fade | 4 | 1 | 25% | $-116.71 | -29.18% | 15 | $9886.64 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9873.22 |
| late_favorite | 0 | 0 | — | $0 | — | 25 | $9812.7 |
| mean_revert | 12 | 3 | 25% | $-720.75 | -60.06% | 25 | $8967 |

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
