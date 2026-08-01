# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 20068 · Last run: 2026-08-01T06:16:29.162Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 308 | 161 | 52% | $793.64 | 1.65% | $-56.36 | 16 | $10898.25 |
| copy_top | 329 | 174 | 53% | $682.9 | 2.08% | $-645.67 | 15 | $10823.13 |
| strong_dip | 83 | 51 | 61% | $-240.17 | -2.89% | $-332.48 | 19 | $10014.15 |
| fade_longshot | 98 | 94 | 96% | $98.04 | 1% | $87.3 | 25 | $10008.96 |
| mid_momentum | 171 | 95 | 56% | $-3.8 | -0.02% | $-217.28 | 24 | $9868.56 |
| ai_judge | 6 | 1 | 17% | $-487.64 | -81.27% | $-500 | 3 | $9460.18 |
| random_control | 100 | 57 | 57% | $-277.36 | -2.77% | $-891.65 | 25 | $9418.17 |
| mm_tight | 121 | 62 | 51% | $-747.09 | -6.17% | $-950.12 | 5 | $9333.71 |
| mm_max | 45 | 21 | 47% | $-739.48 | -16.43% | $-856.87 | 1 | $9263.35 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9150.73 |
| mm_slow | 42 | 19 | 45% | $-1029.17 | -24.5% | $-1151.39 | 25 | $8854.33 |
| mm_sports | 139 | 72 | 52% | $-1228.82 | -8.84% | $-1431.85 | 6 | $8854.15 |
| mm_strong | 57 | 26 | 46% | $-885.1 | -15.53% | $-1089.05 | 25 | $8625.65 |
| momentum | 217 | 145 | 67% | $-1314.74 | -6.06% | $-1802.98 | 25 | $8224.6 |
| whale_fade | 330 | 153 | 46% | $-3126.41 | -9.47% | $-3461.19 | 15 | $6519.66 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9327.75 |
| favorite (retired) | 130 | 89 | 68% | $-1031.74 | -7.94% | $-1095.67 | 6 | $9086.25 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 143 | 37 | 26% | $-1637.09 | -11.45% | $-3664.75 | 4 | $8040.43 |
| longshot (retired) | 80 | 2 | 3% | $-4591.55 | -57.39% | $-6491.55 | 4 | $5090.16 |

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
