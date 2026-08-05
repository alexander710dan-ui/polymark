# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32013 · Last run: 2026-08-05T16:27:40.889Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11092.55** | $1001.51 | $91.04 | 376 | 54% | $798.48 | 17 |
| mid_momentum | **$10729.55** | $967.28 | $-237.73 | 206 | 58% | $753.8 | 25 |
| mm_sports | **$10724.83** | $951.8 | $-226.97 | 439 | 56% | $732.67 | 25 |
| mm_cheap | **$10505.18** | $887.82 | $-382.64 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9938.03** | $111.17 | $-173.14 | 118 | 96% | $100.43 | 25 |
| super | **$9887.21** | $-425.73 | $312.94 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9840.13** | $-31.46 | $-128.41 | 7 | 57% | $-128.96 | 25 |
| mm_max | **$9747.7** | $-330.56 | $78.26 | 163 | 53% | $-497.68 | 5 |
| copy_top | **$9718.84** | $-477.25 | $196.09 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9611.2** | $-139.8 | $-249 | 8 | 50% | $-237.3 | 25 |
| mm_sports_v2 | **$9516.16** | $-139.8 | $-344.04 | 8 | 50% | $-237.3 | 21 |
| strong_dip | **$9459.27** | $-528.32 | $-12.41 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9328.62** | $-937.88 | $266.5 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9134.09** | $-516.83 | $-349.08 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8849.83** | $-1058.61 | $-91.56 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8775** | $-876.62 | $-348.38 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8751.46** | $-964.88 | $-283.66 | 130 | 50% | $-1167.91 | 11 |
| maker_flat | **$8353.12** | $-1380.33 | $-266.55 | 76 | 39% | $-1574.45 | 20 |
| momentum | **$8239.69** | $-1076.77 | $-683.54 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7311.63** | $-2055.23 | $-633.14 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 96 | 62 | 1 | 61% | 2.99¢ |
| maker_sports | 141 | 93 | 7 | 60% | 1.58¢ |

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
