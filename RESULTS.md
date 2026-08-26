# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16352 · Last run: 2026-08-26T15:37:45.948Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10333.91** | $46.83 | $287.08 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10303.36** | $456.72 | $-153.36 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10281.78** | $583.27 | $-301.49 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10114.37** | $191.42 | $-77.05 | 447 | 53% | $-17.68 | 22 |
| mm_max | **$10011.91** | $-242.96 | $254.87 | 194 | 53% | $-452.06 | 6 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_sports | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| copy_top | **$9998.36** | $-219.6 | $217.96 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9858.39** | $25.97 | $-167.58 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9818.84** | $-1073.61 | $892.45 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9743.48** | $-174.04 | $-82.48 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9628.25** | $-517.26 | $145.51 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9584.92** | $-381.21 | $-33.87 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9143.33** | $-979.49 | $122.82 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8935.2** | $-678.47 | $-386.33 | 528 | 55% | $-897.6 | 24 |
| mm_slow | **$8657.63** | $-809.59 | $-532.78 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8300.12** | $-1184.03 | $-515.85 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7932.29** | $-1478.77 | $-588.94 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7763.91** | $-1983.87 | $-252.22 | 98 | 46% | $-2203 | 23 |
| whale_fade | **$6727.71** | $-2758.9 | $-513.39 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| maker_flat_badsim (retired) | **$8418.83** | $-1290.97 | $-290.2 | 96 | 42% | $-1485.09 | 22 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_sports_badsim (retired) | **$6702.72** | $-2920.71 | $-376.57 | 199 | 46% | $-3123.74 | 17 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


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
