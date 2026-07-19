# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 44 · Last run: 2026-07-19T23:14:21.685Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 63 | 38 | 60% | $2159.56 | 34.28% | 10 | $12002.11 |
| mean_revert | 21 | 3 | 14% | $-1620.75 | -77.18% | 25 | $10245.9 |
| random_control | 30 | 19 | 63% | $124.39 | 4.15% | 17 | $10142.74 |
| momentum | 25 | 20 | 80% | $-86.49 | -3.46% | 25 | $10085.49 |
| fade_longshot | 27 | 27 | 100% | $121.19 | 4.49% | 14 | $10012.58 |
| late_favorite | 47 | 37 | 79% | $-206.21 | -4.39% | 11 | $9581.59 |
| favorite | 19 | 13 | 68% | $-144.56 | -7.61% | 24 | $9552.03 |
| longshot | 27 | 0 | 0% | $-2700 | -100% | 14 | $8481.12 |
| whale_fade | 63 | 25 | 40% | $-1446.31 | -22.96% | 10 | $8479.57 |

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
