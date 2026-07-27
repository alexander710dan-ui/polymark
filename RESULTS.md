# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 6960 · Last run: 2026-07-27T18:18:41.616Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 227 | 117 | 52% | $805.27 | 3.55% | $-523.3 | 24 | $11148.91 |
| copy_pro | 196 | 97 | 49% | $-463.87 | -1.51% | $-1313.87 | 25 | $10702.11 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10467.6 |
| momentum | 126 | 92 | 73% | $482.15 | 3.83% | $-6.09 | 25 | $10456.9 |
| super | 27 | 14 | 52% | $186.33 | 5.4% | $-5.83 | 25 | $10289.74 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10076.52 |
| mid_momentum | 110 | 64 | 58% | $330.61 | 3.01% | $117.13 | 25 | $9975.27 |
| ai_judge | 0 | 0 | — | $0 | — | $0 | 9 | $9860.45 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9509.21 |
| whale_fade | 227 | 108 | 48% | $-932.68 | -4.11% | $-1267.46 | 24 | $8500.09 |
| copy_month (retired) | 150 | 72 | 48% | $-74.61 | -0.5% | $-883.7 | 15 | $10195.07 |
| mean_revert (retired) | 122 | 29 | 24% | $-624.26 | -5.12% | $-2651.92 | 25 | $8832.6 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8716.18 |
| late_favorite (retired) | 402 | 310 | 77% | $-1864.85 | -4.64% | $-1905.7 | 7 | $8270.02 |
| longshot (retired) | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7629.15 |

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
- **ai_judge** — bets when a local model (Ollama on the runner) disagrees with the market by >4¢ after costs; the AI's skill is judged like any other strategy
- **random_control** — coin flips, the baseline every strategy must beat

Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_
