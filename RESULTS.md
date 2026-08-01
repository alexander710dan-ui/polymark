# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21620 · Last run: 2026-08-01T19:13:42.042Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10415.62** | $274.8 | $140.82 | 174 | 56% | $61.32 | 25 |
| copy_top | **$10403.59** | $438.97 | $-35.38 | 343 | 53% | $-889.6 | 16 |
| copy_pro | **$10278.03** | $572.38 | $-294.35 | 320 | 52% | $-277.62 | 25 |
| mm_cheap | **$10167.72** | $-27.59 | $195.31 | 2 | 50% | $-100 | 25 |
| fade_longshot | **$10031.27** | $117.48 | $-86.21 | 102 | 96% | $106.74 | 25 |
| mm_tight | **$10026.99** | $-255.3 | $282.29 | 141 | 54% | $-458.33 | 14 |
| strong_dip | **$9789.05** | $-171.26 | $-39.69 | 89 | 61% | $-263.57 | 24 |
| mm_sports | **$9759.78** | $-556.71 | $316.49 | 163 | 55% | $-759.74 | 18 |
| ai_judge | **$9466.55** | $-487.64 | $-45.81 | 6 | 17% | $-500 | 3 |
| random_control | **$9382.47** | $-190.93 | $-426.6 | 110 | 60% | $-805.22 | 25 |
| mm_max | **$9249.11** | $-839.48 | $88.59 | 46 | 46% | $-956.87 | 1 |
| super | **$9148.7** | $-649.65 | $-201.65 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9026.1** | $-1029.17 | $55.27 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8786.5** | $-871.46 | $-342.04 | 58 | 47% | $-1075.41 | 25 |
| momentum | **$8775.21** | $-1209.62 | $-15.17 | 222 | 67% | $-1697.86 | 25 |
| whale_fade | **$6889.07** | $-2977.42 | $-133.51 | 344 | 47% | $-3312.2 | 16 |
| copy_month (retired) | **$9285.72** | $-777.42 | $63.14 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9089.46** | $-1003.53 | $92.99 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8027.27** | $-1837.09 | $-135.64 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5078.2** | $-4691.55 | $-230.25 | 81 | 2% | $-6591.55 | 3 |

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
