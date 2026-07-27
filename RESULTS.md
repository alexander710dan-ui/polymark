# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 6303 · Last run: 2026-07-27T09:51:16.492Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 223 | 117 | 52% | $1107.23 | 4.97% | $-221.34 | 23 | $11229.4 |
| super | 19 | 12 | 63% | $694.99 | 27.25% | $502.83 | 25 | $10807.87 |
| copy_pro | 192 | 95 | 49% | $-236.52 | -0.79% | $-1086.52 | 25 | $10515.58 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10378.26 |
| momentum | 123 | 90 | 73% | $505.77 | 4.11% | $17.53 | 25 | $10127.19 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10090.71 |
| mid_momentum | 108 | 63 | 58% | $355.17 | 3.29% | $141.69 | 25 | $9900.47 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9817.18 |
| whale_fade | 223 | 105 | 47% | $-1230.96 | -5.52% | $-1565.74 | 23 | $8030.29 |
| copy_month (retired) | 150 | 72 | 48% | $-74.61 | -0.5% | $-883.7 | 15 | $9964.61 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9058.13 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8872.12 |
| late_favorite (retired) | 398 | 307 | 77% | $-1817.34 | -4.57% | $-1858.19 | 11 | $8292.9 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7295.19 |

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
