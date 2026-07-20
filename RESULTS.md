# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 47 · Last run: 2026-07-20T07:42:41.416Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 73 | 43 | 59% | $1802.14 | 24.69% | 6 | $11799.79 |
| momentum | 34 | 25 | 74% | $28.4 | 0.84% | 25 | $10242.62 |
| fade_longshot | 33 | 32 | 97% | $41.36 | 1.25% | 23 | $10019.28 |
| random_control | 35 | 20 | 57% | $-273.26 | -7.81% | 25 | $9893.01 |
| mean_revert | 30 | 7 | 23% | $281.58 | 9.39% | 25 | $9766.25 |
| favorite | 25 | 15 | 60% | $-429.16 | -17.17% | 25 | $9484.94 |
| late_favorite | 52 | 39 | 75% | $-483.74 | -9.3% | 15 | $9449.27 |
| whale_fade | 73 | 30 | 41% | $-1306.02 | -17.89% | 6 | $8695.33 |
| longshot | 33 | 1 | 3% | $-1891.55 | -57.32% | 23 | $8049.46 |

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
