# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91178 · Last run: 2026-11-04T02:30:42.768Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12445.63** | $2431.07 | $14.56 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11608.94** | $438.8 | $1170.14 | 143 | 55% | $247.11 | 25 |
| mid_momentum | **$11473.23** | $745.6 | $727.63 | 317 | 56% | $532.12 | 25 |
| maker_flat | **$11313.11** | $88.72 | $1224.39 | 57 | 49% | $-105.4 | 24 |
| maker_sports | **$11139.19** | $596.2 | $542.99 | 221 | 55% | $362.87 | 13 |
| mm_tight | **$11044.5** | $670.47 | $374.03 | 658 | 53% | $451.34 | 12 |
| mm_cheap_v2 | **$10759.3** | $-410.84 | $1170.14 | 160 | 52% | $-602.53 | 25 |
| mid_momentum_v2 | **$10248.05** | $-479.58 | $727.63 | 152 | 51% | $-672.13 | 25 |
| mm_max | **$10041** | $-277.82 | $318.82 | 273 | 53% | $-486.92 | 7 |
| mm_slow | **$9906.81** | $-544.29 | $451.1 | 141 | 52% | $-753.39 | 24 |
| fade_longshot | **$9873.6** | $-197.58 | $71.18 | 180 | 94% | $-208.32 | 25 |
| mm_strong | **$9823.61** | $-707.1 | $530.71 | 213 | 53% | $-911.05 | 25 |
| conviction | **$9603.2** | $-306.99 | $-89.81 | 3 | 0% | $-204.85 | 1 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8979.89** | $-1499.21 | $479.1 | 781 | 54% | $-1718.34 | 14 |
| strong_dip | **$8782.1** | $-838.98 | $-378.92 | 200 | 59% | $-932.61 | 25 |
| super | **$8579.24** | $-1370.14 | $-50.62 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8399.93** | $-1201.39 | $-398.68 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8046.19** | $-1203.06 | $-750.75 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7750.58** | $-2728.52 | $479.1 | 350 | 51% | $-2947.65 | 14 |
| momentum | **$7503.06** | $-2991.46 | $494.52 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6846.4** | $-3425.44 | $271.84 | 546 | 47% | $-3876.9 | 21 |
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
