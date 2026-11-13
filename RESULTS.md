# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84060 · Last run: 2026-11-13T13:47:08.612Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12915.82** | $2868.09 | $47.73 | 420 | 57% | $2623.26 | 9 |
| copy_pro | **$12384.49** | $2469.41 | $-84.92 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12265.07** | $2160.72 | $104.35 | 835 | 54% | $1941.59 | 6 |
| mm_cheap | **$11308** | $1176.25 | $131.75 | 267 | 55% | $956.43 | 25 |
| mid_momentum | **$11289.46** | $1136.19 | $153.27 | 414 | 55% | $916.37 | 25 |
| mm_max | **$11070.19** | $1015.02 | $55.17 | 333 | 56% | $805.92 | 2 |
| maker_flat | **$11048.38** | $915.52 | $132.86 | 133 | 52% | $721.4 | 24 |
| mm_cheap_v2 | **$10458.36** | $326.61 | $131.75 | 284 | 53% | $106.79 | 25 |
| mid_momentum_v2 | **$10064.28** | $-88.99 | $153.27 | 249 | 52% | $-308.81 | 25 |
| fade_longshot | **$9878.89** | $-140.38 | $19.27 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9386.12** | $-636.34 | $22.46 | 991 | 54% | $-855.47 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9164.17** | $-601.84 | $-233.99 | 216 | 52% | $-820.97 | 25 |
| mm_strong | **$8845.98** | $-1348.22 | $194.2 | 343 | 52% | $-1567.35 | 25 |
| strong_dip | **$8724.52** | $-1377 | $101.52 | 274 | 58% | $-1470.63 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.25** | $-1470.79 | $-154.96 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8156.81** | $-1865.65 | $22.46 | 560 | 52% | $-2084.78 | 10 |
| random_control | **$7543.09** | $-2331.47 | $-125.44 | 243 | 54% | $-2945.76 | 25 |
| momentum | **$7308.5** | $-2722.45 | $30.95 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5968.33** | $-4244.08 | $212.41 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 157 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 429 | 2 | 0 | 100% | 1.4¢ |

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
