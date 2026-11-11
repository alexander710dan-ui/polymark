# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79283 · Last run: 2026-11-11T02:28:59.512Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.08** | $2469.41 | $-84.33 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12109.17** | $2455.35 | $-346.18 | 269 | 58% | $2210.52 | 25 |
| mm_cheap | **$11741.13** | $1467.47 | $273.66 | 184 | 57% | $1247.65 | 25 |
| mid_momentum | **$11429.04** | $1153.8 | $275.24 | 354 | 55% | $933.98 | 25 |
| mm_tight | **$11110.38** | $1708.45 | $-598.07 | 699 | 54% | $1489.32 | 22 |
| mm_cheap_v2 | **$10891.49** | $617.83 | $273.66 | 201 | 54% | $398.01 | 25 |
| maker_flat | **$10767.89** | $737.84 | $30.05 | 94 | 52% | $543.72 | 15 |
| mm_max | **$10223.31** | $324.53 | $-101.22 | 291 | 54% | $115.43 | 2 |
| mid_momentum_v2 | **$10203.86** | $-71.38 | $275.24 | 189 | 51% | $-291.2 | 25 |
| fade_longshot | **$9915.01** | $-104.88 | $19.89 | 218 | 94% | $-115.62 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9444.69** | $-142.09 | $-413.22 | 832 | 55% | $-361.22 | 25 |
| mm_slow | **$9375.67** | $-393.53 | $-230.8 | 175 | 52% | $-612.66 | 17 |
| mm_strong | **$9235.89** | $-724.23 | $-39.88 | 255 | 53% | $-943.36 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8946.42** | $-1038.01 | $-15.57 | 230 | 58% | $-1131.64 | 16 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.48** | $-1470.79 | $-151.73 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8215.38** | $-1371.4 | $-413.22 | 401 | 53% | $-1590.53 | 25 |
| random_control | **$7620.94** | $-2393.67 | $14.61 | 232 | 53% | $-3007.96 | 25 |
| momentum | **$7510.32** | $-2656.88 | $167.2 | 349 | 66% | $-3145.12 | 25 |
| whale_fade | **$6008.51** | $-4244.08 | $252.59 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 109 | 0 | 0 | 100% | 2.59¢ |
| maker_sports | 294 | 1 | 0 | 100% | 1.31¢ |

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
