# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32935 · Last run: 2026-08-06T01:01:04.382Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10476.2** | $787.82 | $-311.62 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10429.5** | $561.03 | $-131.53 | 211 | 56% | $347.55 | 25 |
| super | **$10123.4** | $-202.98 | $326.38 | 75 | 49% | $-418.83 | 15 |
| mm_tight | **$10070.46** | $698.47 | $-628.01 | 410 | 54% | $495.44 | 20 |
| copy_top | **$9941.38** | $-256.86 | $198.24 | 418 | 52% | $-1585.43 | 25 |
| mm_cheap_v2 | **$9928.81** | $126.63 | $-197.82 | 30 | 57% | $-64.19 | 25 |
| fade_longshot | **$9861.17** | $25.97 | $-164.8 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9781.42** | $-21.97 | $-196.61 | 27 | 52% | $-212.79 | 25 |
| strong_dip | **$9592.12** | $-394.63 | $-13.25 | 105 | 60% | $-486.94 | 25 |
| copy_pro | **$9573.59** | $-797.13 | $370.72 | 397 | 51% | $-1647.13 | 25 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9330** | $-261.44 | $-408.56 | 480 | 55% | $-480.57 | 25 |
| random_control | **$9084.55** | $-981.12 | $65.67 | 145 | 57% | $-1595.41 | 25 |
| mm_max | **$9072.48** | $-586.96 | $-340.56 | 181 | 52% | $-754.08 | 7 |
| mm_slow | **$8747.23** | $-750.77 | $-502 | 60 | 50% | $-936.48 | 25 |
| maker_flat | **$8392.92** | $-1549 | $-58.08 | 88 | 40% | $-1743.12 | 21 |
| mm_strong | **$8367.91** | $-1110.56 | $-521.53 | 86 | 47% | $-1314.51 | 25 |
| mm_sports_v2 | **$8096.43** | $-1524.01 | $-379.56 | 49 | 41% | $-1650.03 | 25 |
| momentum | **$8065.4** | $-1345.47 | $-589.13 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7548.71** | $-2004.25 | $-447.04 | 164 | 48% | $-2207.28 | 17 |
| whale_fade | **$6805.95** | $-2637 | $-557.05 | 419 | 47% | $-2991.55 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.08** | $-931.5 | $-68.42 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 70 | 2 | 61% | 2.95¢ |
| maker_sports | 181 | 113 | 5 | 62% | 1.55¢ |

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
