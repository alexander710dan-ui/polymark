# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23246 · Last run: 2026-08-02T08:48:17.557Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10544.23** | $630.98 | $-86.75 | 181 | 57% | $417.5 | 25 |
| mm_sports | **$10465.53** | $515.79 | $-50.26 | 205 | 58% | $312.76 | 9 |
| mm_tight | **$10298.71** | $367.52 | $-68.81 | 177 | 55% | $164.49 | 8 |
| copy_top | **$10231.57** | $33.14 | $198.43 | 366 | 52% | $-1295.43 | 18 |
| mm_cheap | **$10192.5** | $704.44 | $-511.94 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$9949.14** | $-406.82 | $355.96 | 349 | 51% | $-1256.82 | 25 |
| fade_longshot | **$9920.48** | $117.48 | $-197 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9905.57** | $-393.8 | $299.37 | 94 | 60% | $-486.11 | 25 |
| super | **$9821.16** | $-245.84 | $67 | 62 | 47% | $-461.69 | 10 |
| ai_judge | **$9404.45** | $-487.64 | $-107.91 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.95** | $-660.83 | $-1.22 | 58 | 50% | $-778.22 | 1 |
| random_control | **$8958.31** | $-665.29 | $-376.4 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8879.47** | $-882.32 | $-238.21 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8585.92** | $-933.53 | $-480.55 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8159.14** | $-1139.53 | $-701.33 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7153.6** | $-2453.31 | $-393.09 | 367 | 47% | $-2788.09 | 18 |
| copy_month (retired) | **$9407.07** | $-777.42 | $184.49 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.7** | $-1003.53 | $33.23 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8343.04** | $-1837.09 | $180.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.32** | $-4691.55 | $-204.13 | 81 | 2% | $-6591.55 | 3 |

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
