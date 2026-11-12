# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81350 · Last run: 2026-11-12T02:56:13.710Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13018.32** | $2813.2 | $205.12 | 341 | 57% | $2568.37 | 24 |
| copy_pro | **$12385.53** | $2469.41 | $-83.88 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12201.01** | $2299.82 | $-98.81 | 762 | 54% | $2080.69 | 22 |
| mm_cheap | **$12126.69** | $1590.41 | $536.28 | 213 | 56% | $1370.59 | 25 |
| mid_momentum | **$11617.64** | $1146.2 | $471.44 | 371 | 55% | $926.38 | 25 |
| mm_cheap_v2 | **$11277.05** | $740.77 | $536.28 | 230 | 54% | $520.95 | 25 |
| mm_max | **$10900.85** | $900.85 | $0 | 304 | 55% | $691.75 | 0 |
| maker_flat | **$10881.95** | $653.98 | $227.97 | 109 | 51% | $459.86 | 19 |
| mid_momentum_v2 | **$10392.46** | $-78.98 | $471.44 | 206 | 51% | $-298.8 | 25 |
| mm_sports | **$10193.7** | $55.87 | $137.83 | 907 | 54% | $-163.26 | 24 |
| fade_longshot | **$9867.22** | $-151.76 | $18.98 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9791.65** | $-145.02 | $-63.33 | 192 | 53% | $-364.15 | 22 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9523.59** | $-613.41 | $137 | 290 | 53% | $-832.54 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8964.39** | $-1173.44 | $137.83 | 476 | 53% | $-1392.57 | 24 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8475.21** | $-1579.63 | $54.84 | 251 | 57% | $-1673.26 | 23 |
| copy_top | **$8376.49** | $-1470.79 | $-152.72 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7552.75** | $-2427.27 | $-19.98 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7231.62** | $-2890.43 | $122.05 | 366 | 65% | $-3378.67 | 25 |
| whale_fade | **$5999.03** | $-4244.08 | $243.11 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 128 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 365 | 2 | 0 | 99% | 1.38¢ |

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
