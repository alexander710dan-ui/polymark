# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91268 · Last run: 2026-11-04T03:45:49.962Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12420.75** | $2431.07 | $-10.32 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11825.6** | $438.8 | $1386.8 | 143 | 55% | $247.11 | 25 |
| mid_momentum | **$11653.18** | $723.17 | $930.01 | 319 | 55% | $509.69 | 25 |
| maker_sports | **$11428.11** | $554.93 | $873.18 | 223 | 55% | $321.6 | 11 |
| maker_flat | **$11393.4** | $88.72 | $1304.68 | 57 | 49% | $-105.4 | 24 |
| mm_tight | **$11227.89** | $768.3 | $459.59 | 660 | 53% | $549.17 | 10 |
| mm_cheap_v2 | **$10975.96** | $-410.84 | $1386.8 | 160 | 52% | $-602.53 | 25 |
| mid_momentum_v2 | **$10428** | $-502.01 | $930.01 | 154 | 51% | $-694.56 | 25 |
| mm_max | **$10111.17** | $-223.37 | $334.54 | 274 | 53% | $-432.47 | 6 |
| mm_slow | **$10023.06** | $-489.84 | $512.9 | 142 | 52% | $-698.94 | 23 |
| mm_strong | **$9980.08** | $-729.53 | $709.61 | 215 | 53% | $-933.48 | 25 |
| fade_longshot | **$9870.33** | $-197.58 | $67.91 | 180 | 94% | $-208.32 | 25 |
| conviction | **$9594.47** | $-306.99 | $-98.54 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9259.84** | $-1546.76 | $806.6 | 783 | 54% | $-1765.89 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8686.41** | $-838.98 | $-474.61 | 200 | 59% | $-932.61 | 25 |
| super | **$8562.52** | $-1370.14 | $-67.34 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8393.94** | $-1201.39 | $-404.67 | 548 | 53% | $-2529.96 | 20 |
| mm_sports_v2 | **$8030.53** | $-2776.07 | $806.6 | 352 | 51% | $-2995.2 | 12 |
| random_control | **$8004.39** | $-1203.06 | $-792.55 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7514.01** | $-2991.46 | $505.47 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$7286.29** | $-3425.44 | $711.73 | 546 | 47% | $-3876.9 | 21 |
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
| maker_sports | 234 | 1 | 0 | 100% | 1.32¢ |

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
