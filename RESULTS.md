# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30026 · Last run: 2026-08-04T21:52:31.238Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11443.01** | $1331.11 | $111.9 | 385 | 56% | $1111.98 | 23 |
| mm_tight | **$11139.2** | $1436.8 | $-297.6 | 335 | 55% | $1233.77 | 16 |
| mm_cheap | **$10385.71** | $954.47 | $-568.76 | 31 | 71% | $776.69 | 25 |
| mid_momentum | **$10376.31** | $862.6 | $-486.29 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10024.28** | $-193.36 | $217.64 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10001.38** | $-588.91 | $590.29 | 381 | 51% | $-1438.91 | 25 |
| fade_longshot | **$9911.69** | $70.07 | $-158.38 | 111 | 95% | $59.33 | 25 |
| mm_max | **$9759.92** | $-17.02 | $-223.06 | 146 | 54% | $-184.14 | 3 |
| strong_dip | **$9717.28** | $-463.45 | $180.73 | 99 | 60% | $-555.76 | 25 |
| super | **$9702.62** | $-592.35 | $294.97 | 69 | 46% | $-808.2 | 14 |
| maker_sports | **$9549.77** | $-578.2 | $127.97 | 88 | 50% | $-763.91 | 14 |
| ai_judge | **$9398.17** | $-587.64 | $-14.19 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9122.13** | $-468.35 | $-409.52 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9108.39** | $-643.81 | $-247.8 | 57 | 42% | $-837.93 | 15 |
| random_control | **$8860.6** | $-857.37 | $-282.03 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8611.72** | $-924.82 | $-463.46 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8208.26** | $-1041.81 | $-749.93 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7052.51** | $-2370.75 | $-576.74 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9009.63** | $-931.5 | $-58.87 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5093.57** | $-4791.55 | $-114.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 72 | 43 | 3 | 63% | 2.96¢ |
| maker_sports | 102 | 63 | 2 | 62% | 1.58¢ |

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
