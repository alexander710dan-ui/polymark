# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23298 · Last run: 2026-08-02T09:14:24.355Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10538.63** | $630.98 | $-92.35 | 181 | 57% | $417.5 | 25 |
| mm_sports | **$10425.14** | $515.79 | $-90.65 | 205 | 58% | $312.76 | 10 |
| mm_tight | **$10255.9** | $367.52 | $-111.62 | 177 | 55% | $164.49 | 9 |
| copy_top | **$10231.28** | $33.14 | $198.14 | 366 | 52% | $-1295.43 | 18 |
| mm_cheap | **$10200.7** | $704.44 | $-503.74 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$9946.49** | $-406.82 | $353.31 | 349 | 51% | $-1256.82 | 25 |
| fade_longshot | **$9922.28** | $117.48 | $-195.2 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9905.24** | $-393.8 | $299.04 | 94 | 60% | $-486.11 | 25 |
| super | **$9799.83** | $-245.84 | $45.67 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9405.56** | $-487.64 | $-106.8 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.95** | $-660.83 | $-1.22 | 58 | 50% | $-778.22 | 1 |
| random_control | **$8960.07** | $-665.29 | $-374.64 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8873.92** | $-882.32 | $-243.76 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8578.89** | $-933.53 | $-487.58 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8164.59** | $-1139.53 | $-695.88 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7186.32** | $-2453.31 | $-360.37 | 367 | 47% | $-2788.09 | 18 |
| copy_month (retired) | **$9404.29** | $-777.42 | $181.71 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.29** | $-1003.53 | $33.82 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8339.71** | $-1837.09 | $176.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |

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
