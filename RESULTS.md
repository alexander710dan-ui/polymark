# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83275 · Last run: 2026-11-13T04:22:49.276Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12389.5** | $2418.51 | $-29.01 | 402 | 56% | $2173.68 | 7 |
| copy_pro | **$12384.34** | $2469.41 | $-85.07 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11795.58** | $1807.72 | $-12.14 | 820 | 54% | $1588.59 | 4 |
| maker_flat | **$11082.03** | $1007.19 | $74.84 | 128 | 52% | $813.07 | 21 |
| mm_cheap | **$10939.4** | $743.41 | $195.99 | 252 | 54% | $523.59 | 21 |
| mm_max | **$10924.28** | $944.72 | $-20.44 | 325 | 55% | $735.62 | 2 |
| mid_momentum | **$10840.1** | $618.73 | $221.37 | 401 | 54% | $398.91 | 21 |
| mm_cheap_v2 | **$10089.76** | $-106.23 | $195.99 | 269 | 52% | $-326.05 | 21 |
| fade_longshot | **$9868.54** | $-140.38 | $8.92 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9614.92** | $-606.45 | $221.37 | 236 | 50% | $-826.27 | 21 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9104.13** | $-731.48 | $-164.39 | 212 | 51% | $-950.61 | 24 |
| mm_sports | **$8971.66** | $-978.92 | $-49.42 | 973 | 54% | $-1198.05 | 7 |
| strong_dip | **$8703.46** | $-1401.61 | $105.07 | 269 | 58% | $-1495.24 | 21 |
| mm_strong | **$8693.74** | $-1392.58 | $86.32 | 329 | 52% | $-1611.71 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.48** | $-1470.79 | $-154.73 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7742.35** | $-2208.23 | $-49.42 | 542 | 52% | $-2427.36 | 7 |
| random_control | **$7562.27** | $-2331.47 | $-106.26 | 243 | 54% | $-2945.76 | 25 |
| momentum | **$7335.6** | $-2722.45 | $58.05 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5977.57** | $-4244.08 | $221.65 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 149 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 409 | 2 | 0 | 100% | 1.39¢ |

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
