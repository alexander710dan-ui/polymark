# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21711 · Last run: 2026-08-01T19:59:49.971Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10416.79** | $383.13 | $33.66 | 175 | 57% | $169.65 | 25 |
| copy_top | **$10367.69** | $438.97 | $-71.28 | 343 | 53% | $-889.6 | 16 |
| copy_pro | **$10346.29** | $404.07 | $-57.78 | 323 | 52% | $-445.93 | 24 |
| mm_cheap | **$10075.04** | $-127.59 | $202.63 | 3 | 33% | $-200 | 25 |
| fade_longshot | **$10026.23** | $117.48 | $-91.25 | 102 | 96% | $106.74 | 25 |
| mm_tight | **$9883.27** | $-355.3 | $238.57 | 142 | 54% | $-558.33 | 16 |
| strong_dip | **$9729** | $-271.26 | $0.26 | 90 | 60% | $-363.57 | 24 |
| mm_sports | **$9576.47** | $-656.71 | $233.18 | 164 | 55% | $-859.74 | 20 |
| ai_judge | **$9463.21** | $-487.64 | $-49.15 | 6 | 17% | $-500 | 3 |
| random_control | **$9400.79** | $-155.79 | $-443.42 | 111 | 60% | $-770.08 | 25 |
| mm_max | **$9249.11** | $-839.48 | $88.59 | 46 | 46% | $-956.87 | 1 |
| super | **$9156.61** | $-649.65 | $-193.74 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9018.85** | $-1029.17 | $48.02 | 42 | 45% | $-1151.39 | 25 |
| momentum | **$8740.66** | $-1200.92 | $-58.42 | 223 | 67% | $-1689.16 | 25 |
| mm_strong | **$8703.4** | $-871.46 | $-425.14 | 58 | 47% | $-1075.41 | 25 |
| whale_fade | **$6923.28** | $-2977.42 | $-99.3 | 344 | 47% | $-3312.2 | 16 |
| copy_month (retired) | **$9284.33** | $-777.42 | $61.75 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9087.1** | $-1003.53 | $90.63 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8037.27** | $-1837.09 | $-125.64 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5074.03** | $-4691.55 | $-234.42 | 81 | 2% | $-6591.55 | 3 |

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
