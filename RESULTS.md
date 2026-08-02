# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23681 · Last run: 2026-08-02T12:26:16.499Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10884.46** | $558.65 | $325.81 | 206 | 58% | $355.62 | 21 |
| mm_tight | **$10610.1** | $410.38 | $199.72 | 178 | 55% | $207.35 | 16 |
| mid_momentum | **$10401.77** | $630.98 | $-229.21 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10213.21** | $33.14 | $180.07 | 366 | 52% | $-1295.43 | 19 |
| mm_cheap | **$10084.11** | $704.44 | $-620.33 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10080.13** | $-406.82 | $486.95 | 349 | 51% | $-1256.82 | 25 |
| strong_dip | **$10005.28** | $-393.8 | $399.08 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9958.33** | $117.48 | $-159.15 | 102 | 96% | $106.74 | 25 |
| super | **$9706.18** | $-245.84 | $-47.98 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9407.27** | $-487.64 | $-105.09 | 6 | 17% | $-500 | 3 |
| mm_max | **$9369.35** | $-660.83 | $30.18 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9115.56** | $-665.29 | $-219.15 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8866.17** | $-882.32 | $-251.51 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8567.23** | $-933.53 | $-499.24 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8211.37** | $-1139.53 | $-649.1 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7267.42** | $-2453.31 | $-279.27 | 367 | 47% | $-2788.09 | 19 |
| copy_month (retired) | **$9384.55** | $-777.42 | $161.97 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.66** | $-1003.53 | $45.19 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8293.55** | $-1837.09 | $130.64 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5096.95** | $-4691.55 | $-211.5 | 81 | 2% | $-6591.55 | 3 |

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
