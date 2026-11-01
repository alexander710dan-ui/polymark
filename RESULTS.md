# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84099 · Last run: 2026-11-01T06:03:56.753Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11649.75** | $1508.15 | $141.6 | 494 | 53% | $658.15 | 25 |
| maker_sports | **$11311.16** | $1300.06 | $11.1 | 98 | 59% | $1087.56 | 2 |
| mid_momentum | **$10931.55** | $695.75 | $235.8 | 296 | 56% | $482.27 | 25 |
| mm_tight | **$10550.76** | $565.5 | $-14.74 | 549 | 53% | $356.4 | 2 |
| mm_cheap | **$10411.04** | $344.86 | $66.18 | 123 | 55% | $153.17 | 24 |
| maker_flat | **$10393.63** | $303.95 | $89.68 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10260.22** | $271.77 | $-11.55 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9969.94** | $-62.51 | $32.45 | 163 | 94% | $-73.25 | 25 |
| mid_momentum_v2 | **$9706.37** | $-529.43 | $235.8 | 131 | 50% | $-721.98 | 25 |
| conviction | **$9689.44** | $-306.99 | $-3.57 | 3 | 0% | $-204.85 | 1 |
| mm_cheap_v2 | **$9561.4** | $-504.78 | $66.18 | 140 | 51% | $-696.47 | 24 |
| mm_strong | **$9553.3** | $-415.89 | $-30.81 | 173 | 54% | $-619.84 | 25 |
| mm_sports | **$9454.09** | $-540.79 | $-5.12 | 652 | 54% | $-759.92 | 2 |
| copy_top | **$9246.33** | $-745.53 | $-8.14 | 518 | 53% | $-2074.1 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8999.1** | $-794.17 | $-206.73 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8980.84** | $-963.24 | $-55.92 | 162 | 59% | $-1056.87 | 24 |
| super | **$8921** | $-1150.21 | $71.21 | 123 | 50% | $-1432.11 | 2 |
| mm_slow | **$8862.57** | $-1007.21 | $-130.22 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8224.78** | $-1770.1 | $-5.12 | 221 | 51% | $-1989.23 | 2 |
| momentum | **$7253.52** | $-2643.22 | $-103.26 | 304 | 65% | $-3131.46 | 25 |
| whale_fade | **$6452.89** | $-3132.75 | $-414.36 | 519 | 47% | $-3584.21 | 25 |
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
| maker_flat | 54 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 100 | 1 | 0 | 99% | 1.43¢ |

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
