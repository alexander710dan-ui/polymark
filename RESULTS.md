# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34416 · Last run: 2026-08-06T15:14:57.945Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10322.84** | $46.83 | $276.01 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10288.87** | $456.72 | $-167.85 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10264.22** | $583.27 | $-319.05 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10133** | $259.49 | $-126.49 | 451 | 53% | $50.39 | 20 |
| maker_flat | **$10018.85** | $0 | $18.85 | 0 | — | $0 | 5 |
| maker_sports | **$10018.49** | $0 | $18.49 | 0 | — | $0 | 7 |
| copy_top | **$9994.17** | $-219.6 | $213.77 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9924.36** | $29.41 | $-105.05 | 196 | 54% | $-179.69 | 4 |
| fade_longshot | **$9864.81** | $25.97 | $-161.16 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9800.62** | $-1073.61 | $874.23 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9760.53** | $-174.04 | $-65.43 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9635.9** | $-517.26 | $153.16 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9544.71** | $-381.21 | $-74.08 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9371.5** | $-587.64 | $-40.86 | 7 | 14% | $-600 | 2 |
| random_control | **$9131.92** | $-979.49 | $111.41 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8947.84** | $-691.33 | $-360.83 | 532 | 55% | $-910.46 | 22 |
| mm_slow | **$8641.07** | $-809.59 | $-549.34 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8325.34** | $-1184.03 | $-490.63 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7924.51** | $-1478.77 | $-596.72 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7772.77** | $-1915.8 | $-311.43 | 102 | 46% | $-2134.93 | 21 |
| whale_fade | **$6728.84** | $-2758.9 | $-512.26 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8995.87** | $-931.5 | $-72.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| maker_flat_badsim (retired) | **$8350.19** | $-1290.97 | $-358.84 | 96 | 42% | $-1485.09 | 22 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_sports_badsim (retired) | **$6762.07** | $-2926.59 | $-311.34 | 202 | 46% | $-3129.62 | 15 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 5 | 0 | 0 | 100% | 2.84¢ |
| maker_flat_badsim | 118 | 84 | 1 | 58% | 2.9¢ |
| maker_sports | 7 | 0 | 0 | 100% | 1.71¢ |
| maker_sports_badsim | 217 | 135 | 3 | 62% | 1.59¢ |

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
