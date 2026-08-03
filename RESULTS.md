# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26735 · Last run: 2026-08-03T15:21:34.624Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11286.62** | $1277.53 | $9.09 | 273 | 57% | $1074.5 | 25 |
| mm_tight | **$10513.08** | $502.07 | $11.01 | 233 | 53% | $299.04 | 20 |
| mid_momentum | **$10347.31** | $608.28 | $-260.97 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10243.15** | $832.49 | $-589.34 | 24 | 71% | $654.71 | 25 |
| copy_pro | **$10026.02** | $-684.75 | $710.77 | 364 | 51% | $-1534.75 | 25 |
| strong_dip | **$10003.89** | $-337.42 | $341.31 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9957.11** | $34.52 | $-77.41 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9874.48** | $0 | $-125.52 | 0 | — | $0 | 7 |
| maker_sports | **$9800.71** | $0 | $-199.29 | 0 | — | $0 | 7 |
| copy_top | **$9627.78** | $-466.45 | $94.23 | 383 | 51% | $-1795.02 | 24 |
| super | **$9562.67** | $-445.84 | $8.51 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9467.26** | $-475.72 | $-57.02 | 77 | 49% | $-593.11 | 11 |
| ai_judge | **$9390.01** | $-487.64 | $-122.35 | 6 | 17% | $-500 | 3 |
| random_control | **$9273.46** | $-310.74 | $-415.8 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8847.63** | $-821.03 | $-331.34 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8585.58** | $-1233.53 | $-180.89 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8208.07** | $-1339.53 | $-452.4 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7433.79** | $-1899.95 | $-666.26 | 384 | 48% | $-2254.5 | 24 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9025.21** | $-1003.53 | $28.74 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8386.37** | $-1837.09 | $223.46 | 145 | 26% | $-3864.75 | 2 |
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
