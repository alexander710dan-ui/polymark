# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78780 · Last run: 2026-11-10T20:28:25.595Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.13** | $2469.41 | $-84.28 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12138.04** | $2116.15 | $21.89 | 255 | 58% | $1871.32 | 13 |
| mm_cheap | **$11890.36** | $1483.89 | $406.47 | 173 | 56% | $1264.07 | 25 |
| mid_momentum | **$11618.19** | $1114.44 | $503.75 | 345 | 55% | $894.62 | 25 |
| mm_tight | **$11470.21** | $1591.22 | $-121.01 | 688 | 54% | $1372.09 | 10 |
| mm_cheap_v2 | **$11040.72** | $634.25 | $406.47 | 190 | 53% | $414.43 | 25 |
| maker_flat | **$11018.52** | $771.2 | $247.32 | 86 | 52% | $577.08 | 17 |
| mid_momentum_v2 | **$10393.01** | $-110.74 | $503.75 | 180 | 51% | $-330.56 | 25 |
| mm_max | **$10222.49** | $437.3 | $-214.81 | 284 | 54% | $228.2 | 3 |
| fade_longshot | **$9959.57** | $-21.96 | $-18.47 | 214 | 95% | $-32.7 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9572.89** | $-396.51 | $-30.6 | 818 | 54% | $-615.64 | 14 |
| mm_strong | **$9464.62** | $-755.29 | $219.91 | 244 | 52% | $-974.42 | 25 |
| mm_slow | **$9374.45** | $-368.13 | $-257.42 | 166 | 52% | $-587.26 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9101.77** | $-1012.64 | $114.41 | 223 | 58% | $-1106.27 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.26** | $-1470.79 | $-150.95 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8343.58** | $-1625.82 | $-30.6 | 387 | 52% | $-1844.95 | 14 |
| random_control | **$7646.09** | $-2262.84 | $-91.07 | 229 | 54% | $-2877.13 | 25 |
| momentum | **$7310.05** | $-2615.13 | $-74.82 | 343 | 66% | $-3103.37 | 25 |
| whale_fade | **$6011.18** | $-4244.08 | $255.26 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 103 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 268 | 1 | 1 | 100% | 1.33¢ |

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
