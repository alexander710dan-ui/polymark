# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28 · Last run: 2026-07-18T23:04:11.600Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 20 | 11 | 55% | $1168.73 | 58.44% | 25 | $11263.64 |
| random_control | 1 | 1 | 100% | $13.77 | 13.77% | 25 | $10685.73 |
| momentum | 15 | 12 | 80% | $-88.16 | -5.88% | 25 | $10134.52 |
| fade_longshot | 2 | 2 | 100% | $5.24 | 2.62% | 25 | $10013.71 |
| whale_fade | 20 | 9 | 45% | $-92.78 | -4.64% | 25 | $9769.48 |
| favorite | 3 | 2 | 67% | $-47.34 | -15.78% | 25 | $9579.65 |
| late_favorite | 9 | 6 | 67% | $-140.5 | -15.61% | 25 | $9416.53 |
| longshot | 2 | 0 | 0% | $-200 | -100% | 25 | $9282.8 |
| mean_revert | 15 | 3 | 20% | $-1020.75 | -68.05% | 25 | $8817.11 |

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
