# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5770 · Last run: 2026-07-26T22:42:59.398Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 213 | 111 | 52% | $1059.44 | 4.97% | $-269.13 | 25 | $11369.97 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10430.18 |
| super | 6 | 2 | 33% | $-145.34 | -17.1% | $-337.5 | 25 | $10427.23 |
| copy_pro | 183 | 90 | 49% | $-590.16 | -2.06% | $-1440.16 | 25 | $10359.89 |
| momentum | 120 | 87 | 73% | $388.72 | 3.24% | $-99.52 | 25 | $10147.47 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10069.56 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9745.21 |
| mid_momentum | 104 | 60 | 58% | $287.73 | 2.77% | $74.25 | 25 | $9671.49 |
| whale_fade | 213 | 101 | 47% | $-1054.85 | -4.95% | $-1389.63 | 25 | $8092.56 |
| copy_month (retired) | 148 | 71 | 48% | $-70.69 | -0.48% | $-879.78 | 17 | $10097.69 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9127.35 |
| favorite (retired) | 113 | 73 | 65% | $-1232.54 | -10.91% | $-1296.47 | 23 | $8816.15 |
| late_favorite (retired) | 397 | 306 | 77% | $-1824.87 | -4.6% | $-1865.72 | 12 | $8283.71 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7596.83 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite
- **copy_top** — mirrors top-10 leaderboard wallets' pregame buys (in-play skipped)
- **copy_pro** — copy trading with all refinements: filtered wallets, 6h freshness, no chasing, conviction stakes
- **whale_fade** — bets against copy_top's picks (its control)
- **random_control** — coin flips, the baseline every strategy must beat

Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
