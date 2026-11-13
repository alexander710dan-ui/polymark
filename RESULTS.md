# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83039 · Last run: 2026-11-13T01:33:16.989Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12940.94** | $2676.75 | $264.19 | 388 | 57% | $2431.92 | 18 |
| copy_pro | **$12384.89** | $2469.41 | $-84.52 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11690.34** | $1340.26 | $350.08 | 810 | 54% | $1121.13 | 11 |
| mm_cheap | **$11496.88** | $870.89 | $625.99 | 244 | 55% | $651.07 | 25 |
| mid_momentum | **$11342.08** | $746.21 | $595.87 | 393 | 55% | $526.39 | 25 |
| maker_flat | **$11095.68** | $1107.19 | $-11.51 | 127 | 53% | $913.07 | 20 |
| mm_max | **$10821.65** | $763.44 | $58.21 | 322 | 55% | $554.34 | 2 |
| mm_cheap_v2 | **$10647.24** | $21.25 | $625.99 | 261 | 52% | $-198.57 | 25 |
| mid_momentum_v2 | **$10116.9** | $-478.97 | $595.87 | 228 | 51% | $-698.79 | 25 |
| fade_longshot | **$9872.57** | $-140.38 | $12.95 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9548.59** | $-665.74 | $214.33 | 959 | 54% | $-884.87 | 18 |
| mm_slow | **$9303.45** | $-426.13 | $-270.42 | 209 | 52% | $-645.26 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8962.56** | $-1399.5 | $362.06 | 322 | 52% | $-1618.63 | 25 |
| strong_dip | **$8699.6** | $-1230.65 | $-69.75 | 266 | 58% | $-1324.28 | 24 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.83** | $-1470.79 | $-154.38 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8319.28** | $-1895.05 | $214.33 | 528 | 52% | $-2114.18 | 18 |
| random_control | **$7567.42** | $-2353.98 | $-78.6 | 242 | 54% | $-2968.27 | 25 |
| momentum | **$7330.66** | $-2632.26 | $-37.08 | 375 | 66% | $-3120.5 | 25 |
| whale_fade | **$5979.54** | $-4244.08 | $223.62 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 406 | 2 | 0 | 100% | 1.39¢ |

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
