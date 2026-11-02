# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88013 · Last run: 2026-11-02T10:31:47.816Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11624.09** | $1710.14 | $-86.05 | 507 | 54% | $860.14 | 25 |
| maker_sports | **$11061.34** | $1251.4 | $-190.06 | 130 | 58% | $1038.9 | 12 |
| mid_momentum | **$10708.79** | $627.56 | $81.23 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10556.5** | $778.09 | $-221.59 | 576 | 54% | $568.99 | 10 |
| maker_flat | **$10490.03** | $433.39 | $56.64 | 35 | 54% | $241.84 | 23 |
| mm_max | **$10249.35** | $289.41 | $-40.06 | 232 | 54% | $80.31 | 5 |
| fade_longshot | **$10013.06** | $-25.49 | $38.55 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9993.37** | $71.35 | $-77.98 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9687.19** | $-306.99 | $-5.82 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9483.61** | $-597.62 | $81.23 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9261.22** | $-512.34 | $-226.44 | 685 | 55% | $-731.47 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9143.73** | $-778.29 | $-77.98 | 155 | 51% | $-969.98 | 25 |
| strong_dip | **$9141.34** | $-926.39 | $67.73 | 170 | 59% | $-1020.02 | 25 |
| mm_strong | **$9083** | $-681.07 | $-235.93 | 184 | 53% | $-885.02 | 25 |
| random_control | **$8928.08** | $-899.06 | $-172.86 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8712.9** | $-1046.87 | $-240.23 | 122 | 51% | $-1246.55 | 25 |
| super | **$8608.53** | $-1375.81 | $-15.66 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8601.13** | $-1345.07 | $-53.8 | 539 | 53% | $-2673.64 | 25 |
| mm_sports_v2 | **$8031.91** | $-1741.65 | $-226.44 | 254 | 52% | $-1960.78 | 12 |
| momentum | **$7021.69** | $-2788.51 | $-189.8 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6701.56** | $-3278.38 | $-20.06 | 539 | 47% | $-3729.84 | 25 |
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
| maker_flat | 58 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 142 | 1 | 0 | 99% | 1.4¢ |

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
