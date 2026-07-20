# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 48 · Last run: 2026-07-20T10:33:43.265Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 73 | 43 | 59% | $1802.14 | 24.69% | 10 | $11702.19 |
| momentum | 35 | 26 | 74% | $89.69 | 2.56% | 25 | $10107.88 |
| fade_longshot | 33 | 32 | 97% | $41.36 | 1.25% | 25 | $9982.66 |
| mean_revert | 31 | 7 | 23% | $181.58 | 5.86% | 25 | $9808.47 |
| random_control | 36 | 20 | 56% | $-373.26 | -10.37% | 25 | $9785.88 |
| late_favorite | 52 | 39 | 75% | $-483.74 | -9.3% | 18 | $9399.36 |
| favorite | 27 | 15 | 56% | $-629.16 | -23.3% | 25 | $9380.99 |
| whale_fade | 73 | 30 | 41% | $-1306.02 | -17.89% | 10 | $8779.82 |
| longshot | 33 | 1 | 3% | $-1891.55 | -57.32% | 25 | $8489.71 |

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
