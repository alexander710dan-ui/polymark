# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71008 · Last run: 2026-10-29T16:55:56.541Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10247.1** | $300.34 | $-53.24 | 475 | 53% | $91.24 | 6 |
| maker_sports | **$10180.95** | $269.76 | $-88.81 | 9 | 67% | $78.21 | 11 |
| copy_pro | **$10103.54** | $130.86 | $-27.32 | 438 | 53% | $-719.14 | 25 |
| fade_longshot | **$10099.99** | $80 | $19.99 | 151 | 95% | $69.26 | 25 |
| mid_momentum | **$10001.2** | $68.7 | $-67.5 | 251 | 55% | $-144.78 | 23 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9833.72** | $293 | $-459.28 | 9 | 67% | $101.45 | 16 |
| strong_dip | **$9817.57** | $-195.61 | $13.18 | 137 | 62% | $-287.92 | 9 |
| mm_max | **$9736.12** | $-220.55 | $-43.33 | 206 | 53% | $-429.65 | 2 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9568.91** | $-462.41 | $31.32 | 453 | 53% | $-1790.98 | 15 |
| mm_cheap | **$9305.21** | $-506.02 | $-188.77 | 71 | 51% | $-688.48 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9067.56** | $-857.43 | $-75.01 | 562 | 54% | $-1076.56 | 11 |
| mid_momentum_v2 | **$8776.02** | $-1156.48 | $-67.5 | 86 | 45% | $-1347.3 | 23 |
| random_control | **$8751.5** | $-1189.69 | $-58.81 | 180 | 56% | $-1803.98 | 25 |
| mm_cheap_v2 | **$8455.57** | $-1355.66 | $-188.77 | 88 | 45% | $-1546.48 | 19 |
| mm_strong | **$8332.48** | $-1646.14 | $-21.38 | 129 | 48% | $-1850.09 | 19 |
| mm_slow | **$8046.44** | $-1878.71 | $-74.85 | 97 | 46% | $-2064.42 | 16 |
| mm_sports_v2 | **$7838.25** | $-2086.74 | $-75.01 | 131 | 47% | $-2305.87 | 11 |
| momentum | **$7400.77** | $-2548.15 | $-51.08 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6255.13** | $-3630.32 | $-114.55 | 454 | 46% | $-3984.87 | 15 |
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
| maker_flat | 25 | 0 | 0 | 100% | 2.82¢ |
| maker_sports | 20 | 1 | 0 | 95% | 1.94¢ |

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
