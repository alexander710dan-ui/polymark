# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89617 · Last run: 2026-11-03T01:28:20.631Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12708.81** | $2028.21 | $680.6 | 512 | 54% | $1178.21 | 23 |
| maker_sports | **$11110.2** | $987.79 | $122.41 | 160 | 57% | $775.29 | 21 |
| mid_momentum | **$10785.13** | $524.96 | $260.17 | 306 | 56% | $311.48 | 25 |
| mm_tight | **$10515.19** | $472.22 | $42.97 | 606 | 53% | $263.12 | 17 |
| maker_flat | **$10393.76** | $150.14 | $243.62 | 44 | 50% | $-41.41 | 23 |
| mm_cheap | **$10269.55** | $71.35 | $198.2 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$9873.93** | $-55.4 | $-70.67 | 250 | 53% | $-264.5 | 2 |
| fade_longshot | **$9698.52** | $-25.49 | $-275.99 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9681.58** | $-306.99 | $-11.43 | 3 | 0% | $-204.85 | 1 |
| mm_slow | **$9674.81** | $-1095.07 | $769.88 | 124 | 51% | $-1294.75 | 24 |
| mm_strong | **$9637.01** | $-820.8 | $457.81 | 187 | 53% | $-1024.75 | 25 |
| mid_momentum_v2 | **$9559.95** | $-700.22 | $260.17 | 141 | 50% | $-892.77 | 25 |
| mm_cheap_v2 | **$9419.91** | $-778.29 | $198.2 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$9227.82** | $-844.98 | $72.8 | 717 | 54% | $-1064.11 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8918.64** | $-619.91 | $-461.45 | 179 | 60% | $-713.54 | 25 |
| random_control | **$8677.71** | $-899.06 | $-423.23 | 190 | 55% | $-1513.35 | 25 |
| super | **$8582.98** | $-1375.81 | $-41.21 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8511.26** | $-1431.52 | $-57.22 | 545 | 52% | $-2760.09 | 23 |
| mm_sports_v2 | **$7998.51** | $-2074.29 | $72.8 | 286 | 50% | $-2293.42 | 21 |
| momentum | **$6874.48** | $-2788.51 | $-337.01 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6670.37** | $-3115.83 | $-213.8 | 543 | 47% | $-3567.29 | 24 |
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
