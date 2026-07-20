# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 49 · Last run: 2026-07-20T12:57:00.042Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 75 | 45 | 60% | $1907.74 | 25.44% | 13 | $11730.69 |
| momentum | 37 | 28 | 76% | $102.44 | 2.77% | 25 | $10093.11 |
| fade_longshot | 33 | 32 | 97% | $41.36 | 1.25% | 25 | $9983.15 |
| mean_revert | 34 | 7 | 21% | $-118.42 | -3.48% | 25 | $9744.88 |
| random_control | 36 | 20 | 56% | $-373.26 | -10.37% | 25 | $9658.64 |
| late_favorite | 53 | 39 | 74% | $-583.74 | -11.01% | 22 | $9477.56 |
| favorite | 28 | 16 | 57% | $-617.93 | -22.07% | 25 | $9474.74 |
| whale_fade | 75 | 30 | 40% | $-1506.02 | -20.08% | 13 | $8654.09 |
| longshot | 33 | 1 | 3% | $-1891.55 | -57.32% | 25 | $8367.68 |

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
