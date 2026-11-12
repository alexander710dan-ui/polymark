# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81218 · Last run: 2026-11-12T01:31:06.485Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12889.94** | $3013.2 | $-123.26 | 339 | 58% | $2768.37 | 25 |
| copy_pro | **$12385.19** | $2469.41 | $-84.22 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12284.83** | $2504.62 | $-219.79 | 760 | 54% | $2285.49 | 24 |
| mm_cheap | **$11987.35** | $1693.31 | $294.04 | 212 | 57% | $1473.49 | 25 |
| mid_momentum | **$11518.5** | $1146.2 | $372.3 | 371 | 55% | $926.38 | 25 |
| mm_cheap_v2 | **$11137.71** | $843.67 | $294.04 | 229 | 54% | $623.85 | 25 |
| mm_max | **$10900.85** | $900.85 | $0 | 304 | 55% | $691.75 | 0 |
| maker_flat | **$10825.05** | $595.25 | $229.8 | 108 | 51% | $401.13 | 19 |
| mid_momentum_v2 | **$10293.32** | $-78.98 | $372.3 | 206 | 51% | $-298.8 | 25 |
| mm_sports | **$10075.1** | $261.02 | $-185.92 | 905 | 55% | $41.89 | 25 |
| fade_longshot | **$9855.65** | $-151.76 | $7.41 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9724.04** | $-204.41 | $-71.55 | 191 | 52% | $-423.54 | 23 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9398.44** | $-613.41 | $11.85 | 290 | 53% | $-832.54 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8845.79** | $-968.29 | $-185.92 | 474 | 53% | $-1187.42 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8459.35** | $-1579.63 | $38.98 | 251 | 57% | $-1673.26 | 22 |
| copy_top | **$8376.79** | $-1470.79 | $-152.42 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7565.36** | $-2427.27 | $-7.37 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7231.23** | $-2787.53 | $18.76 | 365 | 65% | $-3275.77 | 25 |
| whale_fade | **$5972.31** | $-4244.08 | $216.39 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 127 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 364 | 2 | 0 | 99% | 1.38¢ |

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
