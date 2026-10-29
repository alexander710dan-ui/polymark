# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70319 · Last run: 2026-10-29T14:10:38.934Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10403.76** | $296.51 | $107.25 | 473 | 53% | $87.41 | 2 |
| maker_flat | **$10389.42** | $296.24 | $93.18 | 5 | 80% | $104.69 | 15 |
| maker_sports | **$10370.8** | $342.49 | $28.31 | 6 | 83% | $150.94 | 3 |
| mid_momentum | **$10283.56** | $92.59 | $190.97 | 248 | 55% | $-120.89 | 15 |
| copy_pro | **$10237.98** | $274.83 | $-36.85 | 433 | 53% | $-575.17 | 22 |
| fade_longshot | **$10078.86** | $80 | $-1.14 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9883.85** | $-224.38 | $108.23 | 204 | 53% | $-433.48 | 1 |
| mm_cheap | **$9640.37** | $-483.23 | $123.6 | 68 | 51% | $-661.01 | 13 |
| strong_dip | **$9624.73** | $-218.44 | $-156.83 | 134 | 62% | $-310.75 | 6 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9535.62** | $-398.51 | $-65.87 | 450 | 53% | $-1727.08 | 10 |
| mm_sports | **$9251.2** | $-833.54 | $84.74 | 559 | 54% | $-1052.67 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9058.38** | $-1132.59 | $190.97 | 83 | 46% | $-1323.41 | 15 |
| mm_cheap_v2 | **$8790.73** | $-1332.87 | $123.6 | 85 | 46% | $-1523.69 | 13 |
| random_control | **$8759.46** | $-1086.59 | $-153.95 | 179 | 56% | $-1700.88 | 25 |
| mm_strong | **$8485.07** | $-1546.62 | $31.69 | 126 | 48% | $-1750.57 | 13 |
| mm_slow | **$8337.13** | $-1854.82 | $191.95 | 94 | 47% | $-2040.53 | 14 |
| mm_sports_v2 | **$8021.89** | $-2062.85 | $84.74 | 128 | 48% | $-2281.98 | 3 |
| momentum | **$7422.88** | $-2548.15 | $-28.97 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6294.33** | $-3759.78 | $54.11 | 451 | 46% | $-4114.33 | 10 |
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
| maker_flat | 20 | 0 | 0 | 100% | 2.88¢ |
| maker_sports | 9 | 1 | 0 | 90% | 1.97¢ |

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
