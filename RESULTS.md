# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90520 · Last run: 2026-11-03T16:14:45.139Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12545.16** | $2431.07 | $114.09 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11752.07** | $1173.84 | $578.23 | 198 | 57% | $940.51 | 11 |
| mm_tight | **$11217.37** | $927.51 | $289.86 | 640 | 53% | $708.38 | 11 |
| maker_flat | **$10894.92** | $388.72 | $506.2 | 54 | 52% | $194.6 | 24 |
| mid_momentum | **$10841.6** | $753.78 | $87.82 | 312 | 56% | $540.3 | 25 |
| mm_cheap | **$10281** | $324.11 | $-43.11 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10280.58** | $68.64 | $211.94 | 261 | 53% | $-140.46 | 9 |
| mm_slow | **$10031.42** | $-589.67 | $621.09 | 135 | 52% | $-798.77 | 25 |
| fade_longshot | **$9785.79** | $-203.07 | $-11.14 | 179 | 94% | $-213.81 | 25 |
| mm_sports | **$9771.62** | $-734.04 | $505.66 | 757 | 54% | $-953.17 | 13 |
| mm_strong | **$9752.65** | $-322.35 | $75 | 203 | 54% | $-526.3 | 25 |
| conviction | **$9685.22** | $-306.99 | $-7.79 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9616.42** | $-471.4 | $87.82 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9431.36** | $-525.53 | $-43.11 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8785.63** | $-1082.61 | $-131.76 | 192 | 58% | $-1176.24 | 24 |
| copy_top | **$8720.78** | $-1201.39 | $-77.83 | 548 | 53% | $-2529.96 | 20 |
| super | **$8612.78** | $-1370.14 | $-17.08 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8610.39** | $-1203.06 | $-186.55 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$8542.31** | $-1963.35 | $505.66 | 326 | 51% | $-2182.48 | 13 |
| momentum | **$6821.57** | $-2991.46 | $-186.97 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6480.54** | $-3425.44 | $-94.02 | 546 | 47% | $-3876.9 | 21 |
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
| maker_sports | 209 | 1 | 1 | 100% | 1.33¢ |

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
