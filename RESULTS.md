# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84765 · Last run: 2026-11-13T23:59:17.026Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13318.41** | $3299.79 | $18.62 | 454 | 57% | $3054.96 | 20 |
| copy_pro | **$12382.67** | $2319.6 | $63.07 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11787.36** | $1839.78 | $-52.42 | 870 | 53% | $1620.65 | 19 |
| mid_momentum | **$11478.12** | $1338.5 | $139.62 | 424 | 55% | $1118.68 | 25 |
| maker_flat | **$11375.08** | $1219.44 | $155.64 | 137 | 53% | $1025.32 | 25 |
| mm_max | **$10943.17** | $835.19 | $107.98 | 340 | 55% | $626.09 | 3 |
| mm_cheap | **$10915.31** | $806.18 | $109.13 | 285 | 53% | $586.36 | 25 |
| mid_momentum_v2 | **$10252.94** | $113.32 | $139.62 | 259 | 52% | $-106.5 | 25 |
| mm_cheap_v2 | **$10065.67** | $-43.46 | $109.13 | 302 | 52% | $-263.28 | 25 |
| fade_longshot | **$9878.8** | $-138.8 | $17.6 | 231 | 94% | $-149.54 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9402.28** | $-560.68 | $-37.04 | 1032 | 53% | $-779.81 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9191.38** | $-792.5 | $-16.12 | 221 | 52% | $-1011.63 | 25 |
| mm_strong | **$8751.12** | $-1270.82 | $21.94 | 373 | 51% | $-1489.95 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8443.46** | $-1626.71 | $70.17 | 285 | 56% | $-1720.34 | 25 |
| copy_top | **$8372.8** | $-1570.4 | $-56.8 | 566 | 53% | $-2898.97 | 2 |
| mm_sports_v2 | **$8172.97** | $-1789.99 | $-37.04 | 601 | 51% | $-2009.12 | 22 |
| random_control | **$7415.47** | $-2535.61 | $-48.92 | 245 | 53% | $-3149.9 | 25 |
| momentum | **$7303.14** | $-2822.65 | $125.79 | 380 | 65% | $-3310.89 | 25 |
| whale_fade | **$5964.03** | $-4034.69 | $-1.28 | 565 | 46% | $-4486.15 | 2 |
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
| maker_flat | 162 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 474 | 4 | 0 | 99% | 1.38¢ |

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
