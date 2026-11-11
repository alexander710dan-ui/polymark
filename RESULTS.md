# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79353 · Last run: 2026-11-11T03:19:26.065Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12500.97** | $2617.37 | $-116.4 | 275 | 59% | $2372.54 | 21 |
| copy_pro | **$12384.98** | $2469.41 | $-84.43 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12074.04** | $1798.62 | $275.42 | 188 | 57% | $1578.8 | 24 |
| mid_momentum | **$11642.49** | $1333.76 | $308.73 | 356 | 56% | $1113.94 | 25 |
| mm_tight | **$11391.81** | $1797.11 | $-405.3 | 704 | 54% | $1577.98 | 17 |
| mm_cheap_v2 | **$11224.4** | $948.98 | $275.42 | 205 | 55% | $729.16 | 24 |
| maker_flat | **$10695.34** | $737.84 | $-42.5 | 94 | 52% | $543.72 | 16 |
| mid_momentum_v2 | **$10417.31** | $108.58 | $308.73 | 191 | 52% | $-111.24 | 25 |
| mm_max | **$10228.36** | $221.93 | $6.43 | 292 | 54% | $12.83 | 1 |
| fade_longshot | **$9921.01** | $-95.44 | $16.45 | 219 | 95% | $-106.18 | 25 |
| mm_sports | **$9790.67** | $-7.97 | $-201.36 | 838 | 55% | $-227.1 | 22 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9388.03** | $-496.13 | $-115.84 | 176 | 52% | $-715.26 | 16 |
| mm_strong | **$9344.56** | $-701.55 | $46.11 | 258 | 53% | $-920.68 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8903.48** | $-1038.01 | $-58.51 | 230 | 58% | $-1131.64 | 16 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8561.36** | $-1237.28 | $-201.36 | 407 | 53% | $-1456.41 | 22 |
| copy_top | **$8377.38** | $-1470.79 | $-151.83 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7727.52** | $-2296.74 | $24.26 | 235 | 54% | $-2911.03 | 25 |
| momentum | **$7476.29** | $-2656.88 | $133.17 | 349 | 66% | $-3145.12 | 25 |
| whale_fade | **$6014.76** | $-4244.08 | $258.84 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 110 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 296 | 1 | 0 | 100% | 1.31¢ |

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
