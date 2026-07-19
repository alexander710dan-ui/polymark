# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 41 · Last run: 2026-07-19T19:57:14.657Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 45 | 25 | 56% | $1242.38 | 27.61% | 25 | $11552.88 |
| random_control | 15 | 9 | 60% | $464.39 | 30.96% | 25 | $10459.37 |
| momentum | 21 | 17 | 81% | $-31.01 | -1.48% | 25 | $10210.33 |
| fade_longshot | 11 | 11 | 100% | $45.56 | 4.14% | 25 | $10056.02 |
| favorite | 13 | 9 | 69% | $-79.63 | -6.13% | 25 | $9661.41 |
| late_favorite | 28 | 20 | 71% | $-364.76 | -13.03% | 25 | $9591.56 |
| whale_fade | 45 | 20 | 44% | $-587.9 | -13.06% | 25 | $8919.92 |
| longshot | 11 | 0 | 0% | $-1100 | -100% | 25 | $8197.88 |
| mean_revert | 19 | 3 | 16% | $-1420.75 | -74.78% | 25 | $8197.48 |

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
