# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 76157 · Last run: 2026-10-30T13:03:14.597Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11864.56** | $1750.04 | $114.52 | 466 | 53% | $900.04 | 25 |
| maker_sports | **$11420.51** | $1309.77 | $110.74 | 43 | 67% | $1097.27 | 12 |
| mm_tight | **$11195.88** | $1040.33 | $155.55 | 505 | 54% | $831.23 | 9 |
| mid_momentum | **$10919.6** | $766.55 | $153.05 | 274 | 57% | $553.07 | 25 |
| mm_max | **$10538.26** | $377.38 | $160.88 | 218 | 54% | $168.28 | 4 |
| mm_cheap | **$10468.02** | $487.5 | $-19.48 | 99 | 58% | $305.04 | 25 |
| mm_sports | **$10210.55** | $139.28 | $71.27 | 598 | 55% | $-79.85 | 12 |
| copy_top | **$10209.79** | $263.43 | $-53.64 | 482 | 54% | $-1065.14 | 25 |
| fade_longshot | **$10097.26** | $93.52 | $3.74 | 153 | 95% | $82.78 | 25 |
| super | **$9950.87** | $-117.27 | $68.14 | 96 | 52% | $-399.17 | 4 |
| maker_flat | **$9944.05** | $-204.96 | $149.01 | 15 | 47% | $-396.51 | 25 |
| conviction | **$9896.7** | $-102.55 | $-0.75 | 1 | 0% | $0 | 2 |
| mid_momentum_v2 | **$9694.42** | $-458.63 | $153.05 | 109 | 51% | $-649.45 | 25 |
| mm_cheap_v2 | **$9618.38** | $-362.14 | $-19.48 | 116 | 53% | $-552.96 | 25 |
| mm_strong | **$9466.57** | $-489.29 | $-44.14 | 155 | 54% | $-693.24 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9125.86** | $-708.69 | $-165.45 | 149 | 60% | $-801 | 21 |
| mm_sports_v2 | **$8981.24** | $-1090.03 | $71.27 | 167 | 51% | $-1309.16 | 12 |
| random_control | **$8655.2** | $-1304.86 | $-39.94 | 187 | 55% | $-1919.15 | 25 |
| mm_slow | **$8578.38** | $-1361.63 | $-59.99 | 110 | 50% | $-1547.34 | 25 |
| momentum | **$7385.62** | $-2529.78 | $-84.6 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5567.63** | $-4257.58 | $-174.79 | 483 | 46% | $-4612.13 | 25 |
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
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 55 | 1 | 0 | 98% | 1.52¢ |

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
