# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84410 · Last run: 2026-11-13T18:19:49.623Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12776.72** | $2853.99 | $-77.27 | 426 | 57% | $2609.16 | 17 |
| copy_pro | **$12384.24** | $2469.41 | $-85.17 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12181.69** | $2222.62 | $-40.93 | 840 | 54% | $2003.49 | 12 |
| mid_momentum | **$11443.32** | $1217.31 | $226.01 | 418 | 55% | $997.49 | 25 |
| mm_cheap | **$11282.4** | $1069.76 | $212.64 | 273 | 55% | $849.94 | 25 |
| maker_flat | **$11215.63** | $1073.69 | $141.94 | 135 | 53% | $879.57 | 23 |
| mm_max | **$11113.69** | $1145.84 | $-32.15 | 335 | 56% | $936.74 | 3 |
| mm_cheap_v2 | **$10432.76** | $220.12 | $212.64 | 290 | 53% | $0.3 | 25 |
| mid_momentum_v2 | **$10218.14** | $-7.87 | $226.01 | 253 | 52% | $-227.69 | 25 |
| fade_longshot | **$9877.4** | $-140.38 | $17.78 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9263.2** | $-627.32 | $-109.48 | 998 | 54% | $-846.45 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9140.43** | $-628.27 | $-231.3 | 218 | 52% | $-847.4 | 25 |
| mm_strong | **$8769.62** | $-1301.64 | $71.26 | 349 | 53% | $-1520.77 | 25 |
| strong_dip | **$8729.37** | $-1377 | $106.37 | 274 | 58% | $-1470.63 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.45** | $-1470.79 | $-154.76 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8033.89** | $-1856.63 | $-109.48 | 567 | 52% | $-2075.76 | 19 |
| random_control | **$7591** | $-2434.87 | $25.87 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7317.41** | $-2722.45 | $39.86 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.7** | $-4244.08 | $215.78 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 158 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 443 | 2 | 0 | 100% | 1.39¢ |

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
