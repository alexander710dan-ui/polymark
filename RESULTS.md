# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83571 · Last run: 2026-11-01T02:02:03.046Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11817.43** | $1626.72 | $190.71 | 492 | 53% | $776.72 | 24 |
| maker_sports | **$11406.58** | $1433.39 | $-26.81 | 95 | 60% | $1220.89 | 3 |
| mid_momentum | **$11044.96** | $900.2 | $144.76 | 294 | 56% | $686.72 | 24 |
| mm_tight | **$10671.09** | $769.9 | $-98.81 | 547 | 54% | $560.8 | 2 |
| mm_cheap | **$10421.51** | $447.51 | $-26 | 122 | 56% | $255.82 | 23 |
| maker_flat | **$10388.02** | $303.95 | $84.07 | 29 | 52% | $112.4 | 24 |
| mm_max | **$10272.86** | $271.77 | $1.09 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9959.81** | $-64.27 | $24.08 | 162 | 94% | $-75.01 | 25 |
| mid_momentum_v2 | **$9819.78** | $-324.98 | $144.76 | 129 | 51% | $-517.53 | 24 |
| conviction | **$9688.57** | $-306.99 | $-4.44 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9662.92** | $-314.09 | $-22.99 | 172 | 54% | $-518.04 | 24 |
| mm_cheap_v2 | **$9571.87** | $-402.13 | $-26 | 139 | 52% | $-593.82 | 23 |
| mm_sports | **$9561.35** | $-398.37 | $-40.28 | 649 | 55% | $-617.5 | 3 |
| copy_top | **$9363.16** | $-602.88 | $-33.96 | 512 | 53% | $-1931.45 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9022.97** | $-794.17 | $-182.86 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8953.99** | $-963.24 | $-82.77 | 162 | 59% | $-1056.87 | 22 |
| super | **$8901.16** | $-1093.24 | $-5.6 | 121 | 50% | $-1375.14 | 4 |
| mm_slow | **$8888.49** | $-1007.21 | $-104.3 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8332.04** | $-1627.68 | $-40.28 | 218 | 51% | $-1846.81 | 3 |
| momentum | **$7239.9** | $-2644.98 | $-115.12 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6479.45** | $-3061.56 | $-458.99 | 513 | 47% | $-3513.02 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 98 | 1 | 0 | 99% | 1.43¢ |

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
