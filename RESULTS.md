# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71634 · Last run: 2026-10-29T19:23:30.539Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10689.7** | $455.35 | $234.35 | 442 | 53% | $-394.65 | 25 |
| maker_sports | **$10654.5** | $510.56 | $143.94 | 17 | 71% | $319.01 | 7 |
| mm_tight | **$10559.92** | $429.03 | $130.89 | 481 | 53% | $219.93 | 4 |
| mid_momentum | **$10511.14** | $326.8 | $184.34 | 259 | 56% | $113.32 | 20 |
| fade_longshot | **$10095.01** | $89.44 | $5.57 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9935.81** | $-99.1 | $34.91 | 207 | 53% | $-308.2 | 3 |
| maker_flat | **$9935.04** | $93 | $-157.96 | 11 | 55% | $-98.55 | 19 |
| mm_cheap | **$9798.46** | $-325.31 | $123.77 | 78 | 53% | $-507.77 | 17 |
| copy_top | **$9645.36** | $-492.14 | $137.5 | 457 | 53% | $-1820.71 | 15 |
| strong_dip | **$9597.77** | $-233.15 | $-169.08 | 139 | 62% | $-325.46 | 11 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9528.7** | $-599.33 | $128.03 | 570 | 55% | $-818.46 | 7 |
| mid_momentum_v2 | **$9285.96** | $-898.38 | $184.34 | 94 | 48% | $-1089.2 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$8948.82** | $-1174.95 | $123.77 | 95 | 47% | $-1365.77 | 17 |
| random_control | **$8825.38** | $-1189.69 | $15.07 | 180 | 56% | $-1803.98 | 25 |
| mm_strong | **$8715.85** | $-1293.88 | $9.73 | 137 | 50% | $-1497.83 | 17 |
| mm_slow | **$8304.04** | $-1786.92 | $90.96 | 100 | 47% | $-1972.63 | 16 |
| mm_sports_v2 | **$8299.39** | $-1828.64 | $128.03 | 139 | 49% | $-2047.77 | 7 |
| momentum | **$7402.31** | $-2533.86 | $-63.83 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6153.68** | $-3611.57 | $-234.75 | 458 | 47% | $-3966.12 | 15 |
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
