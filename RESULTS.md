# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82578 · Last run: 2026-11-12T19:32:44.152Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12384.29** | $2469.41 | $-85.12 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12190.38** | $2359.71 | $-169.33 | 375 | 57% | $2114.88 | 15 |
| mm_tight | **$11469.3** | $1653 | $-183.7 | 797 | 54% | $1433.87 | 8 |
| mm_cheap | **$11016.13** | $755.19 | $260.94 | 237 | 54% | $535.37 | 25 |
| maker_flat | **$10955.32** | $939.66 | $15.66 | 124 | 52% | $745.54 | 20 |
| mid_momentum | **$10914.99** | $702.66 | $212.33 | 387 | 55% | $482.84 | 25 |
| mm_max | **$10697.86** | $696.9 | $0.96 | 316 | 55% | $487.8 | 1 |
| mm_cheap_v2 | **$10166.49** | $-94.45 | $260.94 | 254 | 52% | $-314.27 | 25 |
| fade_longshot | **$9861.68** | $-140.38 | $2.06 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9689.81** | $-522.52 | $212.33 | 222 | 51% | $-742.34 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9115.41** | $-671.27 | $-213.32 | 944 | 54% | $-890.4 | 15 |
| mm_slow | **$9089.11** | $-709.13 | $-201.76 | 204 | 51% | $-928.26 | 24 |
| strong_dip | **$8986.07** | $-1099.15 | $85.22 | 262 | 58% | $-1192.78 | 25 |
| mm_strong | **$8660.39** | $-1269.39 | $-70.22 | 317 | 52% | $-1488.52 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.11** | $-1470.79 | $-155.1 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7886.1** | $-1900.58 | $-213.32 | 513 | 52% | $-2119.71 | 15 |
| random_control | **$7569.31** | $-2427.27 | $-3.42 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7272.12** | $-2770.21 | $42.33 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5968.71** | $-4244.08 | $212.79 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 390 | 2 | 0 | 99% | 1.39¢ |

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
