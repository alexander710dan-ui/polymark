# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84241 · Last run: 2026-11-13T15:59:36.144Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12908.04** | $2872.17 | $35.87 | 424 | 57% | $2627.34 | 7 |
| copy_pro | **$12384.44** | $2469.41 | $-84.97 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12250.17** | $2248.55 | $1.62 | 838 | 54% | $2029.42 | 4 |
| mid_momentum | **$11428.64** | $1076.27 | $352.37 | 416 | 55% | $856.45 | 25 |
| mm_cheap | **$11281.74** | $1095.59 | $186.15 | 271 | 55% | $875.77 | 23 |
| maker_flat | **$11161.9** | $1004.2 | $157.7 | 134 | 52% | $810.08 | 23 |
| mm_max | **$11146.95** | $1069.47 | $77.48 | 334 | 56% | $860.37 | 2 |
| mm_cheap_v2 | **$10432.1** | $245.95 | $186.15 | 288 | 53% | $26.13 | 23 |
| mid_momentum_v2 | **$10203.46** | $-148.91 | $352.37 | 251 | 52% | $-368.73 | 25 |
| fade_longshot | **$9881.88** | $-140.38 | $22.26 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9413.69** | $-601.49 | $15.18 | 996 | 54% | $-820.62 | 7 |
| mm_slow | **$9254.77** | $-704.64 | $-40.59 | 217 | 52% | $-923.77 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8903.13** | $-1276.21 | $179.34 | 347 | 53% | $-1495.34 | 22 |
| strong_dip | **$8718.2** | $-1377 | $95.2 | 274 | 58% | $-1470.63 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.2** | $-1470.79 | $-155.01 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8184.38** | $-1830.8 | $15.18 | 565 | 52% | $-2049.93 | 7 |
| random_control | **$7348.48** | $-2434.87 | $-216.65 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7287.59** | $-2722.45 | $10.04 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.45** | $-4244.08 | $215.53 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 431 | 2 | 0 | 100% | 1.39¢ |

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
