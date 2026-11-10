# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78928 · Last run: 2026-11-10T22:13:35.298Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.33** | $2469.41 | $-84.08 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12214.1** | $2115.91 | $98.19 | 261 | 58% | $1871.08 | 13 |
| mm_cheap | **$11912.15** | $1458.93 | $453.22 | 179 | 56% | $1239.11 | 25 |
| mid_momentum | **$11534.85** | $1048.12 | $486.73 | 350 | 55% | $828.3 | 25 |
| mm_tight | **$11430.36** | $1475.48 | $-45.12 | 692 | 54% | $1256.35 | 10 |
| mm_cheap_v2 | **$11062.51** | $609.29 | $453.22 | 196 | 54% | $389.47 | 25 |
| maker_flat | **$10980** | $957.1 | $22.9 | 88 | 53% | $762.98 | 17 |
| mid_momentum_v2 | **$10309.67** | $-177.06 | $486.73 | 185 | 51% | $-396.88 | 25 |
| mm_max | **$10232.58** | $232.6 | $-0.02 | 286 | 54% | $23.5 | 2 |
| fade_longshot | **$9882.07** | $-14.02 | $-103.91 | 216 | 95% | $-24.76 | 25 |
| mm_sports | **$9616.54** | $-421.47 | $38.01 | 824 | 54% | $-640.6 | 14 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9476.91** | $-780.25 | $257.16 | 250 | 52% | $-999.38 | 25 |
| mm_slow | **$9434.58** | $-531.87 | $-33.55 | 169 | 51% | $-751 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8975.2** | $-853.38 | $-171.42 | 225 | 59% | $-947.01 | 17 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8387.23** | $-1650.78 | $38.01 | 393 | 52% | $-1869.91 | 14 |
| copy_top | **$8378.4** | $-1470.79 | $-150.81 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7791.09** | $-2289.22 | $80.31 | 231 | 54% | $-2903.51 | 25 |
| momentum | **$7377.22** | $-2820.23 | $197.45 | 345 | 65% | $-3308.47 | 25 |
| whale_fade | **$6010.79** | $-4244.08 | $254.87 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 105 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 274 | 1 | 0 | 100% | 1.32¢ |

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
