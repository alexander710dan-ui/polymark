# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83163 · Last run: 2026-11-13T03:03:24.725Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12591.71** | $2478.6 | $113.11 | 396 | 57% | $2233.77 | 13 |
| copy_pro | **$12384.54** | $2469.41 | $-84.87 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11807.97** | $1576.68 | $231.29 | 815 | 54% | $1357.55 | 8 |
| mm_cheap | **$11097.21** | $959.65 | $137.56 | 248 | 54% | $739.83 | 24 |
| maker_flat | **$11085.93** | $1007.19 | $78.74 | 128 | 52% | $813.07 | 19 |
| mid_momentum | **$10947.54** | $834.97 | $112.57 | 397 | 55% | $615.15 | 24 |
| mm_max | **$10876.66** | $822.83 | $53.83 | 323 | 55% | $613.73 | 3 |
| mm_cheap_v2 | **$10247.57** | $110.01 | $137.56 | 265 | 52% | $-109.81 | 24 |
| fade_longshot | **$9872.64** | $-140.38 | $13.02 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9722.36** | $-390.21 | $112.57 | 232 | 51% | $-610.03 | 24 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9185.77** | $-528.18 | $-286.05 | 210 | 52% | $-747.31 | 25 |
| mm_sports | **$9185.05** | $-896.91 | $81.96 | 967 | 54% | $-1116.04 | 13 |
| strong_dip | **$8694.4** | $-1401.61 | $96.01 | 269 | 58% | $-1495.24 | 21 |
| mm_strong | **$8664.23** | $-1358.42 | $22.65 | 327 | 52% | $-1577.55 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.42** | $-1470.79 | $-154.79 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7955.74** | $-2126.22 | $81.96 | 536 | 52% | $-2345.35 | 13 |
| random_control | **$7588.93** | $-2331.47 | $-79.6 | 243 | 54% | $-2945.76 | 25 |
| momentum | **$7338.73** | $-2812.36 | $151.09 | 378 | 65% | $-3300.6 | 25 |
| whale_fade | **$5977.25** | $-4244.08 | $221.33 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 147 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 409 | 2 | 0 | 100% | 1.39¢ |

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
