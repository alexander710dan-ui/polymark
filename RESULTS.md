# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 20796 · Last run: 2026-08-01T12:20:58.308Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 314 | 164 | 52% | $757.67 | 1.55% | $-92.33 | 17 | $10934.05 |
| copy_top | 339 | 179 | 53% | $543.83 | 1.6% | $-784.74 | 9 | $10580.49 |
| mid_momentum | 171 | 95 | 56% | $-3.8 | -0.02% | $-217.28 | 25 | $10095.76 |
| strong_dip | 83 | 51 | 61% | $-240.17 | -2.89% | $-332.48 | 25 | $10094.95 |
| fade_longshot | 99 | 95 | 96% | $107.93 | 1.09% | $97.19 | 25 | $10028.06 |
| mm_tight | 124 | 64 | 52% | $-651.01 | -5.25% | $-854.04 | 12 | $9759.27 |
| ai_judge | 6 | 1 | 17% | $-487.64 | -81.27% | $-500 | 3 | $9467.27 |
| mm_sports | 142 | 74 | 52% | $-1132.74 | -7.98% | $-1335.77 | 15 | $9443.58 |
| random_control | 103 | 60 | 58% | $-223.21 | -2.17% | $-837.5 | 25 | $9384.22 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9184.67 |
| mm_max | 46 | 21 | 46% | $-839.48 | -18.25% | $-956.87 | 1 | $9150.14 |
| mm_slow | 42 | 19 | 45% | $-1029.17 | -24.5% | $-1151.39 | 25 | $8838.03 |
| mm_strong | 57 | 26 | 46% | $-885.1 | -15.53% | $-1089.05 | 25 | $8617.2 |
| momentum | 219 | 146 | 67% | $-1397.09 | -6.38% | $-1885.33 | 25 | $8428.36 |
| whale_fade | 340 | 158 | 46% | $-3056.02 | -8.99% | $-3390.8 | 9 | $6824.23 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9326.07 |
| favorite (retired) | 131 | 90 | 69% | $-1003.53 | -7.66% | $-1067.46 | 5 | $9090.13 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 145 | 37 | 26% | $-1837.09 | -12.67% | $-3864.75 | 2 | $8023.81 |
| longshot (retired) | 81 | 2 | 2% | $-4691.55 | -57.92% | $-6591.55 | 3 | $5093.66 |

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
