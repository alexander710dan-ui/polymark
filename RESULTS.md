# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27 · Last run: 2026-07-18T22:00:36.780Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 17 | 9 | 53% | $1156.38 | 68.02% | 25 | $11132.19 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10696.41 |
| momentum | 15 | 12 | 80% | $-88.16 | -5.88% | 25 | $10050.33 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $10021.21 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9756.15 |
| whale_fade | 17 | 8 | 47% | $-1.11 | -0.07% | 25 | $9733.98 |
| late_favorite | 9 | 6 | 67% | $-140.5 | -15.61% | 25 | $9644.89 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9081.19 |
| mean_revert | 15 | 3 | 20% | $-1020.75 | -68.05% | 25 | $8743.81 |

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
