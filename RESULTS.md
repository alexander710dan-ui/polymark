# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80358 · Last run: 2026-11-11T15:25:10.487Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12981.55** | $3194.97 | $-213.42 | 313 | 59% | $2950.14 | 12 |
| copy_pro | **$12385.44** | $2469.41 | $-83.97 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12337.35** | $2482.58 | $-145.23 | 738 | 55% | $2263.45 | 8 |
| mm_cheap | **$12111.92** | $1856.04 | $255.88 | 206 | 57% | $1636.22 | 25 |
| mid_momentum | **$11546.27** | $1206.38 | $339.89 | 366 | 55% | $986.56 | 25 |
| mm_cheap_v2 | **$11262.28** | $1006.4 | $255.88 | 223 | 55% | $786.58 | 25 |
| mm_sports | **$10438.99** | $688.84 | $-249.85 | 878 | 55% | $469.71 | 12 |
| maker_flat | **$10425.57** | $498.47 | $-72.9 | 100 | 51% | $304.35 | 16 |
| mm_max | **$10328.35** | $328.35 | $0 | 296 | 54% | $119.25 | 0 |
| mid_momentum_v2 | **$10321.09** | $-18.8 | $339.89 | 201 | 52% | $-238.62 | 25 |
| fade_longshot | **$9863.24** | $-151.76 | $15 | 228 | 94% | $-162.5 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9502.73** | $-389.06 | $-108.21 | 180 | 52% | $-608.19 | 17 |
| mm_strong | **$9418.22** | $-586.92 | $5.14 | 278 | 53% | $-806.05 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9209.68** | $-540.47 | $-249.85 | 447 | 54% | $-759.6 | 12 |
| strong_dip | **$8647.58** | $-1427.87 | $75.45 | 237 | 57% | $-1521.5 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.17** | $-1470.79 | $-151.04 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7583.56** | $-2427.27 | $10.83 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7332.07** | $-2727.35 | $59.42 | 360 | 66% | $-3215.59 | 25 |
| whale_fade | **$5962.34** | $-4244.08 | $206.42 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 116 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 325 | 1 | 0 | 100% | 1.36¢ |

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
