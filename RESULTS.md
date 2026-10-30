# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77609 · Last run: 2026-10-30T18:50:45.232Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11839.38** | $1705.48 | $133.9 | 468 | 53% | $855.48 | 25 |
| maker_sports | **$11567.95** | $1477.91 | $90.04 | 49 | 67% | $1265.41 | 25 |
| mm_tight | **$11308.47** | $1241.35 | $67.12 | 507 | 54% | $1032.25 | 24 |
| mid_momentum | **$11188.25** | $846.46 | $341.79 | 276 | 57% | $632.98 | 25 |
| mm_cheap | **$10725.27** | $567.31 | $157.96 | 101 | 57% | $384.85 | 25 |
| mm_max | **$10588.43** | $463.71 | $124.72 | 219 | 54% | $254.61 | 4 |
| maker_flat | **$10428.53** | $42.04 | $386.49 | 17 | 53% | $-149.51 | 24 |
| mm_sports | **$10255.22** | $277.69 | $-22.47 | 604 | 55% | $58.56 | 25 |
| fade_longshot | **$10020.92** | $19.21 | $1.71 | 157 | 95% | $8.47 | 25 |
| mid_momentum_v2 | **$9963.07** | $-378.72 | $341.79 | 111 | 51% | $-569.54 | 25 |
| copy_top | **$9962.99** | $-43.02 | $6.01 | 485 | 53% | $-1371.59 | 25 |
| mm_strong | **$9945.98** | $-265.47 | $211.45 | 157 | 55% | $-469.42 | 25 |
| super | **$9889.14** | $-117.27 | $6.41 | 96 | 52% | $-399.17 | 10 |
| mm_cheap_v2 | **$9875.63** | $-282.33 | $157.96 | 118 | 53% | $-473.15 | 25 |
| conviction | **$9872.23** | $-102.55 | $-25.22 | 1 | 0% | $0 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9082.5** | $-1281.72 | $364.22 | 112 | 50% | $-1467.43 | 25 |
| mm_sports_v2 | **$9025.91** | $-951.62 | $-22.47 | 173 | 52% | $-1170.75 | 25 |
| strong_dip | **$8798.39** | $-912.64 | $-288.97 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8598.28** | $-1304.86 | $-96.86 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7604.44** | $-2337.88 | $-57.68 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$6034.61** | $-3629.53 | $-335.86 | 486 | 46% | $-4080.99 | 25 |
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
| maker_flat | 41 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 74 | 1 | 0 | 99% | 1.44¢ |

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
