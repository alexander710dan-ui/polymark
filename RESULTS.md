# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 46 · Last run: 2026-07-20T04:23:52.515Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 72 | 43 | 60% | $1902.14 | 26.42% | 2 | $11802.24 |
| momentum | 34 | 25 | 74% | $28.4 | 0.84% | 23 | $10150.23 |
| mean_revert | 30 | 7 | 23% | $281.58 | 9.39% | 22 | $10058.44 |
| fade_longshot | 33 | 32 | 97% | $41.36 | 1.25% | 18 | $10024.77 |
| random_control | 35 | 20 | 57% | $-273.26 | -7.81% | 22 | $9910.7 |
| late_favorite | 52 | 39 | 75% | $-483.74 | -9.3% | 11 | $9532.45 |
| favorite | 25 | 15 | 60% | $-429.16 | -17.17% | 25 | $9496.7 |
| whale_fade | 72 | 29 | 40% | $-1398.33 | -19.42% | 2 | $8693.88 |
| longshot | 33 | 1 | 3% | $-1891.55 | -57.32% | 18 | $8091.93 |

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
