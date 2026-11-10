# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78836 · Last run: 2026-11-10T21:08:29.234Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.23** | $2469.41 | $-84.18 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12259.47** | $2017.33 | $242.14 | 259 | 58% | $1772.5 | 13 |
| mm_cheap | **$11956.92** | $1369.97 | $586.95 | 177 | 56% | $1150.15 | 25 |
| mid_momentum | **$11654.71** | $959.16 | $695.55 | 348 | 55% | $739.34 | 25 |
| mm_tight | **$11524.15** | $1386.52 | $137.63 | 690 | 54% | $1167.39 | 11 |
| mm_cheap_v2 | **$11107.28** | $520.33 | $586.95 | 194 | 53% | $300.51 | 25 |
| maker_flat | **$11066.74** | $875.28 | $191.46 | 87 | 53% | $681.16 | 16 |
| mid_momentum_v2 | **$10429.53** | $-266.02 | $695.55 | 183 | 50% | $-485.84 | 25 |
| mm_max | **$10215.24** | $232.6 | $-17.36 | 286 | 54% | $23.5 | 2 |
| fade_longshot | **$9969.68** | $-17.99 | $-12.33 | 215 | 95% | $-28.73 | 25 |
| mm_sports | **$9670.92** | $-510.43 | $181.35 | 822 | 54% | $-729.56 | 13 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9558.67** | $-869.21 | $427.88 | 248 | 52% | $-1088.34 | 24 |
| mm_slow | **$9414.26** | $-531.87 | $-53.87 | 169 | 51% | $-751 | 17 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8987.11** | $-853.38 | $-159.51 | 225 | 59% | $-947.01 | 17 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8441.61** | $-1739.74 | $181.35 | 391 | 52% | $-1958.87 | 13 |
| copy_top | **$8378.37** | $-1470.79 | $-150.84 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7603.6** | $-2289.22 | $-107.18 | 231 | 54% | $-2903.51 | 25 |
| momentum | **$7327.79** | $-2820.23 | $148.02 | 345 | 65% | $-3308.47 | 25 |
| whale_fade | **$6004.93** | $-4244.08 | $249.01 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 103 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 272 | 1 | 0 | 100% | 1.32¢ |

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
