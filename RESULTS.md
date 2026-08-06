# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32980 · Last run: 2026-08-06T01:26:05.957Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10465.96** | $787.82 | $-321.86 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10428.92** | $561.03 | $-132.11 | 211 | 56% | $347.55 | 25 |
| super | **$10128.51** | $-110 | $238.51 | 76 | 50% | $-325.85 | 14 |
| mm_tight | **$10119.74** | $596.97 | $-477.23 | 411 | 54% | $393.94 | 21 |
| copy_top | **$10004.82** | $-256.86 | $261.68 | 418 | 52% | $-1585.43 | 25 |
| mm_cheap_v2 | **$9926.25** | $188.61 | $-262.36 | 31 | 58% | $-2.21 | 25 |
| fade_longshot | **$9867.86** | $25.97 | $-158.11 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9762.37** | $40.01 | $-277.64 | 28 | 54% | $-150.81 | 25 |
| copy_pro | **$9604.08** | $-797.13 | $401.21 | 397 | 51% | $-1647.13 | 25 |
| strong_dip | **$9602.94** | $-394.63 | $-2.43 | 105 | 60% | $-486.94 | 25 |
| mm_sports | **$9373.43** | $-300.96 | $-325.61 | 482 | 55% | $-520.09 | 25 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_max | **$9198.38** | $-688.46 | $-113.16 | 182 | 52% | $-855.58 | 7 |
| random_control | **$9047.12** | $-981.12 | $28.24 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8799.12** | $-750.77 | $-450.11 | 60 | 50% | $-936.48 | 25 |
| maker_flat | **$8389.69** | $-1549 | $-61.31 | 88 | 40% | $-1743.12 | 21 |
| mm_strong | **$8365.55** | $-1110.56 | $-523.89 | 86 | 47% | $-1314.51 | 25 |
| mm_sports_v2 | **$8101.61** | $-1563.53 | $-334.86 | 51 | 41% | $-1689.55 | 25 |
| momentum | **$8083.85** | $-1345.47 | $-570.68 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7571.66** | $-2037.58 | $-390.76 | 166 | 48% | $-2240.61 | 15 |
| whale_fade | **$6737.63** | $-2637 | $-625.37 | 419 | 47% | $-2991.55 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 181 | 116 | 5 | 61% | 1.55¢ |

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
