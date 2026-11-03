# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90815 · Last run: 2026-11-03T21:10:14.025Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12534.41** | $2431.07 | $103.34 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11263.93** | $840.55 | $423.38 | 212 | 56% | $607.22 | 10 |
| mm_tight | **$10974.58** | $706 | $268.58 | 651 | 53% | $486.87 | 10 |
| maker_flat | **$10804.52** | $188.72 | $615.8 | 56 | 50% | $-5.4 | 25 |
| mid_momentum | **$10695.75** | $753.78 | $-58.03 | 312 | 56% | $540.3 | 25 |
| mm_cheap | **$10205.17** | $324.11 | $-118.94 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10167.86** | $-203.36 | $371.22 | 269 | 53% | $-412.46 | 7 |
| mm_slow | **$9972.71** | $-618.28 | $590.99 | 137 | 52% | $-827.38 | 25 |
| fade_longshot | **$9800.85** | $-203.07 | $3.92 | 179 | 94% | $-213.81 | 25 |
| conviction | **$9683.55** | $-306.99 | $-9.46 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9610.94** | $-555.01 | $165.95 | 207 | 54% | $-758.96 | 25 |
| mid_momentum_v2 | **$9470.57** | $-471.4 | $-58.03 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9355.53** | $-525.53 | $-118.94 | 159 | 52% | $-717.22 | 25 |
| mm_sports | **$9243.69** | $-1122.13 | $365.82 | 771 | 54% | $-1341.26 | 11 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8943.65** | $-802.58 | $-253.77 | 198 | 59% | $-896.21 | 22 |
| copy_top | **$8723.85** | $-1201.39 | $-74.76 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8632.24** | $-1203.06 | $-164.7 | 193 | 54% | $-1817.35 | 25 |
| super | **$8612.44** | $-1370.14 | $-17.42 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8014.38** | $-2351.44 | $365.82 | 340 | 51% | $-2570.57 | 11 |
| momentum | **$6794.62** | $-2991.46 | $-213.92 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6563.54** | $-3425.44 | $-11.02 | 546 | 47% | $-3876.9 | 21 |
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
| maker_sports | 222 | 1 | 0 | 100% | 1.32¢ |

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
