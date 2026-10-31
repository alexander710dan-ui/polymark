# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78959 · Last run: 2026-10-31T00:16:15.930Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11562.1** | $1493.76 | $68.34 | 472 | 53% | $643.76 | 25 |
| maker_sports | **$11426.73** | $1293.83 | $132.9 | 54 | 65% | $1081.33 | 25 |
| mid_momentum | **$11348.25** | $744.31 | $603.94 | 277 | 56% | $530.83 | 25 |
| mm_tight | **$11124.92** | $1096.95 | $27.97 | 512 | 54% | $887.85 | 25 |
| mm_cheap | **$10880.18** | $465.16 | $415.02 | 102 | 57% | $282.7 | 25 |
| mm_max | **$10474.21** | $484.15 | $-9.94 | 224 | 54% | $275.05 | 3 |
| maker_flat | **$10301.94** | $-257.96 | $559.9 | 20 | 45% | $-449.51 | 25 |
| mid_momentum_v2 | **$10123.07** | $-480.87 | $603.94 | 112 | 51% | $-671.69 | 25 |
| mm_cheap_v2 | **$10030.54** | $-384.48 | $415.02 | 119 | 52% | $-575.3 | 25 |
| mm_sports | **$10029.12** | $27.47 | $1.65 | 608 | 55% | $-191.66 | 25 |
| mm_strong | **$9973.01** | $-367.39 | $340.4 | 158 | 54% | $-571.34 | 25 |
| fade_longshot | **$9919.84** | $21.44 | $-101.6 | 158 | 95% | $10.7 | 25 |
| copy_top | **$9786.84** | $-217.32 | $4.16 | 488 | 53% | $-1545.89 | 25 |
| conviction | **$9770.31** | $-204.69 | $-25 | 2 | 0% | $-102.55 | 1 |
| super | **$9750.28** | $-321.55 | $71.83 | 97 | 52% | $-603.45 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9121.41** | $-794.17 | $-84.42 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8976.73** | $-1297.59 | $274.32 | 114 | 50% | $-1483.3 | 25 |
| mm_sports_v2 | **$8799.81** | $-1201.84 | $1.65 | 177 | 51% | $-1420.97 | 25 |
| strong_dip | **$8627.1** | $-912.64 | $-460.26 | 151 | 59% | $-1004.95 | 25 |
| momentum | **$7373.85** | $-2441.58 | $-184.57 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6461.13** | $-3206.01 | $-332.86 | 489 | 46% | $-3657.47 | 25 |
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
