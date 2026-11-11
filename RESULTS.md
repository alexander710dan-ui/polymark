# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80016 · Last run: 2026-11-11T11:09:47.592Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13472.01** | $3330.73 | $141.28 | 298 | 59% | $3085.9 | 17 |
| copy_pro | **$12384.73** | $2469.41 | $-84.68 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12367.72** | $1815.35 | $552.37 | 201 | 57% | $1595.53 | 25 |
| mm_tight | **$12323.8** | $2262.66 | $61.14 | 724 | 55% | $2043.53 | 12 |
| mid_momentum | **$11601.34** | $1308.03 | $293.31 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11518.08** | $965.71 | $552.37 | 218 | 55% | $745.89 | 25 |
| mm_sports | **$10773.88** | $692.81 | $81.07 | 862 | 55% | $473.68 | 17 |
| maker_flat | **$10667.19** | $637.84 | $29.35 | 95 | 52% | $443.72 | 18 |
| mid_momentum_v2 | **$10376.16** | $82.85 | $293.31 | 200 | 52% | $-136.97 | 25 |
| mm_max | **$10326.23** | $263.29 | $62.94 | 293 | 54% | $54.19 | 2 |
| fade_longshot | **$9956.73** | $-59.18 | $15.91 | 225 | 95% | $-69.92 | 25 |
| mm_strong | **$9708.66** | $-589.47 | $298.13 | 270 | 53% | $-808.6 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports_v2 | **$9544.57** | $-536.5 | $81.07 | 431 | 54% | $-755.63 | 17 |
| mm_slow | **$9495.8** | $-454.77 | $-49.43 | 177 | 52% | $-673.9 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8721.92** | $-1242.86 | $-35.22 | 232 | 58% | $-1336.49 | 18 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.07** | $-1470.79 | $-152.14 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7544.06** | $-2427.27 | $-28.67 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7413.96** | $-2625.55 | $39.51 | 359 | 66% | $-3113.79 | 25 |
| whale_fade | **$6006.22** | $-4244.08 | $250.3 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 113 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 315 | 1 | 0 | 100% | 1.31¢ |

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
