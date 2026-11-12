# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82554 · Last run: 2026-11-12T19:12:42.284Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12384.54** | $2469.41 | $-84.87 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12190.96** | $2359.71 | $-168.75 | 375 | 57% | $2114.88 | 14 |
| mm_tight | **$11490.49** | $1653 | $-162.51 | 797 | 54% | $1433.87 | 7 |
| mm_cheap | **$11035.6** | $755.19 | $280.41 | 237 | 54% | $535.37 | 25 |
| maker_flat | **$10943.52** | $939.66 | $3.86 | 124 | 52% | $745.54 | 20 |
| mid_momentum | **$10926.2** | $702.66 | $223.54 | 387 | 55% | $482.84 | 25 |
| mm_max | **$10703.63** | $696.9 | $6.73 | 316 | 55% | $487.8 | 1 |
| mm_cheap_v2 | **$10185.96** | $-94.45 | $280.41 | 254 | 52% | $-314.27 | 25 |
| fade_longshot | **$9867.27** | $-140.38 | $7.65 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9701.02** | $-522.52 | $223.54 | 222 | 51% | $-742.34 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9124.31** | $-671.27 | $-204.42 | 944 | 54% | $-890.4 | 14 |
| mm_slow | **$9096.85** | $-709.13 | $-194.02 | 204 | 51% | $-928.26 | 24 |
| strong_dip | **$8988.58** | $-1099.15 | $87.73 | 262 | 58% | $-1192.78 | 24 |
| mm_strong | **$8666.25** | $-1269.39 | $-64.36 | 317 | 52% | $-1488.52 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.19** | $-1470.79 | $-155.02 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7895** | $-1900.58 | $-204.42 | 513 | 52% | $-2119.71 | 14 |
| random_control | **$7582.85** | $-2427.27 | $10.12 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7285.25** | $-2770.21 | $55.46 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5983.38** | $-4244.08 | $227.46 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 144 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 389 | 2 | 0 | 99% | 1.38¢ |

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
