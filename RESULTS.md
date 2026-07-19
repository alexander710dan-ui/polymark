# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29 · Last run: 2026-07-19T00:12:13.745Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 36 | 20 | 56% | $1380.48 | 38.35% | 14 | $11231.36 |
| random_control | 10 | 6 | 60% | $549.26 | 54.93% | 21 | $10694.9 |
| momentum | 16 | 13 | 81% | $-86.95 | -5.43% | 25 | $10129.34 |
| fade_longshot | 10 | 10 | 100% | $42.68 | 4.27% | 22 | $10019.86 |
| whale_fade | 36 | 16 | 44% | $-447.95 | -12.44% | 14 | $9793.54 |
| favorite | 8 | 5 | 63% | $-157.97 | -19.75% | 25 | $9592.65 |
| late_favorite | 23 | 15 | 65% | $-475.28 | -20.66% | 16 | $9435.01 |
| longshot | 10 | 0 | 0% | $-1000 | -100% | 22 | $9102.23 |
| mean_revert | 17 | 3 | 18% | $-1220.75 | -71.81% | 25 | $8799.79 |

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
