# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83201 · Last run: 2026-10-31T23:13:25.741Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11603.58** | $1350.53 | $253.05 | 488 | 53% | $500.53 | 25 |
| maker_sports | **$11391.92** | $1272.09 | $119.83 | 89 | 60% | $1059.59 | 6 |
| mid_momentum | **$11029.07** | $861.05 | $168.02 | 292 | 56% | $647.57 | 24 |
| mm_tight | **$10824.11** | $730.97 | $93.14 | 544 | 53% | $521.87 | 5 |
| mm_cheap | **$10461.57** | $463.76 | $-2.19 | 118 | 56% | $272.07 | 23 |
| maker_flat | **$10326.69** | $140.79 | $185.9 | 28 | 50% | $-50.76 | 25 |
| mm_max | **$10272.09** | $271.77 | $0.32 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9951.6** | $-70.35 | $21.95 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9803.89** | $-364.13 | $168.02 | 127 | 51% | $-556.68 | 24 |
| conviction | **$9688.86** | $-306.99 | $-4.15 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9635.65** | $-258.69 | $-105.66 | 170 | 54% | $-462.64 | 23 |
| mm_cheap_v2 | **$9611.93** | $-385.88 | $-2.19 | 135 | 52% | $-577.57 | 23 |
| mm_sports | **$9575.46** | $-522.85 | $98.31 | 643 | 54% | $-741.98 | 6 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9198.66** | $-768.54 | $-32.8 | 509 | 52% | $-2097.11 | 25 |
| super | **$9049.83** | $-1025.67 | $75.5 | 119 | 50% | $-1307.57 | 6 |
| random_control | **$9026.73** | $-794.17 | $-179.1 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8892.15** | $-1007.21 | $-100.64 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8877.84** | $-1022.63 | $-99.53 | 161 | 58% | $-1116.26 | 22 |
| mm_sports_v2 | **$8346.15** | $-1752.16 | $98.31 | 212 | 50% | $-1971.29 | 6 |
| momentum | **$7253.91** | $-2644.98 | $-101.11 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6707.99** | $-2947.22 | $-344.79 | 510 | 47% | $-3398.68 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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
