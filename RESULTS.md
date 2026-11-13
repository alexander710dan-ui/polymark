# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83462 · Last run: 2026-11-13T06:37:06.029Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12689** | $2581.06 | $107.94 | 406 | 57% | $2336.23 | 7 |
| copy_pro | **$12384.59** | $2469.41 | $-84.82 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12165.54** | $2053.07 | $112.47 | 823 | 54% | $1833.94 | 5 |
| mm_cheap | **$11249.42** | $985.44 | $263.98 | 255 | 55% | $765.62 | 22 |
| maker_flat | **$11192.98** | $1015.52 | $177.46 | 130 | 52% | $821.4 | 23 |
| mid_momentum | **$11070.74** | $781.19 | $289.55 | 403 | 55% | $561.37 | 24 |
| mm_max | **$10985.3** | $1027.61 | $-42.31 | 326 | 56% | $818.51 | 4 |
| mm_cheap_v2 | **$10399.78** | $135.8 | $263.98 | 272 | 53% | $-84.02 | 22 |
| fade_longshot | **$9873.59** | $-140.38 | $13.97 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9845.56** | $-443.99 | $289.55 | 238 | 51% | $-663.81 | 24 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9252.04** | $-731.55 | $-16.41 | 214 | 51% | $-950.68 | 25 |
| mm_sports | **$9247.86** | $-836.97 | $84.83 | 977 | 54% | $-1056.1 | 7 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8887.35** | $-1330.2 | $217.55 | 332 | 52% | $-1549.33 | 24 |
| strong_dip | **$8678.12** | $-1401.61 | $79.73 | 269 | 58% | $-1495.24 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.31** | $-1470.79 | $-154.9 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8018.55** | $-2066.28 | $84.83 | 546 | 52% | $-2285.41 | 7 |
| random_control | **$7586.14** | $-2331.47 | $-82.39 | 243 | 54% | $-2945.76 | 25 |
| momentum | **$7334.41** | $-2722.45 | $56.86 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5968.14** | $-4244.08 | $212.22 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 153 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 413 | 2 | 0 | 100% | 1.39¢ |

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
