# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73973 · Last run: 2026-10-30T04:34:21.962Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11698.47** | $648.17 | $1050.3 | 459 | 53% | $-201.83 | 22 |
| maker_sports | **$11050.16** | $1190.06 | $-139.9 | 35 | 71% | $998.51 | 9 |
| mm_tight | **$10856.96** | $844.51 | $12.45 | 496 | 54% | $635.41 | 8 |
| mid_momentum | **$10837.77** | $613.53 | $224.24 | 272 | 56% | $400.05 | 25 |
| mm_cheap | **$10415.77** | $255.75 | $160.02 | 94 | 56% | $73.29 | 25 |
| copy_top | **$10130.78** | $-116.24 | $247.02 | 476 | 53% | $-1444.81 | 18 |
| super | **$10117.86** | $87.83 | $30.03 | 95 | 53% | $-194.07 | 3 |
| fade_longshot | **$10082.1** | $89.44 | $-7.34 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10069.66** | $53.68 | $15.98 | 213 | 54% | $-155.42 | 3 |
| mm_sports | **$10007.93** | $163.23 | $-155.3 | 589 | 55% | $-55.9 | 9 |
| conviction | **$9998.06** | $0 | $-1.94 | 0 | — | $0 | 2 |
| maker_flat | **$9928.64** | $-204.96 | $133.6 | 15 | 47% | $-396.51 | 25 |
| mid_momentum_v2 | **$9612.59** | $-611.65 | $224.24 | 107 | 50% | $-802.47 | 25 |
| mm_cheap_v2 | **$9566.13** | $-593.89 | $160.02 | 111 | 51% | $-784.71 | 25 |
| strong_dip | **$9324.59** | $-504.54 | $-170.87 | 147 | 61% | $-596.85 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9190.9** | $-847.37 | $38.27 | 150 | 53% | $-1051.32 | 25 |
| mm_sports_v2 | **$8778.62** | $-1066.08 | $-155.3 | 158 | 52% | $-1285.21 | 9 |
| random_control | **$8627.05** | $-1101.01 | $-271.94 | 185 | 56% | $-1715.3 | 25 |
| mm_slow | **$8610.2** | $-1439.51 | $49.71 | 107 | 50% | $-1625.22 | 25 |
| momentum | **$7397.37** | $-2533.86 | $-68.77 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5631.91** | $-4116.4 | $-251.69 | 477 | 46% | $-4470.95 | 18 |
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
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 44 | 1 | 0 | 98% | 1.49¢ |

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
