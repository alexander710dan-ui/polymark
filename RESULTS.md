# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90078 · Last run: 2026-11-03T09:04:04.065Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12647.44** | $2431.07 | $216.37 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$10758.01** | $783 | $-24.99 | 182 | 56% | $570.5 | 5 |
| mid_momentum | **$10705.72** | $702.82 | $2.9 | 310 | 56% | $489.34 | 25 |
| maker_flat | **$10268.51** | $110.93 | $157.58 | 49 | 49% | $-83.19 | 19 |
| mm_tight | **$10206.26** | $257.99 | $-51.73 | 624 | 53% | $48.89 | 5 |
| mm_cheap | **$10134.87** | $170.75 | $-35.88 | 141 | 55% | $-20.94 | 25 |
| fade_longshot | **$9777.44** | $-210.25 | $-12.31 | 178 | 94% | $-220.99 | 25 |
| conviction | **$9683.18** | $-306.99 | $-9.83 | 3 | 0% | $-204.85 | 1 |
| mm_max | **$9625.42** | $-363.25 | $-11.33 | 253 | 52% | $-572.35 | 1 |
| mid_momentum_v2 | **$9480.54** | $-522.36 | $2.9 | 145 | 51% | $-714.91 | 25 |
| mm_strong | **$9457.94** | $-480.54 | $-61.52 | 194 | 54% | $-684.49 | 24 |
| mm_cheap_v2 | **$9285.23** | $-678.89 | $-35.88 | 158 | 51% | $-870.58 | 25 |
| mm_slow | **$9245.32** | $-706.96 | $-47.72 | 132 | 52% | $-916.06 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9025.29** | $-904.07 | $-70.64 | 187 | 59% | $-997.7 | 20 |
| mm_sports | **$8868.56** | $-1089.35 | $-42.09 | 740 | 54% | $-1308.48 | 5 |
| copy_top | **$8714.95** | $-1201.39 | $-83.66 | 548 | 53% | $-2529.96 | 20 |
| super | **$8620.71** | $-1370.14 | $-9.15 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8589.71** | $-1203.06 | $-207.23 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7639.25** | $-2318.66 | $-42.09 | 309 | 50% | $-2537.79 | 5 |
| momentum | **$6802.15** | $-2991.46 | $-206.39 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6454.44** | $-3425.44 | $-120.12 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 68 | 0 | 0 | 100% | 2.74¢ |
| maker_sports | 187 | 1 | 0 | 99% | 1.35¢ |

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
