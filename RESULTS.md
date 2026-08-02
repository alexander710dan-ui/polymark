# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23643 · Last run: 2026-08-02T12:06:57.736Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10864.75** | $515.79 | $348.96 | 205 | 58% | $312.76 | 21 |
| mm_tight | **$10554.25** | $367.52 | $186.73 | 177 | 55% | $164.49 | 16 |
| mid_momentum | **$10401.19** | $630.98 | $-229.79 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10198.72** | $33.14 | $165.58 | 366 | 52% | $-1295.43 | 19 |
| copy_pro | **$10107.49** | $-406.82 | $514.31 | 349 | 51% | $-1256.82 | 25 |
| mm_cheap | **$10088.43** | $704.44 | $-616.01 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$10000.03** | $-393.8 | $393.83 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9954.94** | $117.48 | $-162.54 | 102 | 96% | $106.74 | 25 |
| super | **$9714.38** | $-245.84 | $-39.78 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9406.5** | $-487.64 | $-105.86 | 6 | 17% | $-500 | 3 |
| mm_max | **$9325.45** | $-660.83 | $-13.72 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9055.51** | $-665.29 | $-279.2 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8861.02** | $-882.32 | $-256.66 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8560.12** | $-933.53 | $-506.35 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8211.11** | $-1139.53 | $-649.36 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7253.05** | $-2453.31 | $-293.64 | 367 | 47% | $-2788.09 | 19 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.23** | $-1003.53 | $44.76 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8293.3** | $-1837.09 | $130.39 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5102.16** | $-4691.55 | $-206.29 | 81 | 2% | $-6591.55 | 3 |

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
