# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 20051 · Last run: 2026-08-01T06:08:02.758Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 307 | 160 | 52% | $787.82 | 1.64% | $-62.18 | 17 | $10884.81 |
| copy_top | 329 | 174 | 53% | $682.9 | 2.08% | $-645.67 | 15 | $10809.8 |
| fade_longshot | 94 | 90 | 96% | $73.58 | 0.78% | $62.84 | 25 | $10007.83 |
| strong_dip | 82 | 50 | 61% | $-296.42 | -3.61% | $-388.73 | 20 | $10005.97 |
| mid_momentum | 170 | 95 | 56% | $96.2 | 0.57% | $-117.28 | 25 | $9883.63 |
| ai_judge | 6 | 1 | 17% | $-487.64 | -81.27% | $-500 | 3 | $9460.18 |
| random_control | 98 | 56 | 57% | $-196.41 | -2% | $-810.7 | 25 | $9417.91 |
| mm_tight | 121 | 62 | 51% | $-747.09 | -6.17% | $-950.12 | 5 | $9330.77 |
| mm_max | 45 | 21 | 47% | $-739.48 | -16.43% | $-856.87 | 1 | $9263.35 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9141.33 |
| mm_slow | 42 | 19 | 45% | $-1029.17 | -24.5% | $-1151.39 | 25 | $8884.82 |
| mm_sports | 139 | 72 | 52% | $-1228.82 | -8.84% | $-1431.85 | 6 | $8851.21 |
| mm_strong | 57 | 26 | 46% | $-885.1 | -15.53% | $-1089.05 | 25 | $8627.1 |
| momentum | 215 | 143 | 67% | $-1364.82 | -6.35% | $-1853.06 | 25 | $8229.81 |
| whale_fade | 330 | 153 | 46% | $-3126.41 | -9.47% | $-3461.19 | 15 | $6539.18 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9327.75 |
| favorite (retired) | 128 | 87 | 68% | $-1081.82 | -8.45% | $-1145.75 | 8 | $9086.13 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 140 | 37 | 26% | $-1337.09 | -9.55% | $-3364.75 | 7 | $8041.6 |
| longshot (retired) | 77 | 2 | 3% | $-4291.55 | -55.73% | $-6191.55 | 7 | $5092.73 |

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
