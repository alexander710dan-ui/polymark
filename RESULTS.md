# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81296 · Last run: 2026-11-12T02:21:10.564Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12756.65** | $3013.2 | $-256.55 | 339 | 58% | $2768.37 | 25 |
| copy_pro | **$12385.74** | $2469.41 | $-83.67 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12140.65** | $2504.62 | $-363.97 | 760 | 54% | $2285.49 | 24 |
| mm_cheap | **$11976.71** | $1693.31 | $283.4 | 212 | 57% | $1473.49 | 25 |
| mid_momentum | **$11506.4** | $1146.2 | $360.2 | 371 | 55% | $926.38 | 25 |
| mm_cheap_v2 | **$11127.07** | $843.67 | $283.4 | 229 | 54% | $623.85 | 25 |
| mm_max | **$10900.85** | $900.85 | $0 | 304 | 55% | $691.75 | 0 |
| maker_flat | **$10863.17** | $653.98 | $209.19 | 109 | 51% | $459.86 | 18 |
| mid_momentum_v2 | **$10281.22** | $-78.98 | $360.2 | 206 | 51% | $-298.8 | 25 |
| mm_sports | **$9943.9** | $261.02 | $-317.12 | 905 | 55% | $41.89 | 25 |
| fade_longshot | **$9822.97** | $-151.76 | $-25.27 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9773.95** | $-145.02 | $-81.03 | 192 | 53% | $-364.15 | 22 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9417.19** | $-613.41 | $30.6 | 290 | 53% | $-832.54 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8714.59** | $-968.29 | $-317.12 | 474 | 53% | $-1187.42 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8440.36** | $-1579.63 | $19.99 | 251 | 57% | $-1673.26 | 22 |
| copy_top | **$8376.92** | $-1470.79 | $-152.29 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7524.04** | $-2427.27 | $-48.69 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7144.74** | $-2787.53 | $-67.73 | 365 | 65% | $-3275.77 | 25 |
| whale_fade | **$5980.4** | $-4244.08 | $224.48 | 563 | 46% | $-4695.54 | 4 |
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
