# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78645 · Last run: 2026-11-10T18:48:52.154Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.48** | $2469.41 | $-83.93 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12116.15** | $2116.15 | $0 | 255 | 58% | $1871.32 | 0 |
| mm_cheap | **$11902.27** | $1483.89 | $418.38 | 173 | 56% | $1264.07 | 16 |
| mid_momentum | **$11645.33** | $1114.44 | $530.89 | 345 | 55% | $894.62 | 18 |
| mm_tight | **$11591.22** | $1591.22 | $0.01 | 688 | 54% | $1372.09 | 3 |
| mm_cheap_v2 | **$11052.63** | $634.25 | $418.38 | 190 | 53% | $414.43 | 16 |
| maker_flat | **$10887.68** | $771.2 | $116.48 | 86 | 52% | $577.08 | 11 |
| mm_max | **$10437.3** | $437.3 | $0 | 284 | 54% | $228.2 | 1 |
| mid_momentum_v2 | **$10420.15** | $-110.74 | $530.89 | 180 | 51% | $-330.56 | 18 |
| fade_longshot | **$9982.43** | $-29.87 | $12.3 | 212 | 95% | $-40.61 | 11 |
| mm_sports | **$9603.5** | $-396.51 | $0.01 | 818 | 54% | $-615.64 | 5 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9559.4** | $-368.13 | $-72.47 | 166 | 52% | $-587.26 | 15 |
| mm_strong | **$9503.83** | $-755.29 | $259.12 | 244 | 52% | $-974.42 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8956.68** | $-1012.64 | $-30.68 | 223 | 58% | $-1106.27 | 13 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.55** | $-1470.79 | $-150.66 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8374.19** | $-1625.82 | $0.01 | 387 | 52% | $-1844.95 | 5 |
| random_control | **$7707.38** | $-2262.84 | $-29.78 | 229 | 54% | $-2877.13 | 16 |
| momentum | **$7504.24** | $-2615.13 | $119.37 | 343 | 66% | $-3103.37 | 19 |
| whale_fade | **$6001.42** | $-4244.08 | $245.5 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 97 | 0 | 1 | 100% | 2.61¢ |
| maker_sports | 255 | 1 | 5 | 100% | 1.29¢ |

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
