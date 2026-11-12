# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82167 · Last run: 2026-11-12T13:53:17.952Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.14** | $2469.41 | $-84.27 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12273.14** | $2590.28 | $-317.14 | 368 | 57% | $2345.45 | 11 |
| mm_tight | **$11502.44** | $1854.11 | $-351.67 | 790 | 54% | $1634.98 | 7 |
| mm_cheap | **$11498.03** | $1150.19 | $347.84 | 227 | 55% | $930.37 | 25 |
| mid_momentum | **$11348.25** | $1026.54 | $321.71 | 381 | 55% | $806.72 | 25 |
| mm_max | **$10663.94** | $794.71 | $-130.77 | 310 | 55% | $585.61 | 4 |
| mm_cheap_v2 | **$10648.39** | $300.55 | $347.84 | 244 | 53% | $80.73 | 25 |
| maker_flat | **$10536.46** | $353.98 | $182.48 | 114 | 50% | $159.86 | 23 |
| mid_momentum_v2 | **$10123.07** | $-198.64 | $321.71 | 216 | 51% | $-418.46 | 25 |
| fade_longshot | **$9880.1** | $-140.38 | $20.48 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9298.59** | $-503.37 | $-198.04 | 199 | 52% | $-722.5 | 25 |
| mm_sports | **$9276.13** | $-378.23 | $-345.64 | 935 | 54% | $-597.36 | 11 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9199.12** | $-809.72 | $8.84 | 308 | 53% | $-1028.85 | 25 |
| strong_dip | **$8813.72** | $-1358.35 | $172.07 | 258 | 57% | $-1451.98 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8375.33** | $-1470.79 | $-153.88 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8046.82** | $-1607.54 | $-345.64 | 504 | 52% | $-1826.67 | 11 |
| random_control | **$7587.38** | $-2427.27 | $14.65 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7305.59** | $-2770.21 | $75.8 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5988.01** | $-4244.08 | $232.09 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 137 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 379 | 2 | 0 | 99% | 1.39¢ |

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
