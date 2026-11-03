# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90578 · Last run: 2026-11-03T17:13:09.721Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12538.84** | $2431.07 | $107.77 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11614.21** | $1030.09 | $584.12 | 201 | 56% | $796.76 | 13 |
| mm_tight | **$11043.56** | $722.16 | $321.4 | 642 | 53% | $503.03 | 13 |
| maker_flat | **$10857.19** | $288.72 | $568.47 | 55 | 51% | $94.6 | 24 |
| mid_momentum | **$10816.49** | $753.78 | $62.71 | 312 | 56% | $540.3 | 25 |
| mm_cheap | **$10251.52** | $324.11 | $-72.59 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10107.32** | $-136.66 | $243.98 | 263 | 53% | $-345.76 | 10 |
| mm_slow | **$9949.61** | $-589.67 | $539.28 | 135 | 52% | $-798.77 | 25 |
| fade_longshot | **$9789.53** | $-203.07 | $-7.4 | 179 | 94% | $-213.81 | 25 |
| conviction | **$9685.08** | $-306.99 | $-7.93 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9666.22** | $-423.9 | $90.12 | 204 | 54% | $-627.85 | 25 |
| mm_sports | **$9628.31** | $-887.29 | $515.6 | 760 | 54% | $-1106.42 | 14 |
| mid_momentum_v2 | **$9591.31** | $-471.4 | $62.71 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9401.88** | $-525.53 | $-72.59 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8794.61** | $-1003.04 | $-202.35 | 193 | 59% | $-1096.67 | 25 |
| copy_top | **$8735.68** | $-1201.39 | $-62.93 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8649.72** | $-1203.06 | $-147.22 | 193 | 54% | $-1817.35 | 25 |
| super | **$8618.49** | $-1370.14 | $-11.37 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8399** | $-2116.6 | $515.6 | 329 | 51% | $-2335.73 | 14 |
| momentum | **$6800.37** | $-2991.46 | $-208.17 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6475.81** | $-3425.44 | $-98.75 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 79 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 214 | 1 | 0 | 100% | 1.32¢ |

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
