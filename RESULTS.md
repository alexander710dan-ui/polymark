# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19851 · Last run: 2026-08-01T04:27:54.504Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 325 | 171 | 53% | $669.91 | 2.06% | $-658.66 | 18 | $10753.57 |
| copy_pro | 300 | 155 | 52% | $513.78 | 1.09% | $-336.22 | 22 | $10741.12 |
| strong_dip | 78 | 49 | 63% | $-37.27 | -0.48% | $-129.58 | 23 | $10021.98 |
| fade_longshot | 89 | 85 | 96% | $40.26 | 0.45% | $29.52 | 25 | $9989.25 |
| mid_momentum | 165 | 94 | 57% | $373.98 | 2.27% | $160.5 | 25 | $9905.99 |
| random_control | 92 | 51 | 55% | $-338.94 | -3.68% | $-953.23 | 25 | $9512.34 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9463.85 |
| mm_tight | 117 | 59 | 50% | $-931.12 | -7.96% | $-1134.15 | 9 | $9273.17 |
| mm_max | 42 | 19 | 45% | $-874.26 | -20.82% | $-991.65 | 4 | $9187.36 |
| super | 56 | 25 | 45% | $-449.65 | -6% | $-665.5 | 13 | $9117.9 |
| mm_slow | 40 | 18 | 45% | $-1051.39 | -26.28% | $-1168.78 | 25 | $8868.61 |
| mm_sports | 135 | 69 | 51% | $-1417.68 | -10.5% | $-1620.71 | 10 | $8791.76 |
| mm_strong | 54 | 24 | 44% | $-1015.26 | -18.8% | $-1219.21 | 25 | $8575.04 |
| momentum | 207 | 138 | 67% | $-1394 | -6.73% | $-1882.24 | 25 | $8201.26 |
| whale_fade | 326 | 152 | 47% | $-2939.18 | -9.02% | $-3273.96 | 18 | $6615.59 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9312.18 |
| favorite (retired) | 125 | 84 | 67% | $-1148.97 | -9.19% | $-1212.9 | 11 | $9087.74 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 137 | 36 | 26% | $-1165.3 | -8.51% | $-3192.96 | 10 | $8035.54 |
| longshot (retired) | 76 | 2 | 3% | $-4191.55 | -55.15% | $-6091.55 | 8 | $5092.53 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)
- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)
- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)
- **mm_slow** — mid_momentum, only markets resolving in 2+ days
- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢
- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢
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
