# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22842 · Last run: 2026-08-02T05:25:50.903Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10510** | $443.38 | $66.62 | 204 | 57% | $240.35 | 5 |
| mid_momentum | **$10468.66** | $630.98 | $-162.32 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10362.48** | $271.44 | $91.04 | 176 | 55% | $68.41 | 4 |
| copy_top | **$10181.39** | $33.14 | $148.25 | 366 | 52% | $-1295.43 | 14 |
| mm_cheap | **$10117.48** | $704.44 | $-586.96 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10072.08** | $-406.82 | $478.9 | 349 | 51% | $-1256.82 | 15 |
| strong_dip | **$9946.87** | $-393.8 | $340.67 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9939.37** | $117.48 | $-178.11 | 102 | 96% | $106.74 | 25 |
| super | **$9786.63** | $-344.42 | $131.05 | 60 | 45% | $-560.27 | 11 |
| ai_judge | **$9393.9** | $-487.64 | $-118.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.95** | $-660.83 | $-1.22 | 58 | 50% | $-778.22 | 1 |
| random_control | **$8954.71** | $-565.29 | $-480 | 122 | 58% | $-1179.58 | 25 |
| mm_slow | **$8940.45** | $-882.32 | $-177.23 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8618.57** | $-933.53 | $-447.9 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8219.3** | $-1139.53 | $-641.17 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7211.47** | $-2453.31 | $-335.22 | 367 | 47% | $-2788.09 | 14 |
| copy_month (retired) | **$9395.88** | $-777.42 | $173.3 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.05** | $-1003.53 | $36.58 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8329.83** | $-1837.09 | $166.92 | 145 | 26% | $-3864.75 | 2 |
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
