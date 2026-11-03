# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90610 · Last run: 2026-11-03T17:44:53.897Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12554.74** | $2431.07 | $123.67 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11667.92** | $1030.09 | $637.83 | 201 | 56% | $796.76 | 13 |
| mm_tight | **$11100.85** | $722.16 | $378.69 | 642 | 53% | $503.03 | 13 |
| mid_momentum | **$10822.78** | $753.78 | $69 | 312 | 56% | $540.3 | 25 |
| maker_flat | **$10799.37** | $288.72 | $510.65 | 55 | 51% | $94.6 | 25 |
| mm_cheap | **$10253.3** | $324.11 | $-70.81 | 142 | 55% | $132.42 | 25 |
| mm_max | **$10161.13** | $-136.66 | $297.79 | 263 | 53% | $-345.76 | 10 |
| mm_slow | **$9974.69** | $-589.67 | $564.36 | 135 | 52% | $-798.77 | 25 |
| fade_longshot | **$9788.22** | $-203.07 | $-8.71 | 179 | 94% | $-213.81 | 25 |
| conviction | **$9685.8** | $-306.99 | $-7.21 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9682.32** | $-887.29 | $569.61 | 760 | 54% | $-1106.42 | 14 |
| mm_strong | **$9654.51** | $-423.9 | $78.41 | 204 | 54% | $-627.85 | 25 |
| mid_momentum_v2 | **$9597.6** | $-471.4 | $69 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9403.66** | $-525.53 | $-70.81 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8779.76** | $-1003.04 | $-217.2 | 193 | 59% | $-1096.67 | 25 |
| copy_top | **$8734.54** | $-1201.39 | $-64.07 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8643.88** | $-1203.06 | $-153.06 | 193 | 54% | $-1817.35 | 25 |
| super | **$8619.95** | $-1370.14 | $-9.91 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8453.01** | $-2116.6 | $569.61 | 329 | 51% | $-2335.73 | 14 |
| momentum | **$6794.78** | $-2991.46 | $-213.76 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6486.43** | $-3425.44 | $-88.13 | 546 | 47% | $-3876.9 | 21 |
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
