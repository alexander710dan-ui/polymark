# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 57 · Last run: 2026-07-21T03:50:41.004Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 98 | 55 | 56% | $1181.91 | 12.06% | 18 | $11410.28 |
| momentum | 53 | 40 | 75% | $136.95 | 2.58% | 25 | $10124.85 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10038.47 |
| favorite | 40 | 26 | 65% | $-417.84 | -10.45% | 25 | $9526.46 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9413.74 |
| mean_revert | 52 | 12 | 23% | $-690 | -13.27% | 25 | $9384.09 |
| late_favorite | 76 | 57 | 75% | $-715.36 | -9.41% | 14 | $9286.99 |
| whale_fade | 98 | 43 | 44% | $-1112 | -11.35% | 18 | $8616.71 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7518.02 |

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
