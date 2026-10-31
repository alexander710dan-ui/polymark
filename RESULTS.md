# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79019 · Last run: 2026-10-31T00:31:17.470Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11625.02** | $1493.76 | $131.26 | 472 | 53% | $643.76 | 25 |
| maker_sports | **$11395.12** | $1352.56 | $42.56 | 55 | 65% | $1140.06 | 24 |
| mid_momentum | **$11335.02** | $744.31 | $590.71 | 277 | 56% | $530.83 | 25 |
| mm_tight | **$11081.15** | $1151.4 | $-70.25 | 513 | 54% | $942.3 | 24 |
| mm_cheap | **$10866.21** | $465.16 | $401.05 | 102 | 57% | $282.7 | 25 |
| mm_max | **$10428.93** | $533.97 | $-105.04 | 225 | 55% | $324.87 | 2 |
| maker_flat | **$10336.76** | $-257.96 | $594.72 | 20 | 45% | $-449.51 | 25 |
| mid_momentum_v2 | **$10109.84** | $-480.87 | $590.71 | 112 | 51% | $-671.69 | 25 |
| mm_cheap_v2 | **$10016.57** | $-384.48 | $401.05 | 119 | 52% | $-575.3 | 25 |
| mm_sports | **$9986.25** | $27.47 | $-41.22 | 608 | 55% | $-191.66 | 25 |
| mm_strong | **$9960.68** | $-367.39 | $328.07 | 158 | 54% | $-571.34 | 25 |
| fade_longshot | **$9917.97** | $21.44 | $-103.47 | 158 | 95% | $10.7 | 25 |
| conviction | **$9749.94** | $-204.69 | $-45.37 | 2 | 0% | $-102.55 | 1 |
| copy_top | **$9647.24** | $-217.32 | $-135.44 | 488 | 53% | $-1545.89 | 25 |
| super | **$9599.38** | $-321.55 | $-79.07 | 97 | 52% | $-603.45 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9121.31** | $-794.17 | $-84.52 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8977.09** | $-1297.59 | $274.68 | 114 | 50% | $-1483.3 | 25 |
| mm_sports_v2 | **$8756.94** | $-1201.84 | $-41.22 | 177 | 51% | $-1420.97 | 25 |
| strong_dip | **$8546.57** | $-912.64 | $-540.79 | 151 | 59% | $-1004.95 | 25 |
| momentum | **$7356.45** | $-2441.58 | $-201.97 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6568.01** | $-3206.01 | $-225.98 | 489 | 46% | $-3657.47 | 25 |
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
