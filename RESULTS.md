# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71571 · Last run: 2026-10-29T19:08:49.533Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10546.58** | $345.41 | $201.17 | 441 | 53% | $-504.59 | 25 |
| maker_sports | **$10499.51** | $370.01 | $129.5 | 15 | 67% | $178.46 | 8 |
| mm_tight | **$10419.81** | $485.97 | $-66.16 | 479 | 53% | $276.87 | 6 |
| mid_momentum | **$10374.85** | $208.05 | $166.8 | 257 | 55% | $-5.43 | 22 |
| fade_longshot | **$10091.3** | $89.44 | $1.86 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9902.79** | $93 | $-190.21 | 11 | 55% | $-98.55 | 18 |
| mm_max | **$9891.43** | $-99.1 | $-9.47 | 207 | 53% | $-308.2 | 3 |
| mm_cheap | **$9691.33** | $-366.67 | $58 | 77 | 52% | $-549.13 | 18 |
| strong_dip | **$9648.86** | $-233.15 | $-117.99 | 139 | 62% | $-325.46 | 11 |
| copy_top | **$9582.3** | $-537.6 | $119.9 | 456 | 53% | $-1866.17 | 16 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9384.5** | $-718.08 | $102.58 | 568 | 54% | $-937.21 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9149.67** | $-1017.13 | $166.8 | 92 | 47% | $-1207.95 | 22 |
| mm_cheap_v2 | **$8841.69** | $-1216.31 | $58 | 94 | 47% | $-1407.13 | 18 |
| random_control | **$8710.97** | $-1189.69 | $-99.34 | 180 | 56% | $-1803.98 | 25 |
| mm_strong | **$8643.48** | $-1380.7 | $24.18 | 135 | 50% | $-1584.65 | 19 |
| mm_slow | **$8266.19** | $-1786.92 | $53.11 | 100 | 47% | $-1972.63 | 16 |
| mm_sports_v2 | **$8155.19** | $-1947.39 | $102.58 | 137 | 48% | $-2166.52 | 9 |
| momentum | **$7407.27** | $-2533.86 | $-58.87 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6263.83** | $-3508.42 | $-227.75 | 457 | 47% | $-3862.97 | 16 |
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
| maker_flat | 29 | 0 | 1 | 100% | 2.71¢ |
| maker_sports | 23 | 1 | 1 | 96% | 1.82¢ |

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
