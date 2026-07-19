# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 35 · Last run: 2026-07-19T12:41:03.708Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 42 | 23 | 55% | $1244.81 | 29.64% | 24 | $11051.37 |
| random_control | 13 | 7 | 54% | $445.34 | 34.26% | 25 | $10655.4 |
| momentum | 18 | 14 | 78% | $-135.43 | -7.52% | 25 | $10054.5 |
| fade_longshot | 10 | 10 | 100% | $42.68 | 4.27% | 25 | $10010.88 |
| whale_fade | 42 | 19 | 45% | $-537.9 | -12.81% | 24 | $9832.21 |
| favorite | 12 | 8 | 67% | $-95.91 | -7.99% | 25 | $9658.54 |
| late_favorite | 25 | 17 | 68% | $-428.31 | -17.13% | 25 | $9446.33 |
| longshot | 10 | 0 | 0% | $-1000 | -100% | 25 | $9131.45 |
| mean_revert | 18 | 3 | 17% | $-1320.75 | -73.37% | 25 | $8467.39 |

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
