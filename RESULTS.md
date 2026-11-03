# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90152 · Last run: 2026-11-03T10:14:35.695Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12644.08** | $2431.07 | $213.01 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$10957.08** | $841.73 | $115.35 | 183 | 56% | $629.23 | 9 |
| mid_momentum | **$10717.08** | $702.82 | $14.26 | 310 | 56% | $489.34 | 25 |
| maker_flat | **$10453.1** | $110.93 | $342.17 | 49 | 49% | $-83.19 | 22 |
| mm_tight | **$10266.32** | $312.44 | $-46.12 | 625 | 53% | $103.34 | 9 |
| mm_cheap | **$10146.08** | $170.75 | $-24.67 | 141 | 55% | $-20.94 | 25 |
| fade_longshot | **$9778.75** | $-210.25 | $-11 | 178 | 94% | $-220.99 | 25 |
| conviction | **$9684.35** | $-306.99 | $-8.66 | 3 | 0% | $-204.85 | 1 |
| mm_max | **$9638.08** | $-363.25 | $1.33 | 253 | 52% | $-572.35 | 6 |
| mm_strong | **$9515.75** | $-426.09 | $-58.16 | 195 | 54% | $-630.04 | 25 |
| mid_momentum_v2 | **$9491.9** | $-522.36 | $14.26 | 145 | 51% | $-714.91 | 25 |
| mm_slow | **$9447.37** | $-706.96 | $154.33 | 132 | 52% | $-916.06 | 24 |
| mm_cheap_v2 | **$9296.44** | $-678.89 | $-24.67 | 158 | 51% | $-870.58 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9038.89** | $-1034.9 | $73.79 | 741 | 54% | $-1254.03 | 9 |
| strong_dip | **$8954.75** | $-904.07 | $-141.18 | 187 | 59% | $-997.7 | 23 |
| copy_top | **$8717.27** | $-1201.39 | $-81.34 | 548 | 53% | $-2529.96 | 20 |
| super | **$8623.04** | $-1370.14 | $-6.82 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8593.52** | $-1203.06 | $-203.42 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7809.58** | $-2264.21 | $73.79 | 310 | 51% | $-2483.34 | 9 |
| momentum | **$6820.83** | $-2991.46 | $-187.71 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6446.72** | $-3425.44 | $-127.84 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 71 | 0 | 2 | 100% | 2.73¢ |
| maker_sports | 192 | 1 | 0 | 99% | 1.35¢ |

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
