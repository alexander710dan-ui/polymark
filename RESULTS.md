# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77658 · Last run: 2026-10-30T19:02:38.234Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11781.03** | $1705.48 | $75.55 | 468 | 53% | $855.48 | 25 |
| maker_sports | **$11524.83** | $1527.16 | $-2.33 | 50 | 68% | $1314.66 | 24 |
| mm_tight | **$11264.56** | $1327.68 | $-63.12 | 508 | 54% | $1118.58 | 23 |
| mid_momentum | **$11157.08** | $846.46 | $310.62 | 276 | 57% | $632.98 | 25 |
| mm_cheap | **$10694.27** | $567.31 | $126.96 | 101 | 57% | $384.85 | 25 |
| mm_max | **$10545.76** | $550.04 | $-4.28 | 220 | 55% | $340.94 | 3 |
| maker_flat | **$10388.48** | $42.04 | $346.44 | 17 | 53% | $-149.51 | 25 |
| mm_sports | **$10213.54** | $277.69 | $-64.15 | 604 | 55% | $58.56 | 25 |
| fade_longshot | **$10022.33** | $19.21 | $3.12 | 157 | 95% | $8.47 | 25 |
| mid_momentum_v2 | **$9931.9** | $-378.72 | $310.62 | 111 | 51% | $-569.54 | 25 |
| copy_top | **$9919.25** | $-43.02 | $-37.73 | 485 | 53% | $-1371.59 | 25 |
| mm_strong | **$9912.89** | $-265.47 | $178.36 | 157 | 55% | $-469.42 | 25 |
| mm_cheap_v2 | **$9844.63** | $-282.33 | $126.96 | 118 | 53% | $-473.15 | 25 |
| conviction | **$9829.92** | $-102.55 | $-67.53 | 1 | 0% | $0 | 2 |
| super | **$9805.43** | $-117.27 | $-77.3 | 96 | 52% | $-399.17 | 11 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9034.22** | $-1195.39 | $229.61 | 113 | 50% | $-1381.1 | 25 |
| mm_sports_v2 | **$8984.23** | $-951.62 | $-64.15 | 173 | 52% | $-1170.75 | 25 |
| strong_dip | **$8792.83** | $-912.64 | $-294.53 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8598.6** | $-1304.86 | $-96.54 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7589.71** | $-2337.88 | $-72.41 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$6095.39** | $-3629.53 | $-275.08 | 486 | 46% | $-4080.99 | 25 |
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
| maker_flat | 42 | 0 | 0 | 100% | 2.59¢ |
| maker_sports | 74 | 1 | 1 | 99% | 1.44¢ |

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
