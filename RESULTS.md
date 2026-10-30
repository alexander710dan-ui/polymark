# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 74148 · Last run: 2026-10-30T05:14:25.780Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11683.95** | $1593.7 | $90.25 | 463 | 53% | $743.7 | 20 |
| maker_sports | **$11184.9** | $1164.71 | $20.19 | 39 | 69% | $973.16 | 6 |
| mm_tight | **$11036.7** | $1037.53 | $-0.83 | 500 | 54% | $828.43 | 5 |
| mid_momentum | **$10963.79** | $766.55 | $197.24 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10556.07** | $519.74 | $36.33 | 97 | 58% | $337.28 | 25 |
| mm_max | **$10253.08** | $259.14 | $-6.06 | 215 | 54% | $50.04 | 1 |
| mm_sports | **$10129.5** | $122.13 | $7.37 | 593 | 55% | $-97 | 6 |
| copy_top | **$10123.5** | $116.37 | $7.13 | 479 | 53% | $-1212.2 | 16 |
| super | **$10122.95** | $87.83 | $35.12 | 95 | 53% | $-194.07 | 3 |
| fade_longshot | **$10083.06** | $89.44 | $-6.38 | 152 | 95% | $78.7 | 25 |
| conviction | **$9999.91** | $0 | $-0.09 | 0 | — | $0 | 2 |
| maker_flat | **$9922.77** | $-204.96 | $127.73 | 15 | 47% | $-396.51 | 25 |
| mid_momentum_v2 | **$9738.61** | $-458.63 | $197.24 | 109 | 51% | $-649.45 | 25 |
| mm_cheap_v2 | **$9706.43** | $-329.9 | $36.33 | 114 | 53% | $-520.72 | 25 |
| mm_strong | **$9319.54** | $-673.29 | $-7.17 | 152 | 53% | $-877.24 | 24 |
| strong_dip | **$9217.81** | $-606.44 | $-175.75 | 148 | 60% | $-698.75 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8900.19** | $-1107.18 | $7.37 | 162 | 52% | $-1326.31 | 6 |
| mm_slow | **$8744.13** | $-1329.39 | $73.52 | 108 | 50% | $-1515.1 | 25 |
| random_control | **$8620.75** | $-1304.86 | $-74.39 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7430.99** | $-2533.86 | $-35.15 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5601.38** | $-4210.18 | $-188.44 | 480 | 46% | $-4564.73 | 16 |
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
| maker_sports | 45 | 1 | 0 | 98% | 1.48¢ |

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
