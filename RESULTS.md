# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82862 · Last run: 2026-11-12T23:18:04.520Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12592.08** | $2520.39 | $71.69 | 383 | 57% | $2275.56 | 21 |
| copy_pro | **$12384.39** | $2469.41 | $-85.02 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11235.23** | $1505.38 | $-270.15 | 805 | 54% | $1286.25 | 14 |
| maker_flat | **$11135.36** | $939.66 | $195.7 | 124 | 52% | $745.54 | 23 |
| mm_cheap | **$11095.24** | $884.02 | $211.22 | 241 | 55% | $664.2 | 25 |
| mid_momentum | **$11000.69** | $760.24 | $240.45 | 390 | 55% | $540.42 | 25 |
| mm_max | **$10593.66** | $622.56 | $-28.9 | 320 | 55% | $413.46 | 3 |
| mm_cheap_v2 | **$10245.6** | $34.38 | $211.22 | 258 | 53% | $-185.44 | 25 |
| fade_longshot | **$9868.95** | $-140.38 | $9.33 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9775.51** | $-464.94 | $240.45 | 225 | 51% | $-684.76 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9325.22** | $-523.63 | $-151.15 | 208 | 52% | $-742.76 | 25 |
| mm_sports | **$9285.56** | $-653.98 | $-60.46 | 953 | 54% | $-873.11 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8937.39** | $-1201.6 | $138.99 | 263 | 58% | $-1295.23 | 25 |
| mm_strong | **$8766.77** | $-1195.1 | $-38.13 | 320 | 53% | $-1414.23 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.49** | $-1470.79 | $-154.72 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8056.25** | $-1883.29 | $-60.46 | 522 | 52% | $-2102.42 | 22 |
| random_control | **$7614.72** | $-2427.27 | $41.99 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7236.99** | $-2616.63 | $-146.38 | 372 | 66% | $-3104.87 | 25 |
| whale_fade | **$5980.5** | $-4244.08 | $224.58 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 404 | 2 | 0 | 100% | 1.39¢ |

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
