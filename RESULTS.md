# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33450 · Last run: 2026-08-06T05:48:14.165Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10501.91** | $341.78 | $160.13 | 429 | 53% | $132.68 | 7 |
| mid_momentum | **$10402.07** | $559.07 | $-157 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10361.83** | $685.62 | $-323.79 | 37 | 62% | $507.84 | 25 |
| super | **$10339.91** | $46.83 | $293.08 | 79 | 51% | $-217.5 | 11 |
| copy_top | **$10113.28** | $-117.05 | $230.33 | 424 | 52% | $-1445.62 | 20 |
| mid_momentum_v2 | **$9952.18** | $-39.13 | $-8.69 | 41 | 51% | $-229.95 | 24 |
| mm_cheap_v2 | **$9935.95** | $-63.55 | $-0.5 | 45 | 53% | $-254.37 | 20 |
| fade_longshot | **$9863.3** | $25.97 | $-162.67 | 123 | 95% | $15.23 | 25 |
| mm_sports | **$9819.36** | $-308.35 | $127.71 | 505 | 55% | $-527.48 | 8 |
| copy_pro | **$9663.28** | $-816.24 | $479.52 | 403 | 51% | $-1666.24 | 23 |
| mm_max | **$9657.81** | $-434.4 | $92.21 | 192 | 53% | $-643.5 | 1 |
| strong_dip | **$9515.96** | $-494.63 | $10.59 | 106 | 59% | $-586.94 | 25 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$9002.46** | $-1085.22 | $87.68 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8707.7** | $-809.59 | $-482.71 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8707.1** | $-1218.24 | $-74.66 | 93 | 42% | $-1412.36 | 17 |
| mm_sports_v2 | **$8562.14** | $-1613.85 | $175.99 | 75 | 44% | $-1832.98 | 6 |
| mm_strong | **$8389.87** | $-1215.02 | $-395.11 | 91 | 46% | $-1418.97 | 25 |
| momentum | **$7988.37** | $-1376.42 | $-635.21 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7781.58** | $-2362.76 | $144.34 | 184 | 47% | $-2565.79 | 4 |
| whale_fade | **$6619.7** | $-2848.81 | $-531.49 | 425 | 47% | $-3203.36 | 20 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.89** | $-931.5 | $-70.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.32** | $-4791.55 | $-99.13 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 110 | 76 | 1 | 59% | 2.96¢ |
| maker_sports | 188 | 121 | 1 | 61% | 1.53¢ |

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
