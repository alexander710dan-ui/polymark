# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82758 · Last run: 2026-11-12T21:57:56.921Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12779.73** | $2206.77 | $572.96 | 378 | 57% | $1961.94 | 20 |
| copy_pro | **$12384.69** | $2469.41 | $-84.72 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11548.61** | $1538.91 | $9.7 | 800 | 54% | $1319.78 | 13 |
| mm_cheap | **$11210.9** | $831.56 | $379.34 | 238 | 55% | $611.74 | 25 |
| maker_flat | **$11117.49** | $939.66 | $177.83 | 124 | 52% | $745.54 | 20 |
| mid_momentum | **$10992.44** | $600.76 | $391.68 | 388 | 55% | $380.94 | 25 |
| mm_max | **$10753.57** | $786.81 | $-33.24 | 317 | 55% | $577.71 | 3 |
| mm_cheap_v2 | **$10361.26** | $-18.08 | $379.34 | 255 | 53% | $-237.9 | 25 |
| fade_longshot | **$9867.57** | $-140.38 | $7.95 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9767.26** | $-624.42 | $391.68 | 223 | 51% | $-844.24 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9559.34** | $-831.89 | $391.23 | 947 | 54% | $-1051.02 | 21 |
| mm_slow | **$9430.72** | $-665.75 | $96.47 | 205 | 52% | $-884.88 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8940.82** | $-1201.6 | $142.42 | 263 | 58% | $-1295.23 | 25 |
| mm_strong | **$8759.29** | $-1281.43 | $40.72 | 319 | 52% | $-1500.56 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.41** | $-1470.79 | $-154.8 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8330.03** | $-2061.2 | $391.23 | 516 | 52% | $-2280.33 | 21 |
| random_control | **$7604.25** | $-2427.27 | $31.52 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7203.15** | $-2738.13 | $-58.72 | 370 | 66% | $-3226.37 | 25 |
| whale_fade | **$5961.89** | $-4244.08 | $205.97 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 144 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 398 | 2 | 0 | 100% | 1.39¢ |

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
