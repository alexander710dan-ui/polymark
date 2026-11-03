# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90724 · Last run: 2026-11-03T19:40:05.738Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12534.21** | $2431.07 | $103.14 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11721.61** | $1176.62 | $544.99 | 207 | 57% | $943.29 | 14 |
| mm_tight | **$11216.43** | $840.49 | $375.94 | 648 | 53% | $621.36 | 12 |
| mid_momentum | **$10867.52** | $753.78 | $113.74 | 312 | 56% | $540.3 | 25 |
| maker_flat | **$10811.96** | $188.72 | $623.24 | 56 | 50% | $-5.4 | 25 |
| mm_max | **$10302.31** | $-171.07 | $473.38 | 267 | 53% | $-380.17 | 8 |
| mm_cheap | **$10285.8** | $324.11 | $-38.31 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$9997.27** | $-516.38 | $513.65 | 136 | 52% | $-725.48 | 25 |
| fade_longshot | **$9800.82** | $-203.07 | $3.89 | 179 | 94% | $-213.81 | 25 |
| mm_sports | **$9703.05** | $-768.96 | $472.01 | 766 | 54% | $-988.09 | 15 |
| conviction | **$9685.59** | $-306.99 | $-7.42 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9642.34** | $-471.4 | $113.74 | 147 | 51% | $-663.95 | 25 |
| mm_strong | **$9629.32** | $-453.11 | $82.43 | 206 | 54% | $-657.06 | 25 |
| mm_cheap_v2 | **$9436.16** | $-525.53 | $-38.31 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8757.45** | $-932.29 | $-310.26 | 196 | 59% | $-1025.92 | 24 |
| copy_top | **$8724.71** | $-1201.39 | $-73.9 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8636.08** | $-1203.06 | $-160.86 | 193 | 54% | $-1817.35 | 25 |
| super | **$8616.51** | $-1370.14 | $-13.35 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8473.74** | $-1998.27 | $472.01 | 335 | 51% | $-2217.4 | 15 |
| momentum | **$6813.01** | $-2991.46 | $-195.53 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6546.9** | $-3425.44 | $-27.66 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 221 | 1 | 0 | 100% | 1.32¢ |

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
