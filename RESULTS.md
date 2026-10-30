# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 76040 · Last run: 2026-10-30T12:35:08.984Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11855.61** | $1596.68 | $258.93 | 465 | 53% | $746.68 | 25 |
| maker_sports | **$11422.19** | $1177.21 | $244.98 | 42 | 67% | $964.71 | 13 |
| mm_tight | **$11203.97** | $1032.36 | $171.61 | 503 | 54% | $823.26 | 11 |
| mid_momentum | **$11005.49** | $766.55 | $238.94 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10561.32** | $417.19 | $144.13 | 98 | 57% | $234.73 | 25 |
| mm_max | **$10541.27** | $267.26 | $274.01 | 217 | 54% | $58.16 | 5 |
| copy_top | **$10375.68** | $110.07 | $265.61 | 481 | 53% | $-1218.5 | 25 |
| mm_sports | **$10217.22** | $116.96 | $100.26 | 596 | 55% | $-102.17 | 14 |
| fade_longshot | **$10094.84** | $93.52 | $1.32 | 153 | 95% | $82.78 | 25 |
| maker_flat | **$9959.01** | $-204.96 | $163.97 | 15 | 47% | $-396.51 | 25 |
| super | **$9950.52** | $-117.27 | $67.79 | 96 | 52% | $-399.17 | 3 |
| conviction | **$9896.53** | $-102.55 | $-0.92 | 1 | 0% | $0 | 1 |
| mid_momentum_v2 | **$9780.31** | $-458.63 | $238.94 | 109 | 51% | $-649.45 | 25 |
| mm_cheap_v2 | **$9711.68** | $-432.45 | $144.13 | 115 | 52% | $-623.27 | 25 |
| mm_strong | **$9506.55** | $-559.6 | $66.15 | 154 | 54% | $-763.55 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9092.27** | $-708.69 | $-199.04 | 149 | 60% | $-801 | 21 |
| mm_sports_v2 | **$8987.91** | $-1112.35 | $100.26 | 165 | 52% | $-1331.48 | 14 |
| random_control | **$8663.15** | $-1304.86 | $-31.99 | 187 | 55% | $-1919.15 | 25 |
| mm_slow | **$8659.68** | $-1431.94 | $91.62 | 109 | 50% | $-1617.65 | 25 |
| momentum | **$7398.59** | $-2529.78 | $-71.63 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5404.2** | $-4155.68 | $-440.12 | 482 | 46% | $-4510.23 | 25 |
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
| maker_sports | 55 | 1 | 0 | 98% | 1.52¢ |

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
