# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29233 · Last run: 2026-08-04T14:31:20.291Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11252.76** | $850.99 | $401.77 | 352 | 56% | $647.96 | 21 |
| mm_tight | **$10776.19** | $423.07 | $353.12 | 304 | 53% | $220.04 | 16 |
| mm_cheap | **$10632.64** | $1054.47 | $-421.83 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10533.04** | $862.6 | $-329.56 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9937.84** | $-129.92 | $67.76 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9888.72** | $55.61 | $-166.89 | 108 | 95% | $44.87 | 25 |
| super | **$9826.46** | $-507.95 | $334.41 | 65 | 46% | $-723.8 | 14 |
| maker_flat | **$9772.85** | $-370.45 | $143.3 | 36 | 44% | $-548.23 | 16 |
| copy_pro | **$9718.14** | $-725.28 | $443.42 | 376 | 51% | $-1575.28 | 25 |
| mm_max | **$9683.68** | $-745.82 | $429.5 | 128 | 51% | $-865.29 | 5 |
| strong_dip | **$9682.51** | $-463.45 | $145.96 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9411.5** | $-587.64 | $-0.86 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9323.57** | $-900.33 | $223.9 | 61 | 46% | $-1086.04 | 13 |
| mm_slow | **$9201.18** | $-468.35 | $-330.47 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9075.36** | $-561.85 | $-362.79 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8689.25** | $-920.12 | $-390.63 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8201.33** | $-1041.81 | $-756.86 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7311.04** | $-2279.45 | $-409.51 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9016.51** | $-942.24 | $-41.25 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8412.91** | $-1937.09 | $350 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 52 | 34 | 4 | 60% | 3.02¢ |
| maker_sports | 74 | 44 | 4 | 63% | 1.57¢ |

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
