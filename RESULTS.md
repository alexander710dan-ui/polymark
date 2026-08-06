# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34561 · Last run: 2026-08-06T16:27:03.585Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10211.96** | $513.6 | $-301.64 | 217 | 56% | $300.12 | 25 |
| super | **$10204.17** | $46.83 | $157.34 | 79 | 51% | $-217.5 | 14 |
| mm_cheap | **$10170.72** | $640.15 | $-469.43 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10106.27** | $-7.69 | $113.96 | 2 | 50% | $-100 | 16 |
| maker_flat | **$10070.68** | $-11.32 | $82 | 2 | 50% | $-100 | 10 |
| mm_tight | **$10070.45** | $-164.88 | $235.33 | 457 | 53% | $-373.98 | 20 |
| copy_top | **$9932.69** | $-219.6 | $152.29 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9883.22** | $25.97 | $-142.75 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9756.27** | $-706.11 | $462.38 | 406 | 51% | $-1556.11 | 25 |
| mm_max | **$9698.07** | $-276.89 | $-25.04 | 199 | 53% | $-485.99 | 3 |
| strong_dip | **$9663.28** | $-517.26 | $180.54 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9631.63** | $-117.16 | $-251.21 | 52 | 52% | $-307.98 | 25 |
| mm_cheap_v2 | **$9559.61** | $-426.73 | $-13.66 | 57 | 51% | $-617.55 | 25 |
| ai_judge | **$9382.7** | $-587.64 | $-29.66 | 7 | 14% | $-600 | 2 |
| random_control | **$9079.46** | $-979.49 | $58.95 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8917.31** | $-1116.1 | $33.41 | 538 | 54% | $-1335.23 | 24 |
| mm_slow | **$8605.32** | $-809.59 | $-585.09 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8225.71** | $-1184.03 | $-590.26 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7914.03** | $-1421.89 | $-664.08 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7737.54** | $-2341.02 | $78.56 | 108 | 44% | $-2560.15 | 23 |
| whale_fade | **$6782.91** | $-2758.9 | $-458.19 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9007** | $-931.5 | $-61.5 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8476.25** | $-1937.09 | $413.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8176.86** | $-1590.97 | $-232.17 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6740.06** | $-3334.28 | $74.34 | 208 | 45% | $-3537.31 | 9 |
| longshot (retired) | **$5075.62** | $-4791.55 | $-132.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 0 | 0 | 100% | 2.85¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 18 | 0 | 0 | 100% | 1.33¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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
