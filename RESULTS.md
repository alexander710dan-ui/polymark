# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5571 · Last run: 2026-07-26T18:34:03.449Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 208 | 108 | 52% | $968.1 | 4.65% | $-360.47 | 25 | $11053.77 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10348.35 |
| momentum | 119 | 87 | 73% | $488.72 | 4.11% | $0.48 | 25 | $10260.6 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10080.07 |
| super | 0 | 0 | — | $0 | — | $0 | 25 | $9688.3 |
| strong_dip | 48 | 26 | 54% | $-451.83 | -9.41% | $-544.14 | 25 | $9648.09 |
| copy_pro | 178 | 85 | 48% | $-1172.98 | -4.2% | $-2022.98 | 25 | $9615.2 |
| mid_momentum | 102 | 58 | 57% | $56.75 | 0.56% | $-156.73 | 25 | $9584.92 |
| whale_fade | 208 | 99 | 48% | $-886.43 | -4.26% | $-1221.21 | 25 | $8404.61 |
| copy_month (retired) | 141 | 66 | 47% | $-303.3 | -2.15% | $-1112.39 | 24 | $9838.78 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9014.63 |
| favorite (retired) | 112 | 72 | 64% | $-1254.49 | -11.2% | $-1318.42 | 24 | $8816.8 |
| late_favorite (retired) | 388 | 301 | 78% | $-1546.65 | -3.99% | $-1587.5 | 21 | $8266.72 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7344.23 |

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
