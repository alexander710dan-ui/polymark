# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33374 · Last run: 2026-08-06T05:05:51.049Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10410.6** | $559.07 | $-148.47 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10375.47** | $685.62 | $-310.15 | 37 | 62% | $507.84 | 25 |
| super | **$10328.19** | $46.83 | $281.36 | 79 | 51% | $-217.5 | 11 |
| mm_tight | **$10284.44** | $341.78 | $-57.34 | 429 | 53% | $132.68 | 6 |
| copy_top | **$10099.4** | $-117.05 | $216.45 | 424 | 52% | $-1445.62 | 20 |
| fade_longshot | **$9863.38** | $25.97 | $-162.59 | 123 | 95% | $15.23 | 25 |
| mm_cheap_v2 | **$9723.61** | $-63.55 | $-212.84 | 45 | 53% | $-254.37 | 18 |
| copy_pro | **$9711.71** | $-816.24 | $527.95 | 403 | 51% | $-1666.24 | 22 |
| mid_momentum_v2 | **$9708.77** | $-39.13 | $-252.1 | 41 | 51% | $-229.95 | 21 |
| strong_dip | **$9626.66** | $-494.63 | $121.29 | 106 | 59% | $-586.94 | 25 |
| mm_sports | **$9601.9** | $-308.35 | $-89.75 | 505 | 55% | $-527.48 | 7 |
| mm_max | **$9529.06** | $-434.4 | $-36.54 | 192 | 53% | $-643.5 | 1 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$9000.66** | $-1085.22 | $85.88 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8729.71** | $-809.59 | $-460.7 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8572.24** | $-1218.24 | $-209.52 | 93 | 42% | $-1412.36 | 16 |
| mm_sports_v2 | **$8344.68** | $-1613.85 | $-41.47 | 75 | 44% | $-1832.98 | 5 |
| mm_strong | **$8271.58** | $-1215.02 | $-513.4 | 91 | 46% | $-1418.97 | 24 |
| momentum | **$8003.01** | $-1376.42 | $-620.57 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7597.11** | $-2362.76 | $-40.13 | 184 | 47% | $-2565.79 | 4 |
| whale_fade | **$6623.79** | $-2848.81 | $-527.4 | 425 | 47% | $-3203.36 | 20 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.89** | $-931.5 | $-70.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.32** | $-4791.55 | $-99.13 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 75 | 2 | 59% | 2.95¢ |
| maker_sports | 188 | 121 | 0 | 61% | 1.53¢ |

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
