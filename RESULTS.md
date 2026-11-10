# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78667 · Last run: 2026-11-10T19:07:15.708Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.48** | $2469.41 | $-83.93 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12178.23** | $2116.15 | $62.08 | 255 | 58% | $1871.32 | 7 |
| mm_cheap | **$11947.4** | $1483.89 | $463.51 | 173 | 56% | $1264.07 | 20 |
| mid_momentum | **$11669.89** | $1114.44 | $555.45 | 345 | 55% | $894.62 | 23 |
| mm_tight | **$11615.78** | $1591.22 | $24.56 | 688 | 54% | $1372.09 | 6 |
| mm_cheap_v2 | **$11097.76** | $634.25 | $463.51 | 190 | 53% | $414.43 | 20 |
| maker_flat | **$10856.86** | $771.2 | $85.66 | 86 | 52% | $577.08 | 14 |
| mid_momentum_v2 | **$10444.71** | $-110.74 | $555.45 | 180 | 51% | $-330.56 | 23 |
| mm_max | **$10433.53** | $437.3 | $-3.77 | 284 | 54% | $228.2 | 2 |
| fade_longshot | **$9969.11** | $-29.87 | $-1.02 | 212 | 95% | $-40.61 | 25 |
| mm_sports | **$9650.45** | $-396.51 | $46.96 | 818 | 54% | $-615.64 | 7 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9561.81** | $-368.13 | $-70.06 | 166 | 52% | $-587.26 | 15 |
| mm_strong | **$9518.28** | $-755.29 | $273.57 | 244 | 52% | $-974.42 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8952.53** | $-1012.64 | $-34.83 | 223 | 58% | $-1106.27 | 15 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8421.14** | $-1625.82 | $46.96 | 387 | 52% | $-1844.95 | 7 |
| copy_top | **$8378.74** | $-1470.79 | $-150.47 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7695.41** | $-2262.84 | $-41.75 | 229 | 54% | $-2877.13 | 25 |
| momentum | **$7525.65** | $-2615.13 | $140.78 | 343 | 66% | $-3103.37 | 25 |
| whale_fade | **$6001.35** | $-4244.08 | $245.43 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 100 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 262 | 1 | 0 | 100% | 1.29¢ |

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
