# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80912 · Last run: 2026-11-11T22:10:47.476Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12805.51** | $3073.06 | $-267.55 | 335 | 58% | $2828.23 | 23 |
| mm_tight | **$12430.78** | $2436.46 | $-5.68 | 754 | 55% | $2217.33 | 15 |
| copy_pro | **$12385.04** | $2469.41 | $-84.37 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12135.62** | $1897.01 | $238.61 | 210 | 57% | $1677.19 | 25 |
| mid_momentum | **$11678.04** | $1349.9 | $328.14 | 369 | 56% | $1130.08 | 25 |
| mm_cheap_v2 | **$11285.98** | $1047.37 | $238.61 | 227 | 55% | $827.55 | 25 |
| mm_max | **$10744.34** | $697.85 | $46.49 | 302 | 55% | $488.75 | 1 |
| maker_flat | **$10717.5** | $695.25 | $22.25 | 107 | 51% | $501.13 | 16 |
| mid_momentum_v2 | **$10452.86** | $124.72 | $328.14 | 204 | 52% | $-95.1 | 25 |
| mm_sports | **$10118.04** | $439.56 | $-321.52 | 900 | 55% | $220.43 | 23 |
| fade_longshot | **$9860.88** | $-151.76 | $12.64 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9735.29** | $-28.42 | $-236.29 | 187 | 53% | $-247.55 | 22 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9410.79** | $-601.21 | $12 | 287 | 53% | $-820.34 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8888.73** | $-789.75 | $-321.52 | 469 | 53% | $-1008.88 | 23 |
| strong_dip | **$8619.77** | $-1473.07 | $92.84 | 249 | 57% | $-1566.7 | 21 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.8** | $-1470.79 | $-151.41 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7561.23** | $-2427.27 | $-11.5 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7430.49** | $-2583.83 | $14.32 | 363 | 66% | $-3072.07 | 25 |
| whale_fade | **$5981.28** | $-4244.08 | $225.36 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 123 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 358 | 1 | 0 | 100% | 1.39¢ |

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
