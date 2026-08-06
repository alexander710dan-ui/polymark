# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34399 · Last run: 2026-08-06T14:36:44.507Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10330.01** | $46.83 | $283.18 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10311.61** | $456.72 | $-145.11 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10286.65** | $583.27 | $-296.62 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10066.06** | $191.42 | $-125.36 | 447 | 53% | $-17.68 | 22 |
| copy_top | **$9997.71** | $-219.6 | $217.31 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9970.38** | $-242.96 | $213.33 | 194 | 53% | $-452.06 | 6 |
| fade_longshot | **$9858.3** | $25.97 | $-167.67 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9818.42** | $-1073.61 | $892.03 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9736.83** | $-174.04 | $-89.13 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9623.29** | $-517.26 | $140.55 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9564.43** | $-381.21 | $-54.36 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9144.66** | $-979.49 | $124.15 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8901.6** | $-678.47 | $-419.93 | 528 | 55% | $-897.6 | 24 |
| mm_slow | **$8663.5** | $-809.59 | $-526.91 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8417.93** | $-1290.97 | $-291.1 | 96 | 42% | $-1485.09 | 22 |
| mm_strong | **$8288.26** | $-1184.03 | $-527.71 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7934.81** | $-1478.77 | $-586.42 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7715.74** | $-1983.87 | $-300.39 | 98 | 46% | $-2203 | 23 |
| whale_fade | **$6724.16** | $-2758.9 | $-516.94 | 426 | 47% | $-3113.45 | 25 |
| maker_sports | **$6655.91** | $-2920.71 | $-423.38 | 199 | 46% | $-3123.74 | 16 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 118 | 83 | 2 | 59% | 2.9¢ |
| maker_sports | 215 | 135 | 5 | 61% | 1.59¢ |

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
