# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 75830 · Last run: 2026-10-30T11:45:04.247Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11746.41** | $1596.68 | $149.73 | 465 | 53% | $746.68 | 25 |
| maker_sports | **$11247.18** | $1177.21 | $69.97 | 42 | 67% | $964.71 | 12 |
| mm_tight | **$11033.12** | $1032.36 | $0.76 | 503 | 54% | $823.26 | 10 |
| mid_momentum | **$11002.45** | $766.55 | $235.9 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10483.35** | $417.19 | $66.16 | 98 | 57% | $234.73 | 25 |
| mm_max | **$10371.71** | $267.26 | $104.45 | 217 | 54% | $58.16 | 5 |
| copy_top | **$10185.15** | $110.07 | $75.08 | 481 | 53% | $-1218.5 | 23 |
| fade_longshot | **$10095.75** | $93.52 | $2.23 | 153 | 95% | $82.78 | 25 |
| mm_sports | **$10049.67** | $116.96 | $-67.29 | 596 | 55% | $-102.17 | 13 |
| super | **$9948.32** | $-117.27 | $65.59 | 96 | 52% | $-399.17 | 3 |
| maker_flat | **$9946.3** | $-204.96 | $151.26 | 15 | 47% | $-396.51 | 25 |
| conviction | **$9896.53** | $-102.55 | $-0.92 | 1 | 0% | $0 | 1 |
| mid_momentum_v2 | **$9777.27** | $-458.63 | $235.9 | 109 | 51% | $-649.45 | 25 |
| mm_cheap_v2 | **$9633.71** | $-432.45 | $66.16 | 115 | 52% | $-623.27 | 25 |
| mm_strong | **$9409.83** | $-559.6 | $-30.57 | 154 | 54% | $-763.55 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9097.24** | $-708.69 | $-194.07 | 149 | 60% | $-801 | 21 |
| mm_sports_v2 | **$8820.36** | $-1112.35 | $-67.29 | 165 | 52% | $-1331.48 | 13 |
| random_control | **$8643.12** | $-1304.86 | $-52.02 | 187 | 55% | $-1919.15 | 25 |
| mm_slow | **$8576.43** | $-1431.94 | $8.37 | 109 | 50% | $-1617.65 | 25 |
| momentum | **$7383.03** | $-2529.78 | $-87.19 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5486.22** | $-4155.68 | $-358.1 | 482 | 46% | $-4510.23 | 23 |
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
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 54 | 1 | 0 | 98% | 1.53¢ |

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
