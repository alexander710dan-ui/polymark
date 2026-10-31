# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79737 · Last run: 2026-10-31T03:31:35.068Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11351.41** | $1452.76 | $-101.35 | 75 | 63% | $1240.26 | 6 |
| copy_pro | **$11286.72** | $987.05 | $299.67 | 480 | 53% | $137.05 | 25 |
| mid_momentum | **$11064.97** | $754.3 | $310.67 | 283 | 56% | $540.82 | 25 |
| mm_tight | **$10714.43** | $848.07 | $-133.64 | 533 | 54% | $638.97 | 6 |
| mm_cheap | **$10591.98** | $475.15 | $116.83 | 108 | 56% | $292.69 | 25 |
| mm_max | **$10330.77** | $432.17 | $-101.4 | 226 | 54% | $223.07 | 2 |
| maker_flat | **$10178.87** | $-152.88 | $331.75 | 23 | 48% | $-344.43 | 25 |
| fade_longshot | **$9921.23** | $-78.68 | $-0.09 | 159 | 94% | $-89.42 | 25 |
| mid_momentum_v2 | **$9839.79** | $-470.88 | $310.67 | 118 | 51% | $-661.7 | 25 |
| mm_sports | **$9792.23** | $-63.43 | $-144.34 | 629 | 55% | $-282.56 | 6 |
| mm_strong | **$9776.51** | $-419.53 | $196.04 | 164 | 54% | $-623.48 | 22 |
| mm_cheap_v2 | **$9742.34** | $-374.49 | $116.83 | 125 | 52% | $-565.31 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| copy_top | **$9386.76** | $-667.33 | $54.09 | 499 | 53% | $-1995.9 | 23 |
| super | **$9360.03** | $-698.52 | $58.55 | 112 | 51% | $-980.42 | 5 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9158.69** | $-794.17 | $-47.14 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8980.34** | $-1297.59 | $277.93 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8784.92** | $-952.56 | $-262.52 | 157 | 59% | $-1046.19 | 22 |
| mm_sports_v2 | **$8562.92** | $-1292.74 | $-144.34 | 198 | 52% | $-1511.87 | 6 |
| momentum | **$7284.14** | $-2644.98 | $-70.88 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6744.71** | $-2873.97 | $-381.32 | 500 | 47% | $-3325.43 | 23 |
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
| maker_flat | 48 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 81 | 1 | 0 | 99% | 1.45¢ |

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
