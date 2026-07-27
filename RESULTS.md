# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5920 · Last run: 2026-07-27T01:50:36.352Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 217 | 115 | 53% | $1442.42 | 6.65% | $113.85 | 23 | $11156.53 |
| super | 13 | 8 | 62% | $621.77 | 33.61% | $429.61 | 24 | $10529.24 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10390.6 |
| copy_pro | 187 | 92 | 49% | $-312.06 | -1.07% | $-1162.06 | 23 | $10270.95 |
| momentum | 121 | 88 | 73% | $405 | 3.35% | $-83.24 | 25 | $10166.43 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10079.18 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9764.3 |
| mid_momentum | 105 | 60 | 57% | $187.73 | 1.79% | $-25.75 | 25 | $9708.99 |
| whale_fade | 217 | 101 | 47% | $-1454.85 | -6.7% | $-1789.63 | 23 | $8316.1 |
| copy_month (retired) | 149 | 72 | 48% | $25.39 | 0.17% | $-783.7 | 16 | $9979.45 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9063.17 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8849.59 |
| late_favorite (retired) | 397 | 306 | 77% | $-1824.87 | -4.6% | $-1865.72 | 12 | $8290.74 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7429.39 |

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
