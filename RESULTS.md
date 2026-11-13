# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84601 · Last run: 2026-11-13T21:15:04.932Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12816.62** | $2616.25 | $200.37 | 436 | 57% | $2371.42 | 18 |
| copy_pro | **$12384.44** | $2469.41 | $-84.97 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11742.78** | $1659.22 | $83.56 | 849 | 54% | $1440.09 | 14 |
| mid_momentum | **$11375.34** | $1115.76 | $259.58 | 419 | 55% | $895.94 | 25 |
| maker_flat | **$11230.81** | $1073.69 | $157.12 | 135 | 53% | $879.57 | 23 |
| mm_cheap | **$10974.86** | $763.06 | $211.8 | 276 | 54% | $543.24 | 25 |
| mm_max | **$10935.84** | $936.84 | $-1 | 339 | 55% | $727.74 | 1 |
| mid_momentum_v2 | **$10150.16** | $-109.42 | $259.58 | 254 | 52% | $-329.24 | 25 |
| mm_cheap_v2 | **$10125.22** | $-86.58 | $211.8 | 293 | 53% | $-306.4 | 25 |
| fade_longshot | **$9873.21** | $-140.38 | $13.59 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9214.08** | $-729.9 | $-56.02 | 219 | 52% | $-949.03 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9061.44** | $-1087.6 | $149.04 | 1009 | 54% | $-1306.73 | 19 |
| strong_dip | **$8759.75** | $-1338.22 | $97.97 | 277 | 57% | $-1431.85 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.58** | $-1470.79 | $-154.63 | 564 | 53% | $-2799.36 | 4 |
| mm_strong | **$8205.73** | $-1816.87 | $22.6 | 356 | 52% | $-2036 | 23 |
| mm_sports_v2 | **$7832.13** | $-2316.91 | $149.04 | 578 | 52% | $-2536.04 | 19 |
| random_control | **$7564.86** | $-2434.87 | $-0.27 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7315.66** | $-2722.45 | $38.11 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.32** | $-4244.08 | $215.4 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 158 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 454 | 2 | 1 | 100% | 1.39¢ |

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
