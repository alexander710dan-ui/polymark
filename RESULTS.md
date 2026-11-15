# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87445 · Last run: 2026-11-15T12:18:41.708Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13555.87** | $3707.5 | $-151.63 | 537 | 57% | $3462.67 | 17 |
| copy_pro | **$12165.4** | $2165.4 | $0 | 535 | 55% | $1315.4 | 0 |
| mid_momentum | **$11070.93** | $859.03 | $211.9 | 452 | 54% | $639.21 | 25 |
| mm_tight | **$10969.91** | $1136.68 | $-166.77 | 944 | 53% | $917.55 | 15 |
| maker_flat | **$10845.47** | $951.29 | $-105.82 | 151 | 52% | $757.17 | 22 |
| mm_max | **$10491.28** | $499.95 | $-8.67 | 350 | 55% | $290.85 | 3 |
| mm_cheap | **$10013.07** | $-167.16 | $180.23 | 318 | 51% | $-386.98 | 25 |
| fade_longshot | **$9918.32** | $-124.45 | $42.77 | 233 | 94% | $-135.19 | 25 |
| mid_momentum_v2 | **$9845.75** | $-366.15 | $211.9 | 287 | 51% | $-585.97 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9163.43** | $-1016.8 | $180.23 | 335 | 50% | $-1236.62 | 25 |
| mm_slow | **$9039.55** | $-932.05 | $-28.4 | 226 | 51% | $-1151.18 | 25 |
| mm_sports | **$9003.82** | $-779.22 | $-216.96 | 1117 | 53% | $-998.35 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_strong | **$8412.41** | $-1701.51 | $113.92 | 410 | 50% | $-1920.64 | 25 |
| strong_dip | **$8310.21** | $-1970.15 | $280.36 | 299 | 56% | $-2063.78 | 25 |
| copy_top | **$8224.8** | $-1775.2 | $0 | 568 | 52% | $-3103.77 | 0 |
| mm_sports_v2 | **$7774.51** | $-2008.53 | $-216.96 | 686 | 51% | $-2227.66 | 19 |
| momentum | **$7603.98** | $-2592.82 | $196.8 | 381 | 65% | $-3081.06 | 25 |
| random_control | **$7384.59** | $-2776.52 | $161.11 | 259 | 53% | $-3390.81 | 25 |
| whale_fade | **$6070.6** | $-3929.4 | $0 | 567 | 47% | $-4380.86 | 0 |
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
| maker_flat | 173 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 554 | 5 | 1 | 99% | 1.42¢ |

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
