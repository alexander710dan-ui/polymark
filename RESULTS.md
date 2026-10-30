# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 76752 · Last run: 2026-10-30T15:25:25.244Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11952.5** | $1807.48 | $145.02 | 467 | 53% | $957.48 | 25 |
| maker_sports | **$11569.14** | $1477.91 | $91.23 | 49 | 67% | $1265.41 | 9 |
| mm_tight | **$11297.88** | $1241.35 | $56.53 | 507 | 54% | $1032.25 | 8 |
| mid_momentum | **$11032.05** | $766.55 | $265.5 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10561.86** | $487.5 | $74.36 | 99 | 58% | $305.04 | 25 |
| mm_max | **$10535.22** | $463.71 | $71.51 | 219 | 54% | $254.61 | 3 |
| mm_sports | **$10336.38** | $277.69 | $58.69 | 604 | 55% | $58.56 | 9 |
| maker_flat | **$10226.14** | $-204.96 | $431.1 | 15 | 47% | $-396.51 | 25 |
| fade_longshot | **$10122.35** | $111.26 | $11.09 | 155 | 95% | $100.52 | 25 |
| copy_top | **$10092.03** | $162.58 | $-70.55 | 483 | 53% | $-1165.99 | 25 |
| super | **$9948.42** | $-117.27 | $65.69 | 96 | 52% | $-399.17 | 4 |
| conviction | **$9895.13** | $-102.55 | $-2.32 | 1 | 0% | $0 | 2 |
| mid_momentum_v2 | **$9806.87** | $-458.63 | $265.5 | 109 | 51% | $-649.45 | 25 |
| mm_strong | **$9740.1** | $-489.29 | $229.39 | 155 | 54% | $-693.24 | 25 |
| mm_cheap_v2 | **$9712.22** | $-362.14 | $74.36 | 116 | 53% | $-552.96 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9107.07** | $-951.62 | $58.69 | 173 | 52% | $-1170.75 | 9 |
| strong_dip | **$8911.86** | $-810.94 | $-277.2 | 150 | 59% | $-903.25 | 21 |
| mm_slow | **$8694.47** | $-1361.63 | $56.1 | 110 | 50% | $-1547.34 | 25 |
| random_control | **$8597.95** | $-1304.86 | $-97.19 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7332.46** | $-2520.34 | $-147.2 | 299 | 66% | $-3008.58 | 25 |
| whale_fade | **$5897.47** | $-3806.12 | $-296.41 | 484 | 46% | $-4257.58 | 25 |
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
| maker_sports | 58 | 1 | 0 | 98% | 1.49¢ |

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
