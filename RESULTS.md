# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 42 · Last run: 2026-07-19T21:02:53.577Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 46 | 26 | 57% | $1243.49 | 27.03% | 25 | $11648.77 |
| random_control | 16 | 9 | 56% | $364.39 | 22.77% | 25 | $10376.97 |
| momentum | 22 | 18 | 82% | $2.32 | 0.11% | 25 | $10322.81 |
| fade_longshot | 11 | 11 | 100% | $45.56 | 4.14% | 25 | $10094.99 |
| late_favorite | 28 | 20 | 71% | $-364.76 | -13.03% | 25 | $9709.84 |
| favorite | 13 | 9 | 69% | $-79.63 | -6.13% | 25 | $9632.1 |
| whale_fade | 46 | 20 | 43% | $-687.9 | -14.95% | 25 | $9000.26 |
| mean_revert | 20 | 3 | 15% | $-1520.75 | -76.04% | 25 | $8179.04 |
| longshot | 11 | 0 | 0% | $-1100 | -100% | 25 | $7573.87 |

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
