# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90525 · Last run: 2026-11-03T16:19:45.521Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12541.29** | $2431.07 | $110.22 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11750.82** | $1173.84 | $576.98 | 198 | 57% | $940.51 | 12 |
| mm_tight | **$11224.07** | $927.51 | $296.56 | 640 | 53% | $708.38 | 11 |
| maker_flat | **$10894.05** | $388.72 | $505.33 | 54 | 52% | $194.6 | 24 |
| mid_momentum | **$10842.12** | $753.78 | $88.34 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10287.33** | $68.64 | $218.69 | 261 | 53% | $-140.46 | 9 |
| mm_cheap | **$10281.68** | $324.11 | $-42.43 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$10042.56** | $-589.67 | $632.23 | 135 | 52% | $-798.77 | 25 |
| fade_longshot | **$9785.49** | $-203.07 | $-11.44 | 179 | 94% | $-213.81 | 25 |
| mm_sports | **$9778.32** | $-734.04 | $512.36 | 757 | 54% | $-953.17 | 13 |
| mm_strong | **$9762.7** | $-322.35 | $85.05 | 203 | 54% | $-526.3 | 25 |
| conviction | **$9685.15** | $-306.99 | $-7.86 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9616.94** | $-471.4 | $88.34 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9432.04** | $-525.53 | $-42.43 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8789.17** | $-1082.61 | $-128.22 | 192 | 58% | $-1176.24 | 24 |
| copy_top | **$8721.87** | $-1201.39 | $-76.74 | 548 | 53% | $-2529.96 | 20 |
| super | **$8614.14** | $-1370.14 | $-15.72 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8611.08** | $-1203.06 | $-185.86 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$8549.01** | $-1963.35 | $512.36 | 326 | 51% | $-2182.48 | 13 |
| momentum | **$6820.78** | $-2991.46 | $-187.76 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6479.82** | $-3425.44 | $-94.74 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 78 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 210 | 1 | 0 | 100% | 1.33¢ |

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
