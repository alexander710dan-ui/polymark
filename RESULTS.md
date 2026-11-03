# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89722 · Last run: 2026-11-03T03:13:30.582Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12874.29** | $2028.21 | $846.08 | 512 | 54% | $1178.21 | 23 |
| mid_momentum | **$10764.16** | $524.96 | $239.2 | 306 | 56% | $311.48 | 25 |
| maker_sports | **$10521.1** | $787.79 | $-266.69 | 162 | 56% | $575.29 | 19 |
| maker_flat | **$10403.3** | $150.14 | $253.16 | 44 | 50% | $-41.41 | 23 |
| mm_cheap | **$10278.46** | $71.35 | $207.11 | 138 | 54% | $-120.34 | 25 |
| mm_tight | **$10097.71** | $368.97 | $-271.26 | 607 | 53% | $159.87 | 16 |
| mm_max | **$9855.84** | $-158.65 | $14.49 | 251 | 53% | $-367.75 | 1 |
| mm_slow | **$9718.56** | $-1095.07 | $813.63 | 124 | 51% | $-1294.75 | 24 |
| fade_longshot | **$9682.29** | $-25.49 | $-292.22 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9681** | $-306.99 | $-12.01 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9669.07** | $-820.8 | $489.87 | 187 | 53% | $-1024.75 | 25 |
| mid_momentum_v2 | **$9538.98** | $-700.22 | $239.2 | 141 | 50% | $-892.77 | 25 |
| mm_cheap_v2 | **$9428.82** | $-778.29 | $207.11 | 155 | 51% | $-969.98 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8988.85** | $-549.6 | $-461.55 | 180 | 60% | $-643.23 | 25 |
| random_control | **$8654.6** | $-899.06 | $-446.34 | 190 | 55% | $-1513.35 | 25 |
| mm_sports | **$8641.39** | $-1050.28 | $-308.33 | 719 | 54% | $-1269.41 | 19 |
| copy_top | **$8568.5** | $-1431.52 | $0.02 | 545 | 52% | $-2760.09 | 23 |
| super | **$8484.2** | $-1579.91 | $64.11 | 129 | 50% | $-1861.81 | 4 |
| mm_sports_v2 | **$7412.08** | $-2279.59 | $-308.33 | 288 | 50% | $-2498.72 | 19 |
| momentum | **$6859.12** | $-2788.51 | $-352.37 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6647.1** | $-3115.83 | $-237.07 | 543 | 47% | $-3567.29 | 24 |
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
| maker_flat | 67 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 181 | 1 | 0 | 99% | 1.37¢ |

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
