# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79459 · Last run: 2026-11-11T04:34:10.492Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12678.77** | $2856.19 | $-177.42 | 281 | 59% | $2611.36 | 16 |
| copy_pro | **$12385.08** | $2469.41 | $-84.33 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12115.83** | $1744.56 | $371.27 | 192 | 57% | $1524.74 | 23 |
| mid_momentum | **$11743.62** | $1298.7 | $444.92 | 358 | 56% | $1078.88 | 25 |
| mm_tight | **$11638.51** | $1909.52 | $-271.01 | 708 | 54% | $1690.39 | 15 |
| mm_cheap_v2 | **$11266.19** | $894.92 | $371.27 | 209 | 55% | $675.1 | 23 |
| maker_flat | **$10652.51** | $637.84 | $14.67 | 95 | 52% | $443.72 | 15 |
| mid_momentum_v2 | **$10518.44** | $73.52 | $444.92 | 193 | 52% | $-146.3 | 25 |
| mm_max | **$10263.29** | $263.29 | $0 | 293 | 54% | $54.19 | 0 |
| mm_sports | **$9982.31** | $221.33 | $-239.02 | 844 | 55% | $2.2 | 18 |
| fade_longshot | **$9927.07** | $-95.44 | $22.51 | 219 | 95% | $-106.18 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9515** | $-502.44 | $17.44 | 261 | 53% | $-721.57 | 22 |
| mm_slow | **$9414.79** | $-454.77 | $-130.44 | 177 | 52% | $-673.9 | 15 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8802.24** | $-1038.01 | $-159.75 | 230 | 58% | $-1131.64 | 16 |
| mm_sports_v2 | **$8753** | $-1007.98 | $-239.02 | 413 | 53% | $-1227.11 | 18 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.29** | $-1470.79 | $-151.92 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7680.68** | $-2277.11 | $-42.21 | 236 | 54% | $-2891.4 | 25 |
| momentum | **$7507.82** | $-2656.88 | $164.7 | 349 | 66% | $-3145.12 | 25 |
| whale_fade | **$6008.58** | $-4244.08 | $252.66 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 110 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 297 | 1 | 1 | 100% | 1.31¢ |

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
