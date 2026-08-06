# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32918 · Last run: 2026-08-06T00:51:37.535Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10476.75** | $787.82 | $-311.07 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10416.76** | $561.03 | $-144.27 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10175.06** | $646.52 | $-471.46 | 408 | 54% | $443.49 | 20 |
| super | **$10133.44** | $-306.37 | $439.81 | 74 | 49% | $-522.22 | 16 |
| copy_top | **$9911.9** | $-256.86 | $168.76 | 418 | 52% | $-1585.43 | 25 |
| mm_cheap_v2 | **$9876.75** | $228.14 | $-351.39 | 29 | 59% | $37.32 | 25 |
| fade_longshot | **$9856.51** | $25.97 | $-169.46 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9707.81** | $-21.97 | $-270.22 | 27 | 52% | $-212.79 | 25 |
| strong_dip | **$9589.82** | $-394.63 | $-15.55 | 105 | 60% | $-486.94 | 25 |
| copy_pro | **$9585.77** | $-797.13 | $382.9 | 397 | 51% | $-1647.13 | 25 |
| mm_max | **$9354.87** | $-638.91 | $-6.22 | 179 | 53% | $-806.03 | 8 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9264.93** | $-354.9 | $-380.17 | 478 | 55% | $-574.03 | 25 |
| random_control | **$9086.55** | $-981.12 | $67.67 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8732.01** | $-750.77 | $-517.22 | 60 | 50% | $-936.48 | 25 |
| mm_strong | **$8359.34** | $-1110.56 | $-530.1 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8323.18** | $-1449 | $-227.82 | 87 | 40% | $-1643.12 | 22 |
| mm_sports_v2 | **$8060.7** | $-1617.47 | $-321.83 | 47 | 38% | $-1743.49 | 25 |
| momentum | **$8052.76** | $-1345.47 | $-601.77 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7513.22** | $-2049.18 | $-437.6 | 163 | 47% | $-2252.21 | 18 |
| whale_fade | **$6838.42** | $-2637 | $-524.58 | 419 | 47% | $-2991.55 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.08** | $-931.5 | $-68.42 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 70 | 2 | 61% | 2.95¢ |
| maker_sports | 181 | 113 | 4 | 62% | 1.55¢ |

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
