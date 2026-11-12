# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82775 · Last run: 2026-11-12T22:11:15.712Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12660.73** | $2561.66 | $99.07 | 381 | 57% | $2316.83 | 19 |
| copy_pro | **$12384.59** | $2469.41 | $-84.82 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11406.25** | $1656.64 | $-250.39 | 802 | 54% | $1437.51 | 12 |
| maker_flat | **$11112.6** | $939.66 | $172.94 | 124 | 52% | $745.54 | 20 |
| mm_cheap | **$11077.51** | $987.17 | $90.34 | 240 | 55% | $767.35 | 25 |
| mid_momentum | **$10969.57** | $760.24 | $209.33 | 390 | 55% | $540.42 | 25 |
| mm_max | **$10628.4** | $828.17 | $-199.77 | 318 | 55% | $619.07 | 2 |
| mm_cheap_v2 | **$10227.87** | $137.53 | $90.34 | 257 | 53% | $-82.29 | 25 |
| fade_longshot | **$9868.73** | $-140.38 | $9.11 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9744.39** | $-464.94 | $209.33 | 225 | 51% | $-684.76 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9412.65** | $-502.72 | $-84.63 | 950 | 54% | $-721.85 | 20 |
| mm_slow | **$9311.43** | $-474.93 | $-213.64 | 206 | 52% | $-694.06 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8946.17** | $-1201.6 | $147.77 | 263 | 58% | $-1295.23 | 25 |
| mm_strong | **$8740.2** | $-1195.1 | $-64.7 | 320 | 53% | $-1414.23 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.35** | $-1470.79 | $-154.86 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8183.34** | $-1732.03 | $-84.63 | 519 | 52% | $-1951.16 | 20 |
| random_control | **$7611.84** | $-2427.27 | $39.11 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7232.92** | $-2640.63 | $-126.45 | 371 | 66% | $-3128.87 | 25 |
| whale_fade | **$5962.08** | $-4244.08 | $206.16 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 144 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 400 | 2 | 0 | 100% | 1.39¢ |

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
