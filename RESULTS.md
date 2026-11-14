# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85115 · Last run: 2026-11-14T04:55:47.849Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13746.65** | $3646.57 | $100.08 | 468 | 58% | $3401.74 | 11 |
| copy_pro | **$12382.67** | $2319.6 | $63.07 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11985.98** | $1935.67 | $50.31 | 884 | 53% | $1716.54 | 10 |
| mid_momentum | **$11712** | $1696.38 | $15.62 | 430 | 56% | $1476.56 | 22 |
| maker_flat | **$11154.97** | $1019.44 | $135.53 | 139 | 53% | $825.32 | 25 |
| mm_cheap | **$11137.07** | $1076.26 | $60.81 | 292 | 54% | $856.44 | 22 |
| mm_max | **$10730.62** | $731.62 | $-1 | 343 | 55% | $522.52 | 1 |
| mid_momentum_v2 | **$10486.82** | $471.2 | $15.62 | 265 | 53% | $251.38 | 22 |
| mm_cheap_v2 | **$10287.43** | $226.62 | $60.81 | 309 | 52% | $6.8 | 22 |
| fade_longshot | **$9893.02** | $-129.36 | $22.38 | 232 | 94% | $-140.1 | 25 |
| mm_sports | **$9678.02** | $-388.52 | $66.54 | 1047 | 53% | $-607.65 | 12 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9130.98** | $-774.32 | $-94.7 | 381 | 51% | $-993.45 | 20 |
| mm_slow | **$8993.51** | $-873.28 | $-133.21 | 224 | 51% | $-1092.41 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8448.71** | $-1617.83 | $66.54 | 616 | 51% | $-1836.96 | 12 |
| strong_dip | **$8375.66** | $-1737.73 | $113.39 | 288 | 56% | $-1831.36 | 24 |
| copy_top | **$8372.61** | $-1570.4 | $-56.99 | 566 | 53% | $-2898.97 | 2 |
| momentum | **$7412.32** | $-2822.65 | $234.97 | 380 | 65% | $-3310.89 | 25 |
| random_control | **$7291.97** | $-2638.21 | $-69.82 | 246 | 53% | $-3252.5 | 25 |
| whale_fade | **$5964.1** | $-4034.69 | $-1.21 | 565 | 46% | $-4486.15 | 2 |
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
| maker_flat | 164 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 479 | 4 | 0 | 99% | 1.38¢ |

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
