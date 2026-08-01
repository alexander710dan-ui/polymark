# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22032 · Last run: 2026-08-01T22:40:15.991Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_top | **$10508.34** | $238.97 | $269.37 | 345 | 52% | $-1089.6 | 19 |
| mid_momentum | **$10412.84** | $564.45 | $-151.61 | 177 | 57% | $350.97 | 25 |
| copy_pro | **$10335.67** | $130.16 | $205.51 | 329 | 52% | $-719.84 | 24 |
| fade_longshot | **$10030.71** | $117.48 | $-86.77 | 102 | 96% | $106.74 | 25 |
| mm_cheap | **$9973.86** | $74.44 | $-100.58 | 5 | 60% | $-63.66 | 25 |
| strong_dip | **$9827.49** | $-471.26 | $298.75 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9524.78** | $-216.62 | $-258.6 | 147 | 54% | $-419.65 | 21 |
| ai_judge | **$9454.96** | $-487.64 | $-57.4 | 6 | 17% | $-500 | 3 |
| mm_max | **$9316.2** | $-750.8 | $67 | 47 | 47% | $-868.19 | 2 |
| mm_sports | **$9252.47** | $-454.1 | $-293.43 | 170 | 55% | $-657.13 | 25 |
| super | **$9225.63** | $-649.65 | $-124.72 | 58 | 43% | $-865.5 | 13 |
| random_control | **$9118.79** | $-340.85 | $-540.36 | 114 | 60% | $-955.14 | 25 |
| mm_slow | **$8993.11** | $-940.49 | $-66.4 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8587.94** | $-782.78 | $-629.28 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8557.12** | $-1079.56 | $-363.32 | 226 | 68% | $-1567.8 | 25 |
| whale_fade | **$6733.72** | $-2819.25 | $-447.03 | 346 | 47% | $-3154.03 | 19 |
| copy_month (retired) | **$9320.96** | $-777.42 | $98.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9085.32** | $-1003.53 | $88.85 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8053.04** | $-1837.09 | $-109.87 | 145 | 26% | $-3864.75 | 2 |
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
