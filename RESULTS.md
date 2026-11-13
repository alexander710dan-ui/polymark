# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84655 · Last run: 2026-11-13T22:09:47.010Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12925.77** | $3039.8 | $-114.03 | 448 | 57% | $2794.97 | 14 |
| copy_pro | **$12384.44** | $2469.41 | $-84.97 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11480.28** | $1665.83 | $-185.55 | 863 | 53% | $1446.7 | 12 |
| maker_flat | **$11308.91** | $1155.51 | $153.4 | 136 | 53% | $961.39 | 23 |
| mid_momentum | **$11232.43** | $1167.86 | $64.57 | 420 | 55% | $948.04 | 25 |
| mm_max | **$10834.19** | $835.19 | $-1 | 340 | 55% | $626.09 | 1 |
| mm_cheap | **$10832.73** | $805.16 | $27.57 | 281 | 54% | $585.34 | 25 |
| mid_momentum_v2 | **$10007.25** | $-57.32 | $64.57 | 255 | 52% | $-277.14 | 25 |
| mm_cheap_v2 | **$9983.09** | $-44.48 | $27.57 | 298 | 52% | $-264.3 | 25 |
| fade_longshot | **$9879.32** | $-140.38 | $19.7 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9095.21** | $-734.58 | $-170.21 | 1025 | 54% | $-953.71 | 15 |
| mm_slow | **$9091.75** | $-831.9 | $-76.35 | 220 | 51% | $-1051.03 | 25 |
| strong_dip | **$8719.05** | $-1351.45 | $70.5 | 280 | 57% | $-1445.08 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.96** | $-1470.79 | $-154.25 | 564 | 53% | $-2799.36 | 4 |
| mm_strong | **$8363.86** | $-1879.13 | $242.99 | 366 | 51% | $-2098.26 | 25 |
| mm_sports_v2 | **$7865.9** | $-1963.89 | $-170.21 | 594 | 52% | $-2183.02 | 15 |
| random_control | **$7456.72** | $-2434.87 | $-108.41 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7309.05** | $-2722.45 | $31.5 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.19** | $-4244.08 | $215.27 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 159 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 462 | 3 | 0 | 99% | 1.39¢ |

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
