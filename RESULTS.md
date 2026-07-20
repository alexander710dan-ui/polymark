# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 50 · Last run: 2026-07-20T15:18:42.780Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 79 | 46 | 58% | $1628.08 | 20.61% | 14 | $11645.78 |
| momentum | 37 | 28 | 76% | $102.44 | 2.77% | 25 | $10127.5 |
| fade_longshot | 33 | 32 | 97% | $41.36 | 1.25% | 25 | $10014.09 |
| random_control | 36 | 20 | 56% | $-373.26 | -10.37% | 25 | $9564.49 |
| favorite | 29 | 17 | 59% | $-575.07 | -19.83% | 25 | $9550.67 |
| late_favorite | 55 | 41 | 75% | $-551.18 | -10.02% | 23 | $9533.53 |
| mean_revert | 35 | 8 | 23% | $-46.01 | -1.31% | 25 | $9463.11 |
| whale_fade | 79 | 33 | 42% | $-1241.19 | -15.71% | 14 | $8616.6 |
| longshot | 33 | 1 | 3% | $-1891.55 | -57.32% | 25 | $7966.35 |

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
