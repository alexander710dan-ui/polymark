# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27949 · Last run: 2026-08-04T02:36:57.762Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11141.98** | $1657.61 | $-515.63 | 327 | 57% | $1454.58 | 21 |
| mm_tight | **$10938.69** | $715.74 | $222.95 | 284 | 54% | $512.71 | 17 |
| mm_cheap | **$10407.85** | $791.63 | $-383.78 | 26 | 69% | $613.85 | 25 |
| mid_momentum | **$10253.39** | $678.29 | $-424.9 | 194 | 58% | $464.81 | 25 |
| fade_longshot | **$9978.68** | $39.78 | $-61.1 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9871.36** | $-588.74 | $460.1 | 392 | 52% | $-1917.31 | 23 |
| strong_dip | **$9775.57** | $-463.45 | $239.02 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9755.5** | $-262.01 | $17.51 | 113 | 52% | $-381.48 | 10 |
| maker_flat | **$9736.48** | $216.28 | $-479.8 | 20 | 55% | $38.5 | 15 |
| copy_pro | **$9604.31** | $-916.05 | $520.36 | 370 | 51% | $-1766.05 | 25 |
| super | **$9553.29** | $-353.9 | $-92.81 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9437.32** | $-587.64 | $24.96 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9106.4** | $-212 | $-681.6 | 41 | 51% | $-397.71 | 14 |
| mm_slow | **$9038.3** | $-864.45 | $-97.25 | 49 | 49% | $-986.67 | 25 |
| random_control | **$8993.8** | $-354.2 | $-652 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8718.77** | $-1123.53 | $-157.7 | 69 | 46% | $-1327.48 | 25 |
| momentum | **$8198.19** | $-1278.24 | $-523.57 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7330.51** | $-1968.7 | $-700.79 | 393 | 48% | $-2323.25 | 23 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9045.63** | $-942.24 | $-12.13 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8266.24** | $-1937.09 | $203.33 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 35 | 24 | 2 | 59% | 2.99¢ |
| maker_sports | 55 | 26 | 2 | 68% | 1.6¢ |

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
