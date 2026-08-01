# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21839 · Last run: 2026-08-01T21:03:50.656Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_top | **$10460.71** | $338.97 | $121.74 | 344 | 53% | $-989.6 | 15 |
| mid_momentum | **$10438.56** | $383.13 | $55.43 | 175 | 57% | $169.65 | 25 |
| mm_cheap | **$10143.13** | $-127.59 | $270.72 | 3 | 33% | $-200 | 25 |
| copy_pro | **$10038.24** | $204.07 | $-165.83 | 325 | 52% | $-645.93 | 25 |
| fade_longshot | **$10035.05** | $117.48 | $-82.43 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9758.75** | $-271.26 | $30.01 | 90 | 60% | $-363.57 | 25 |
| mm_tight | **$9638.99** | $-355.3 | $-5.71 | 142 | 54% | $-558.33 | 21 |
| ai_judge | **$9464.96** | $-487.64 | $-47.4 | 6 | 17% | $-500 | 3 |
| random_control | **$9290.58** | $-140.85 | $-568.57 | 112 | 61% | $-755.14 | 25 |
| mm_max | **$9290.02** | $-839.48 | $129.5 | 46 | 46% | $-956.87 | 2 |
| mm_sports | **$9191.59** | $-656.71 | $-151.7 | 164 | 55% | $-859.74 | 25 |
| super | **$9147.22** | $-649.65 | $-203.13 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9029.01** | $-1029.17 | $58.18 | 42 | 45% | $-1151.39 | 25 |
| momentum | **$8735.2** | $-1189.81 | $-74.99 | 224 | 67% | $-1678.05 | 25 |
| mm_strong | **$8665.31** | $-871.46 | $-463.23 | 58 | 47% | $-1075.41 | 25 |
| whale_fade | **$6794.07** | $-2888.74 | $-317.19 | 345 | 47% | $-3223.52 | 15 |
| copy_month (retired) | **$9282.07** | $-777.42 | $59.49 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9090.01** | $-1003.53 | $93.54 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8023.04** | $-1837.09 | $-139.87 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5075.07** | $-4691.55 | $-233.38 | 81 | 2% | $-6591.55 | 3 |

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
