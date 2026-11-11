# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79152 · Last run: 2026-11-11T00:53:50.336Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12430.83** | $2265.2 | $165.63 | 267 | 58% | $2020.37 | 20 |
| copy_pro | **$12385.23** | $2469.41 | $-84.18 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12018.66** | $1467.47 | $551.19 | 184 | 57% | $1247.65 | 25 |
| mid_momentum | **$11704.04** | $1153.8 | $550.24 | 354 | 55% | $933.98 | 25 |
| mm_tight | **$11531.99** | $1534.58 | $-2.59 | 697 | 54% | $1315.45 | 16 |
| mm_cheap_v2 | **$11169.02** | $617.83 | $551.19 | 201 | 54% | $398.01 | 25 |
| maker_flat | **$10668.13** | $629.51 | $38.62 | 93 | 52% | $435.39 | 16 |
| mid_momentum_v2 | **$10478.86** | $-71.38 | $550.24 | 189 | 51% | $-291.2 | 25 |
| mm_max | **$10223.03** | $227.03 | $-4 | 290 | 54% | $17.93 | 2 |
| fade_longshot | **$9900.35** | $-104.88 | $5.23 | 218 | 94% | $-115.62 | 25 |
| mm_sports | **$9788.16** | $-315.96 | $104.12 | 830 | 54% | $-535.09 | 21 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9486.31** | $-724.23 | $210.54 | 255 | 53% | $-943.36 | 25 |
| mm_slow | **$9394.6** | $-491.03 | $-114.37 | 174 | 52% | $-710.16 | 17 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8985.99** | $-935.61 | $-78.4 | 229 | 59% | $-1029.24 | 17 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8558.85** | $-1545.27 | $104.12 | 399 | 52% | $-1764.4 | 21 |
| copy_top | **$8377.98** | $-1470.79 | $-151.23 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7686.06** | $-2393.67 | $79.73 | 232 | 53% | $-3007.96 | 25 |
| momentum | **$7532.36** | $-2668.69 | $201.05 | 348 | 66% | $-3156.93 | 25 |
| whale_fade | **$6005.06** | $-4244.08 | $249.14 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 287 | 1 | 1 | 100% | 1.32¢ |

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
