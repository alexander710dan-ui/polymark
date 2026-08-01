# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 20035 · Last run: 2026-08-01T05:59:54.555Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 306 | 159 | 52% | $756.24 | 1.58% | $-93.76 | 18 | $10867.79 |
| copy_top | 328 | 173 | 53% | $663.85 | 2.02% | $-664.72 | 16 | $10798 |
| fade_longshot | 93 | 89 | 96% | $63.69 | 0.68% | $52.95 | 25 | $10008.31 |
| strong_dip | 81 | 49 | 60% | $-337.27 | -4.16% | $-429.58 | 21 | $9997.22 |
| mid_momentum | 169 | 95 | 56% | $196.2 | 1.16% | $-17.28 | 25 | $9895.26 |
| ai_judge | 5 | 0 | 0% | $-500 | -100% | $-400 | 4 | $9461.51 |
| random_control | 96 | 54 | 56% | $-248.47 | -2.59% | $-862.76 | 25 | $9436.39 |
| mm_tight | 121 | 62 | 51% | $-747.09 | -6.17% | $-950.12 | 5 | $9336.65 |
| mm_max | 45 | 21 | 47% | $-739.48 | -16.43% | $-856.87 | 1 | $9263.35 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9141.32 |
| mm_slow | 42 | 19 | 45% | $-1029.17 | -24.5% | $-1151.39 | 25 | $8887.02 |
| mm_sports | 139 | 72 | 52% | $-1228.82 | -8.84% | $-1431.85 | 6 | $8857.1 |
| mm_strong | 57 | 26 | 46% | $-885.1 | -15.53% | $-1089.05 | 25 | $8633.57 |
| momentum | 213 | 143 | 67% | $-1164.82 | -5.47% | $-1653.06 | 25 | $8238.97 |
| whale_fade | 329 | 153 | 47% | $-3026.41 | -9.2% | $-3361.19 | 16 | $6556.72 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9327.68 |
| favorite (retired) | 126 | 85 | 67% | $-1120.76 | -8.89% | $-1184.69 | 10 | $9086.39 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 138 | 36 | 26% | $-1265.3 | -9.17% | $-3292.96 | 9 | $8038.5 |
| longshot (retired) | 76 | 2 | 3% | $-4191.55 | -55.15% | $-6091.55 | 8 | $5093.23 |

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
