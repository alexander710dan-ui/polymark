# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 45 · Last run: 2026-07-20T00:16:16.049Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 66 | 39 | 59% | $2023.49 | 30.66% | 7 | $11883.37 |
| mean_revert | 22 | 4 | 18% | $-1450.48 | -65.93% | 25 | $10260.47 |
| random_control | 30 | 19 | 63% | $124.39 | 4.15% | 22 | $10145.2 |
| momentum | 27 | 21 | 78% | $-166.01 | -6.15% | 25 | $10070.88 |
| fade_longshot | 28 | 28 | 100% | $127.69 | 4.56% | 18 | $10009.07 |
| late_favorite | 48 | 37 | 77% | $-306.21 | -6.38% | 13 | $9568.04 |
| favorite | 20 | 13 | 65% | $-244.56 | -12.23% | 25 | $9521.01 |
| whale_fade | 66 | 27 | 41% | $-1189.75 | -18.03% | 7 | $8597.58 |
| longshot | 28 | 0 | 0% | $-2800 | -100% | 18 | $8410.08 |

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
