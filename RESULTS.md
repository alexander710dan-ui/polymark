# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 5626 · Last run: 2026-07-26T19:42:47.068Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 209 | 109 | 52% | $1046.67 | 5.01% | $-281.9 | 25 | $11196.9 |
| random_control | 56 | 30 | 54% | $-150.58 | -2.69% | $-764.87 | 25 | $10346.41 |
| momentum | 119 | 87 | 73% | $488.72 | 4.11% | $0.48 | 25 | $10153.05 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10076.45 |
| copy_pro | 179 | 86 | 48% | $-1097.54 | -3.92% | $-1947.54 | 25 | $9842.79 |
| strong_dip | 48 | 26 | 54% | $-451.83 | -9.41% | $-544.14 | 25 | $9656.32 |
| super | 0 | 0 | — | $0 | — | $0 | 25 | $9641.98 |
| mid_momentum | 102 | 58 | 57% | $56.75 | 0.56% | $-156.73 | 25 | $9608.86 |
| whale_fade | 209 | 99 | 47% | $-986.43 | -4.72% | $-1321.21 | 25 | $8257.76 |
| copy_month (retired) | 143 | 68 | 48% | $-102.51 | -0.72% | $-911.6 | 22 | $10017.4 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $9024.98 |
| favorite (retired) | 113 | 73 | 65% | $-1232.54 | -10.91% | $-1296.47 | 23 | $8816.4 |
| late_favorite (retired) | 392 | 304 | 78% | $-1580.04 | -4.03% | $-1620.89 | 17 | $8296.47 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7388.6 |

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
