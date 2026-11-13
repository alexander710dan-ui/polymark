# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83261 · Last run: 2026-11-13T04:13:31.155Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12430.14** | $2518.51 | $-88.37 | 401 | 57% | $2273.68 | 8 |
| copy_pro | **$12384.34** | $2469.41 | $-85.07 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11832.6** | $1740.28 | $92.32 | 819 | 54% | $1521.15 | 5 |
| maker_flat | **$11185.78** | $1007.19 | $178.59 | 128 | 52% | $813.07 | 21 |
| mm_max | **$11018.84** | $877.28 | $141.56 | 324 | 55% | $668.18 | 3 |
| mm_cheap | **$10975.92** | $845.01 | $130.91 | 251 | 54% | $625.19 | 22 |
| mid_momentum | **$10919.34** | $720.33 | $199.01 | 400 | 55% | $500.51 | 22 |
| mm_cheap_v2 | **$10126.28** | $-4.63 | $130.91 | 268 | 52% | $-224.45 | 22 |
| fade_longshot | **$9867.93** | $-140.38 | $8.31 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9694.16** | $-504.85 | $199.01 | 235 | 51% | $-724.67 | 22 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9108.37** | $-629.78 | $-261.85 | 211 | 52% | $-848.91 | 25 |
| mm_sports | **$9013.18** | $-877.22 | $-109.6 | 972 | 54% | $-1096.35 | 8 |
| mm_strong | **$8777.62** | $-1460.02 | $237.64 | 328 | 52% | $-1679.15 | 23 |
| strong_dip | **$8702.8** | $-1401.61 | $104.41 | 269 | 58% | $-1495.24 | 21 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.48** | $-1470.79 | $-154.73 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7783.87** | $-2106.53 | $-109.6 | 541 | 52% | $-2325.66 | 8 |
| random_control | **$7552.84** | $-2331.47 | $-115.69 | 243 | 54% | $-2945.76 | 25 |
| momentum | **$7339.66** | $-2722.45 | $62.11 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5977.57** | $-4244.08 | $221.65 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 149 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 409 | 2 | 0 | 100% | 1.39¢ |

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
