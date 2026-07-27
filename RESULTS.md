# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5852 · Last run: 2026-07-27T00:25:30.252Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 215 | 113 | 53% | $1247.83 | 5.8% | $-80.74 | 25 | $11052.14 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10398.17 |
| super | 11 | 6 | 55% | $288.98 | 19.27% | $96.82 | 24 | $10307.71 |
| momentum | 121 | 88 | 73% | $405 | 3.35% | $-83.24 | 25 | $10173.6 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10077.58 |
| copy_pro | 185 | 91 | 49% | $-505.54 | -1.75% | $-1355.54 | 24 | $10022.89 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9750.32 |
| mid_momentum | 105 | 60 | 57% | $187.73 | 1.79% | $-25.75 | 25 | $9695.73 |
| whale_fade | 215 | 101 | 47% | $-1254.85 | -5.84% | $-1589.63 | 25 | $8404.66 |
| copy_month (retired) | 149 | 72 | 48% | $25.39 | 0.17% | $-783.7 | 16 | $9992.17 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9093.2 |
| favorite (retired) | 113 | 73 | 65% | $-1232.54 | -10.91% | $-1296.47 | 23 | $8840.13 |
| late_favorite (retired) | 397 | 306 | 77% | $-1824.87 | -4.6% | $-1865.72 | 12 | $8296.15 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7450.32 |

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
