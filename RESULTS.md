# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26761 · Last run: 2026-08-03T15:35:59.567Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11340.62** | $1077.53 | $263.09 | 275 | 56% | $874.5 | 23 |
| mm_tight | **$10567.03** | $402.07 | $164.96 | 234 | 53% | $199.04 | 19 |
| mid_momentum | **$10332.03** | $608.28 | $-276.25 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10246.14** | $832.49 | $-586.35 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10013.5** | $-337.42 | $350.92 | 96 | 60% | $-429.73 | 25 |
| copy_pro | **$10006.86** | $-684.75 | $691.61 | 364 | 51% | $-1534.75 | 25 |
| fade_longshot | **$9963.65** | $34.52 | $-70.87 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9920.48** | $0 | $-79.52 | 0 | — | $0 | 7 |
| maker_sports | **$9862.27** | $0 | $-137.73 | 0 | — | $0 | 7 |
| copy_top | **$9620.17** | $-466.45 | $86.62 | 383 | 51% | $-1795.02 | 25 |
| super | **$9559.96** | $-445.84 | $5.8 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9514.4** | $-475.72 | $-9.88 | 77 | 49% | $-593.11 | 11 |
| ai_judge | **$9392.23** | $-487.64 | $-120.13 | 6 | 17% | $-500 | 3 |
| random_control | **$9269.18** | $-310.74 | $-420.08 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8857.51** | $-821.03 | $-321.46 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8569.85** | $-1233.53 | $-196.62 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8196** | $-1339.53 | $-464.47 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7424.79** | $-1899.95 | $-675.26 | 384 | 48% | $-2254.5 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9026.5** | $-1003.53 | $30.03 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8379.71** | $-1837.09 | $216.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.2** | $-4691.55 | $-209.25 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 7 | 4 | 4 | 64% | 2.86¢ |
| maker_sports | 7 | 5 | 2 | 58% | 1.86¢ |

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
