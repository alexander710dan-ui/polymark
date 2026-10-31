# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82230 · Last run: 2026-10-31T15:54:34.048Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11552.17** | $1370 | $182.17 | 485 | 53% | $520 | 25 |
| maker_sports | **$11394.02** | $1370.15 | $23.87 | 78 | 62% | $1157.65 | 13 |
| mid_momentum | **$11063.84** | $916.57 | $147.27 | 288 | 56% | $703.09 | 25 |
| mm_tight | **$10710.49** | $747.96 | $-37.47 | 536 | 54% | $538.86 | 10 |
| mm_cheap | **$10593.47** | $625 | $-31.53 | 113 | 57% | $433.31 | 25 |
| mm_max | **$10313.26** | $329.06 | $-15.8 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10118.43** | $102.69 | $15.74 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9930.91** | $-77.53 | $8.44 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9838.66** | $-308.61 | $147.27 | 123 | 51% | $-501.16 | 25 |
| mm_cheap_v2 | **$9743.83** | $-224.64 | $-31.53 | 130 | 52% | $-416.33 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9640.54** | $-232.66 | $-126.8 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9613.88** | $-371.57 | $-14.55 | 632 | 55% | $-590.7 | 13 |
| copy_top | **$9256.72** | $-662.45 | $-80.83 | 503 | 52% | $-1991.02 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$9159.31** | $-921.86 | $81.17 | 115 | 50% | $-1203.76 | 7 |
| random_control | **$9066.15** | $-794.17 | $-139.68 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8927.8** | $-905.36 | $-166.84 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8816.54** | $-1095.92 | $-87.54 | 160 | 58% | $-1189.55 | 23 |
| mm_sports_v2 | **$8384.57** | $-1600.88 | $-14.55 | 201 | 51% | $-1820.01 | 13 |
| momentum | **$7283.8** | $-2644.98 | $-71.22 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6772.67** | $-2847.48 | $-379.85 | 504 | 47% | $-3298.94 | 25 |
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
| maker_flat | 51 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 91 | 1 | 0 | 99% | 1.42¢ |

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
