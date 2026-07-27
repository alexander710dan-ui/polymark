# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 7562 · Last run: 2026-07-27T22:53:06.824Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 229 | 117 | 51% | $605.27 | 2.64% | $-723.3 | 25 | $10921.85 |
| momentum | 127 | 93 | 73% | $483.36 | 3.81% | $-4.88 | 25 | $10467.39 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10444.34 |
| copy_pro | 197 | 97 | 49% | $-563.87 | -1.83% | $-1413.87 | 25 | $10443.81 |
| super | 28 | 14 | 50% | $86.33 | 2.43% | $-105.83 | 25 | $10114.91 |
| fade_longshot | 60 | 58 | 97% | $89.03 | 1.48% | $79.14 | 25 | $10087.59 |
| mid_momentum | 112 | 66 | 59% | $502.87 | 4.49% | $289.39 | 25 | $10009.09 |
| ai_judge | 0 | 0 | — | $0 | — | $0 | 9 | $9803.52 |
| strong_dip | 49 | 26 | 53% | $-551.83 | -11.26% | $-644.14 | 25 | $9463.74 |
| whale_fade | 229 | 110 | 48% | $-790.29 | -3.45% | $-1125.07 | 25 | $8676.29 |
| copy_month (retired) | 150 | 72 | 48% | $-74.61 | -0.5% | $-883.7 | 15 | $10189.65 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8741.05 |
| mean_revert (retired) | 123 | 29 | 24% | $-724.26 | -5.89% | $-2751.92 | 24 | $8596.53 |
| late_favorite (retired) | 402 | 310 | 77% | $-1864.85 | -4.64% | $-1905.7 | 7 | $8296.56 |
| longshot (retired) | 60 | 2 | 3% | $-2591.55 | -43.19% | $-4491.55 | 24 | $7478.76 |

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
