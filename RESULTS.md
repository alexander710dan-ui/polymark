# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22538 · Last run: 2026-08-02T02:53:49.249Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10490.49** | $658.57 | $-168.08 | 179 | 58% | $445.09 | 25 |
| copy_top | **$10328.27** | $209.68 | $118.59 | 358 | 53% | $-1118.89 | 14 |
| mm_sports | **$10311.79** | $343.29 | $-31.5 | 189 | 57% | $140.26 | 17 |
| copy_pro | **$10268.07** | $-289.08 | $557.15 | 340 | 51% | $-1139.08 | 21 |
| mm_tight | **$9990.49** | $302.36 | $-311.87 | 164 | 55% | $99.33 | 14 |
| mm_cheap | **$9960.12** | $522.9 | $-562.78 | 14 | 71% | $345.12 | 25 |
| strong_dip | **$9954.71** | $-393.8 | $348.51 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9946.92** | $117.48 | $-170.56 | 102 | 96% | $106.74 | 25 |
| super | **$9640.07** | $-472.29 | $112.36 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9404.28** | $-487.64 | $-108.08 | 6 | 17% | $-500 | 3 |
| random_control | **$9146.17** | $-523.46 | $-330.37 | 118 | 58% | $-1137.75 | 25 |
| mm_max | **$9115.22** | $-705.34 | $-179.44 | 52 | 48% | $-822.73 | 6 |
| mm_slow | **$8976.52** | $-851.81 | $-171.67 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8548.75** | $-982.78 | $-468.47 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8212.03** | $-1173.23 | $-614.74 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7009.21** | $-2790.83 | $-199.96 | 359 | 47% | $-3125.61 | 14 |
| copy_month (retired) | **$9397.2** | $-777.42 | $174.62 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9037.67** | $-1003.53 | $41.2 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8299.96** | $-1837.09 | $137.05 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5082.37** | $-4691.55 | $-226.08 | 81 | 2% | $-6591.55 | 3 |

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
