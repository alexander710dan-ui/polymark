# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79148 · Last run: 2026-10-31T01:03:28.791Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11684.85** | $1352.56 | $332.29 | 55 | 65% | $1140.06 | 24 |
| copy_pro | **$11611.39** | $1493.76 | $117.63 | 472 | 53% | $643.76 | 25 |
| mid_momentum | **$11448.81** | $744.31 | $704.5 | 277 | 56% | $530.83 | 25 |
| mm_tight | **$11261.19** | $1151.4 | $109.79 | 513 | 54% | $942.3 | 24 |
| mm_cheap | **$10979.94** | $465.16 | $514.78 | 102 | 57% | $282.7 | 25 |
| mm_max | **$10430.75** | $432.17 | $-1.42 | 226 | 54% | $223.07 | 1 |
| maker_flat | **$10320.72** | $-145.19 | $465.91 | 21 | 48% | $-336.74 | 24 |
| mm_sports | **$10229.26** | $27.47 | $201.79 | 608 | 55% | $-191.66 | 25 |
| mid_momentum_v2 | **$10223.63** | $-480.87 | $704.5 | 112 | 51% | $-671.69 | 25 |
| mm_cheap_v2 | **$10130.3** | $-384.48 | $514.78 | 119 | 52% | $-575.3 | 25 |
| mm_strong | **$10036.86** | $-367.39 | $404.25 | 158 | 54% | $-571.34 | 25 |
| fade_longshot | **$9919.09** | $21.44 | $-102.35 | 158 | 95% | $10.7 | 25 |
| conviction | **$9742.53** | $-204.69 | $-52.78 | 2 | 0% | $-102.55 | 1 |
| copy_top | **$9562.61** | $-217.32 | $-220.07 | 488 | 53% | $-1545.89 | 25 |
| super | **$9509.94** | $-321.55 | $-168.51 | 97 | 52% | $-603.45 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9130.69** | $-794.17 | $-75.14 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$8999.95** | $-1201.84 | $201.79 | 177 | 51% | $-1420.97 | 25 |
| mm_slow | **$8968.17** | $-1297.59 | $265.76 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8458.82** | $-912.64 | $-628.54 | 151 | 59% | $-1004.95 | 25 |
| momentum | **$7347.96** | $-2441.58 | $-210.46 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6638** | $-3206.01 | $-155.99 | 489 | 46% | $-3657.47 | 25 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 45 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 79 | 1 | 0 | 99% | 1.41¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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
