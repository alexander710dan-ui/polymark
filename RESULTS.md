# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90860 · Last run: 2026-11-03T21:54:36.416Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12561.92** | $2431.07 | $130.85 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11284.24** | $929.23 | $355.01 | 213 | 56% | $695.9 | 10 |
| mm_tight | **$10992.76** | $788.89 | $203.87 | 652 | 53% | $569.76 | 10 |
| mid_momentum | **$10905.32** | $753.78 | $151.54 | 312 | 56% | $540.3 | 25 |
| maker_flat | **$10826.11** | $188.72 | $637.39 | 56 | 50% | $-5.4 | 25 |
| mm_cheap | **$10425.42** | $324.11 | $101.31 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10186.04** | $-120.47 | $306.51 | 270 | 53% | $-329.57 | 7 |
| mm_slow | **$10014.4** | $-618.28 | $632.68 | 137 | 52% | $-827.38 | 25 |
| fade_longshot | **$9794.71** | $-203.07 | $-2.22 | 179 | 94% | $-213.81 | 25 |
| conviction | **$9682.17** | $-306.99 | $-10.84 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9680.14** | $-471.4 | $151.54 | 147 | 51% | $-663.95 | 25 |
| mm_strong | **$9637.03** | $-481.72 | $118.75 | 208 | 54% | $-685.67 | 24 |
| mm_cheap_v2 | **$9575.78** | $-525.53 | $101.31 | 159 | 52% | $-717.22 | 25 |
| mm_sports | **$9259.06** | $-1039.24 | $298.3 | 772 | 54% | $-1258.37 | 11 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8952.93** | $-802.58 | $-244.49 | 198 | 59% | $-896.21 | 23 |
| copy_top | **$8723.24** | $-1201.39 | $-75.37 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8630.2** | $-1203.06 | $-166.74 | 193 | 54% | $-1817.35 | 25 |
| super | **$8609.67** | $-1370.14 | $-20.19 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8029.75** | $-2268.55 | $298.3 | 341 | 51% | $-2487.68 | 11 |
| momentum | **$6822.29** | $-2991.46 | $-186.25 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6528.82** | $-3425.44 | $-45.74 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 223 | 1 | 0 | 100% | 1.32¢ |

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
