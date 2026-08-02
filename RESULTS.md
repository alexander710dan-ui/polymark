# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24633 · Last run: 2026-08-02T20:37:41.551Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10919.45** | $654.53 | $264.92 | 231 | 57% | $451.5 | 24 |
| mid_momentum | **$10511.41** | $630.98 | $-119.57 | 181 | 57% | $417.5 | 25 |
| copy_pro | **$10459.24** | $-592.45 | $1051.69 | 354 | 51% | $-1442.45 | 24 |
| copy_top | **$10371.05** | $111.62 | $259.43 | 371 | 52% | $-1216.95 | 23 |
| mm_cheap | **$10240.43** | $704.44 | $-464.01 | 21 | 71% | $526.66 | 25 |
| mm_tight | **$10234.02** | $156.54 | $77.48 | 199 | 54% | $-46.49 | 17 |
| strong_dip | **$9969.45** | $-393.8 | $363.25 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9955.09** | $117.48 | $-162.39 | 102 | 96% | $106.74 | 25 |
| super | **$9709.67** | $-245.84 | $-44.49 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9517.07** | $-644.28 | $161.35 | 61 | 51% | $-761.67 | 8 |
| ai_judge | **$9405.39** | $-487.64 | $-106.97 | 6 | 17% | $-500 | 3 |
| random_control | **$9222.68** | $-310.74 | $-466.58 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8914.53** | $-882.32 | $-203.15 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8628.67** | $-933.53 | $-437.8 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8236.77** | $-1139.53 | $-623.7 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$6946.86** | $-2290.43 | $-762.71 | 372 | 47% | $-2644.98 | 23 |
| copy_month (retired) | **$9380.53** | $-777.42 | $157.95 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9042.43** | $-1003.53 | $45.96 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8296.63** | $-1837.09 | $133.72 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5111.2** | $-4691.55 | $-197.25 | 81 | 2% | $-6591.55 | 3 |

**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.

**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

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
