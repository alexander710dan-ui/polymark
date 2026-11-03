# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89794 · Last run: 2026-11-03T04:23:37.691Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12615.58** | $1963.49 | $652.09 | 514 | 54% | $1113.49 | 21 |
| mid_momentum | **$10745.02** | $623.25 | $121.77 | 309 | 56% | $409.77 | 24 |
| maker_flat | **$10406.85** | $210.93 | $195.92 | 48 | 50% | $16.81 | 19 |
| maker_sports | **$10360.35** | $363.21 | $-2.86 | 173 | 55% | $150.71 | 8 |
| mm_cheap | **$10202.03** | $170.75 | $31.28 | 141 | 55% | $-20.94 | 24 |
| mm_tight | **$9935.27** | $-60.81 | $-3.92 | 616 | 53% | $-269.91 | 7 |
| mm_max | **$9855.84** | $-158.65 | $14.49 | 251 | 53% | $-367.75 | 1 |
| fade_longshot | **$9758.3** | $-226.09 | $-15.61 | 176 | 94% | $-236.83 | 25 |
| conviction | **$9680.71** | $-306.99 | $-12.3 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9519.84** | $-601.93 | $121.77 | 144 | 51% | $-794.48 | 24 |
| mm_strong | **$9510.57** | $-508.03 | $18.6 | 191 | 53% | $-711.98 | 22 |
| mm_slow | **$9493.39** | $-551.93 | $45.32 | 129 | 52% | $-761.03 | 19 |
| mm_cheap_v2 | **$9352.39** | $-678.89 | $31.28 | 158 | 51% | $-870.58 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9204.19** | $-763.89 | $-31.92 | 184 | 59% | $-857.52 | 21 |
| copy_top | **$8616.83** | $-1431.52 | $48.35 | 545 | 52% | $-2760.09 | 23 |
| random_control | **$8584.58** | $-1100.71 | $-314.71 | 192 | 55% | $-1715 | 25 |
| super | **$8534.04** | $-1484.7 | $18.74 | 130 | 50% | $-1766.6 | 3 |
| mm_sports | **$8462.72** | $-1508.97 | $-28.31 | 730 | 54% | $-1728.1 | 8 |
| mm_sports_v2 | **$7233.41** | $-2738.28 | $-28.31 | 299 | 49% | $-2957.41 | 8 |
| momentum | **$6811.21** | $-2991.46 | $-197.33 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6634.77** | $-3115.83 | $-249.4 | 543 | 47% | $-3567.29 | 24 |
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
