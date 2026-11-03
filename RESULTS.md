# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90637 · Last run: 2026-11-03T18:11:29.680Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12544.45** | $2431.07 | $113.38 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11768.38** | $1034.17 | $734.21 | 203 | 56% | $800.84 | 11 |
| mm_tight | **$11194.69** | $716.96 | $477.73 | 644 | 53% | $497.83 | 12 |
| mid_momentum | **$10827** | $753.78 | $73.22 | 312 | 56% | $540.3 | 25 |
| maker_flat | **$10769.08** | $288.72 | $480.36 | 55 | 51% | $94.6 | 25 |
| mm_cheap | **$10265.9** | $324.11 | $-58.21 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10201.94** | $-141.86 | $343.8 | 265 | 53% | $-350.96 | 8 |
| mm_slow | **$10094.54** | $-589.67 | $684.21 | 135 | 52% | $-798.77 | 25 |
| fade_longshot | **$9785.07** | $-203.07 | $-11.86 | 179 | 94% | $-213.81 | 25 |
| mm_sports | **$9777.38** | $-892.49 | $669.87 | 762 | 54% | $-1111.62 | 13 |
| mm_strong | **$9715.38** | $-423.9 | $139.28 | 204 | 54% | $-627.85 | 25 |
| conviction | **$9686.1** | $-306.99 | $-6.91 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9601.82** | $-471.4 | $73.22 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9416.26** | $-525.53 | $-58.21 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8821.47** | $-1025.92 | $-152.61 | 195 | 58% | $-1119.55 | 23 |
| copy_top | **$8730.84** | $-1201.39 | $-67.77 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8623.39** | $-1203.06 | $-173.55 | 193 | 54% | $-1817.35 | 25 |
| super | **$8620.53** | $-1370.14 | $-9.33 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8548.07** | $-2121.8 | $669.87 | 331 | 51% | $-2340.93 | 13 |
| momentum | **$6799.64** | $-2991.46 | $-208.9 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6473.87** | $-3425.44 | $-100.69 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 80 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 214 | 1 | 1 | 100% | 1.32¢ |

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
