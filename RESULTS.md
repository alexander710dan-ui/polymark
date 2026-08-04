# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28731 · Last run: 2026-08-04T09:52:02.516Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11071.49** | $1115.92 | $-44.43 | 344 | 56% | $912.89 | 16 |
| mm_tight | **$10754.63** | $789.14 | $-34.51 | 299 | 54% | $586.11 | 9 |
| mm_cheap | **$10588.71** | $1054.47 | $-465.76 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10440.29** | $862.6 | $-422.31 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9975.83** | $-129.92 | $105.75 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9968.5** | $55.61 | $-87.11 | 108 | 95% | $44.87 | 25 |
| maker_flat | **$9796.25** | $-12.95 | $-190.8 | 29 | 48% | $-190.73 | 13 |
| strong_dip | **$9764.02** | $-463.45 | $227.47 | 99 | 60% | $-555.76 | 25 |
| super | **$9722.26** | $-353.9 | $76.16 | 64 | 47% | $-569.75 | 14 |
| copy_pro | **$9654.87** | $-725.28 | $380.15 | 376 | 51% | $-1575.28 | 25 |
| mm_max | **$9448.27** | $-482.6 | $-69.13 | 124 | 52% | $-602.07 | 2 |
| ai_judge | **$9413.98** | $-587.64 | $1.62 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9325.5** | $-538.86 | $-135.64 | 55 | 49% | $-724.57 | 9 |
| mm_slow | **$9151.85** | $-468.35 | $-379.8 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8937.84** | $-561.85 | $-500.31 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8597.98** | $-920.12 | $-481.9 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8299.29** | $-1041.81 | $-658.9 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7178.73** | $-2279.45 | $-541.82 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9393.25** | $-730.36 | $123.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9032.74** | $-942.24 | $-25.02 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8336.25** | $-1937.09 | $273.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 42 | 29 | 2 | 59% | 3.09¢ |
| maker_sports | 64 | 38 | 3 | 63% | 1.62¢ |

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
