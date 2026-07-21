# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 65 · Last run: 2026-07-21T15:12:53.539Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | Open | Equity |
|---|---|---|---|---|---|---|---|
| copy_top | 111 | 60 | 54% | $792.62 | 7.14% | 17 | $10741.41 |
| copy_pro | 6 | 2 | 33% | $-366.23 | -43.09% | 6 | $10342.4 |
| mid_momentum | 7 | 4 | 57% | $45.01 | 6.43% | 25 | $10098.39 |
| momentum | 56 | 42 | 75% | $98.24 | 1.75% | 25 | $10068.71 |
| fade_longshot | 36 | 35 | 97% | $52.63 | 1.46% | 25 | $10058.17 |
| strong_dip | 1 | 0 | 0% | $-100 | -100% | 7 | $9883.5 |
| copy_month | 6 | 2 | 33% | $-383.73 | -63.95% | 6 | $9592.5 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | 25 | $9550.96 |
| mean_revert | 55 | 13 | 24% | $-632.86 | -11.51% | 25 | $9521.15 |
| favorite | 45 | 29 | 64% | $-492.39 | -10.94% | 25 | $9345.79 |
| late_favorite | 85 | 64 | 75% | $-739.13 | -8.7% | 25 | $9071.79 |
| whale_fade | 111 | 51 | 46% | $-859.34 | -7.74% | 17 | $9034.98 |
| longshot | 36 | 1 | 3% | $-2191.55 | -60.88% | 25 | $7487.65 |

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **late_favorite** — buys 70–93¢ favourites within 2 days of resolution
- **copy_top** — mirrors what the top-10 leaderboard wallets bought in the last 24h (≥$500, ≥70% agreement)
- **copy_pro** — copy trading with everything turned on: efficiency-filtered top-25 wallets, 6h freshness, refuses to chase prices that ran >5¢ past the whales' entry, conviction-scaled stakes ($100–250)
- **copy_month** — copy_top's exact rules, but following the top-10 of the MONTHLY leaderboard (in-form traders)
- **whale_fade** — bets against copy_top's picks (the control for copy_top)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (momentum won 75% of bets and still lost money buying 95¢ sides)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite (mean_revert died buying dying longshots; this only catches falling *leaders*)
- **random_control** — coin flips, the baseline every strategy must beat

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
