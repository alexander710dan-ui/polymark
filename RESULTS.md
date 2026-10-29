# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71651 · Last run: 2026-10-29T19:27:29.858Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10742.88** | $455.35 | $287.53 | 442 | 53% | $-394.65 | 25 |
| maker_sports | **$10688.12** | $510.56 | $177.56 | 17 | 71% | $319.01 | 7 |
| mm_tight | **$10592.79** | $429.03 | $163.76 | 481 | 53% | $219.93 | 4 |
| mid_momentum | **$10540.87** | $326.8 | $214.07 | 259 | 56% | $113.32 | 20 |
| fade_longshot | **$10095.59** | $89.44 | $6.15 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9968.68** | $-99.1 | $67.78 | 207 | 53% | $-308.2 | 3 |
| maker_flat | **$9933.42** | $93 | $-159.58 | 11 | 55% | $-98.55 | 19 |
| mm_cheap | **$9828.34** | $-325.31 | $153.65 | 78 | 53% | $-507.77 | 17 |
| copy_top | **$9686.65** | $-442.32 | $128.97 | 458 | 53% | $-1770.89 | 14 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| strong_dip | **$9569.02** | $-233.15 | $-197.83 | 139 | 62% | $-325.46 | 11 |
| mm_sports | **$9561.6** | $-599.33 | $160.93 | 570 | 55% | $-818.46 | 7 |
| mid_momentum_v2 | **$9315.69** | $-898.38 | $214.07 | 94 | 48% | $-1089.2 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$8978.7** | $-1174.95 | $153.65 | 95 | 47% | $-1365.77 | 17 |
| random_control | **$8818.41** | $-1189.69 | $8.1 | 180 | 56% | $-1803.98 | 25 |
| mm_strong | **$8745.57** | $-1293.88 | $39.45 | 137 | 50% | $-1497.83 | 17 |
| mm_slow | **$8333.77** | $-1786.92 | $120.69 | 100 | 47% | $-1972.63 | 16 |
| mm_sports_v2 | **$8332.29** | $-1828.64 | $160.93 | 139 | 49% | $-2047.77 | 7 |
| momentum | **$7402.31** | $-2533.86 | $-63.83 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6111.89** | $-3714.82 | $-173.29 | 459 | 46% | $-4069.37 | 14 |
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
| maker_flat | 30 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 24 | 1 | 0 | 96% | 1.79¢ |

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
