# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89026 · Last run: 2026-11-02T18:09:51.585Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12061.49** | $2156.34 | $-94.85 | 510 | 54% | $1306.34 | 25 |
| maker_sports | **$11065.73** | $1126.2 | $-60.47 | 152 | 57% | $913.7 | 6 |
| mid_momentum | **$10619.02** | $627.56 | $-8.54 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10602.49** | $680.6 | $-78.11 | 599 | 53% | $471.5 | 5 |
| maker_flat | **$10386.77** | $388.85 | $-2.08 | 40 | 53% | $197.3 | 24 |
| fade_longshot | **$10006.95** | $-25.49 | $32.44 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9986.96** | $71.35 | $-84.39 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$9980.8** | $59.07 | $-78.27 | 244 | 53% | $-150.03 | 3 |
| conviction | **$9683.33** | $-306.99 | $-9.68 | 3 | 0% | $-204.85 | 1 |
| strong_dip | **$9398.31** | $-729.14 | $127.45 | 175 | 59% | $-822.77 | 23 |
| mid_momentum_v2 | **$9393.84** | $-597.62 | $-8.54 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9243.97** | $-676.86 | $-79.17 | 709 | 54% | $-895.99 | 7 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9137.32** | $-778.29 | $-84.39 | 155 | 51% | $-969.98 | 25 |
| mm_strong | **$8976.91** | $-718.15 | $-304.94 | 186 | 53% | $-922.1 | 25 |
| random_control | **$8934.99** | $-899.06 | $-165.95 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8605.45** | $-1046.87 | $-347.68 | 122 | 51% | $-1246.55 | 25 |
| super | **$8595.8** | $-1375.81 | $-28.39 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8486.37** | $-1399.58 | $-114.05 | 543 | 52% | $-2728.15 | 25 |
| mm_sports_v2 | **$8014.66** | $-1906.17 | $-79.17 | 278 | 50% | $-2125.3 | 7 |
| momentum | **$7069.78** | $-2788.51 | $-141.71 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6998.23** | $-3012.98 | $11.21 | 542 | 47% | $-3464.44 | 25 |
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
| maker_flat | 64 | 0 | 0 | 100% | 2.76¢ |
| maker_sports | 158 | 1 | 1 | 99% | 1.41¢ |

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
