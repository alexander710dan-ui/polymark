# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90415 · Last run: 2026-11-03T14:29:34.951Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12498.26** | $2431.07 | $67.19 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11692** | $821.1 | $870.9 | 194 | 56% | $608.6 | 12 |
| mm_tight | **$11286.57** | $668.17 | $618.4 | 636 | 53% | $459.07 | 12 |
| maker_flat | **$11079.46** | $488.72 | $590.74 | 53 | 53% | $294.6 | 24 |
| mid_momentum | **$10825** | $753.78 | $71.22 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10266.62** | $-163.28 | $429.9 | 258 | 53% | $-372.38 | 9 |
| mm_cheap | **$10246.09** | $324.11 | $-78.02 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$9928.04** | $-662.96 | $591 | 134 | 51% | $-872.06 | 25 |
| fade_longshot | **$9789.93** | $-210.25 | $0.18 | 178 | 94% | $-220.99 | 25 |
| mm_strong | **$9741.53** | $-468.93 | $210.46 | 201 | 54% | $-672.88 | 25 |
| mm_sports | **$9740.1** | $-1056.83 | $796.93 | 753 | 54% | $-1275.96 | 13 |
| conviction | **$9685.88** | $-306.99 | $-7.13 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9599.82** | $-471.4 | $71.22 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9396.45** | $-525.53 | $-78.02 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8769.54** | $-980.71 | $-249.75 | 191 | 59% | $-1074.34 | 24 |
| copy_top | **$8723.54** | $-1201.39 | $-75.07 | 548 | 53% | $-2529.96 | 20 |
| super | **$8620.09** | $-1370.14 | $-9.77 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8601.39** | $-1203.06 | $-195.55 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$8510.79** | $-2286.14 | $796.93 | 322 | 51% | $-2505.27 | 13 |
| momentum | **$6811.11** | $-2991.46 | $-197.43 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6411.94** | $-3425.44 | $-162.62 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 77 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 206 | 1 | 0 | 100% | 1.33¢ |

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
