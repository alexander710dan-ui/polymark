# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32903 · Last run: 2026-08-06T00:43:20.929Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10481.88** | $787.82 | $-305.94 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10418.94** | $561.03 | $-142.09 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10294.62** | $748.67 | $-454.05 | 407 | 54% | $545.64 | 21 |
| super | **$10134.59** | $-306.37 | $440.96 | 74 | 49% | $-522.22 | 16 |
| copy_top | **$9952.28** | $-386.57 | $338.85 | 417 | 52% | $-1715.14 | 25 |
| mm_cheap_v2 | **$9934.19** | $228.14 | $-293.95 | 29 | 59% | $37.32 | 25 |
| fade_longshot | **$9856.19** | $25.97 | $-169.78 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9765.15** | $-21.97 | $-212.88 | 27 | 52% | $-212.79 | 25 |
| copy_pro | **$9642.1** | $-797.13 | $439.23 | 397 | 51% | $-1647.13 | 25 |
| strong_dip | **$9585.68** | $-394.63 | $-19.69 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9397.69** | $-537.31 | $-65 | 178 | 53% | $-704.43 | 9 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9335.39** | $-252.75 | $-411.86 | 477 | 55% | $-471.88 | 25 |
| random_control | **$9093.86** | $-1100.59 | $194.45 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8751.94** | $-750.77 | $-497.29 | 60 | 50% | $-936.48 | 25 |
| mm_strong | **$8364.75** | $-1110.56 | $-524.69 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8304.73** | $-1449 | $-246.27 | 87 | 40% | $-1643.12 | 21 |
| mm_sports_v2 | **$8122.41** | $-1515.32 | $-362.27 | 46 | 39% | $-1641.34 | 25 |
| momentum | **$8049.33** | $-1345.47 | $-605.2 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7590.64** | $-1949.18 | $-460.18 | 162 | 48% | $-2152.21 | 18 |
| whale_fade | **$6816.87** | $-2534.9 | $-648.23 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.44** | $-931.5 | $-68.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 108 | 68 | 4 | 61% | 2.95¢ |
| maker_sports | 180 | 113 | 5 | 61% | 1.54¢ |

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
