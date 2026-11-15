# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86761 · Last run: 2026-11-15T01:37:42.093Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$14077.21** | $4182.92 | $-105.71 | 514 | 58% | $3938.09 | 18 |
| copy_pro | **$12169.77** | $2319.6 | $-149.83 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11579.83** | $1905.65 | $-325.82 | 919 | 53% | $1686.52 | 20 |
| mid_momentum | **$11037.48** | $1010.67 | $26.81 | 441 | 55% | $790.85 | 25 |
| maker_flat | **$10943.61** | $919.44 | $24.17 | 140 | 52% | $725.32 | 24 |
| mm_max | **$10600.36** | $601.36 | $-1 | 346 | 55% | $392.26 | 1 |
| mm_cheap | **$10042.52** | $139.47 | $-96.95 | 307 | 52% | $-80.35 | 23 |
| fade_longshot | **$9908.34** | $-129.36 | $37.7 | 232 | 94% | $-140.1 | 25 |
| mid_momentum_v2 | **$9812.3** | $-214.51 | $26.81 | 276 | 52% | $-434.33 | 25 |
| mm_sports | **$9606.05** | $-293.26 | $-100.69 | 1093 | 54% | $-512.39 | 18 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9192.88** | $-710.17 | $-96.95 | 324 | 51% | $-929.99 | 23 |
| mm_slow | **$9015.85** | $-932.05 | $-52.1 | 226 | 51% | $-1151.18 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8376.74** | $-1522.57 | $-100.69 | 662 | 52% | $-1741.7 | 18 |
| strong_dip | **$8351.61** | $-1847.37 | $198.98 | 296 | 56% | $-1941 | 25 |
| mm_strong | **$8263.4** | $-1591.63 | $-144.97 | 398 | 51% | $-1810.76 | 24 |
| copy_top | **$8227.71** | $-1672.4 | $-99.89 | 567 | 53% | $-3000.97 | 1 |
| momentum | **$7591.83** | $-2592.82 | $184.65 | 381 | 65% | $-3081.06 | 25 |
| random_control | **$7286.91** | $-2688.93 | $-24.16 | 252 | 53% | $-3303.22 | 25 |
| whale_fade | **$6072.66** | $-4002.69 | $75.35 | 566 | 46% | $-4454.15 | 1 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 164 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 532 | 4 | 0 | 99% | 1.4¢ |

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
