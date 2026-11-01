# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84359 · Last run: 2026-11-01T08:04:17.377Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11611.18** | $1510.09 | $101.09 | 495 | 54% | $660.09 | 25 |
| maker_sports | **$11344.99** | $1300.06 | $44.93 | 98 | 59% | $1087.56 | 4 |
| mid_momentum | **$10930.3** | $695.75 | $234.55 | 296 | 56% | $482.27 | 25 |
| mm_tight | **$10579.21** | $565.5 | $13.71 | 549 | 53% | $356.4 | 4 |
| mm_cheap | **$10421.53** | $344.86 | $76.67 | 123 | 55% | $153.17 | 25 |
| maker_flat | **$10384.18** | $303.95 | $80.23 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10234.62** | $271.77 | $-37.15 | 229 | 54% | $62.67 | 2 |
| fade_longshot | **$9973.37** | $-60.67 | $34.04 | 164 | 95% | $-71.41 | 25 |
| mid_momentum_v2 | **$9705.12** | $-529.43 | $234.55 | 131 | 50% | $-721.98 | 25 |
| conviction | **$9691.19** | $-306.99 | $-1.82 | 3 | 0% | $-204.85 | 1 |
| mm_cheap_v2 | **$9571.89** | $-504.78 | $76.67 | 140 | 51% | $-696.47 | 25 |
| mm_strong | **$9545.74** | $-415.89 | $-38.37 | 173 | 54% | $-619.84 | 25 |
| mm_sports | **$9483.57** | $-540.79 | $24.36 | 652 | 54% | $-759.92 | 4 |
| copy_top | **$9232.85** | $-745.53 | $-21.62 | 518 | 53% | $-2074.1 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8981.21** | $-963.24 | $-55.55 | 162 | 59% | $-1056.87 | 24 |
| random_control | **$8980.85** | $-899.06 | $-120.09 | 190 | 55% | $-1513.35 | 25 |
| super | **$8923.57** | $-1150.21 | $73.78 | 123 | 50% | $-1432.11 | 2 |
| mm_slow | **$8849.28** | $-1007.21 | $-143.51 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8254.25** | $-1770.1 | $24.36 | 221 | 51% | $-1989.23 | 4 |
| momentum | **$7252.24** | $-2744.41 | $-3.35 | 305 | 65% | $-3232.65 | 25 |
| whale_fade | **$6456.72** | $-3132.75 | $-410.53 | 519 | 47% | $-3584.21 | 25 |
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
| maker_sports | 102 | 1 | 0 | 99% | 1.42¢ |

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
