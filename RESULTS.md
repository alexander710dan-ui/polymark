# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84509 · Last run: 2026-11-13T19:49:57.544Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12543.18** | $2753.99 | $-210.81 | 427 | 57% | $2509.16 | 22 |
| copy_pro | **$12384.44** | $2469.41 | $-84.97 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11601.02** | $2120.87 | $-519.85 | 841 | 54% | $1901.74 | 16 |
| mid_momentum | **$11326.45** | $1217.31 | $109.14 | 418 | 55% | $997.49 | 25 |
| maker_flat | **$11226.25** | $1073.69 | $152.56 | 135 | 53% | $879.57 | 23 |
| mm_max | **$10944.01** | $1145.84 | $-201.83 | 335 | 56% | $936.74 | 4 |
| mm_cheap | **$10936.99** | $1069.76 | $-132.77 | 273 | 55% | $849.94 | 25 |
| mid_momentum_v2 | **$10101.27** | $-7.87 | $109.14 | 253 | 52% | $-227.69 | 25 |
| mm_cheap_v2 | **$10087.35** | $220.12 | $-132.77 | 290 | 53% | $0.3 | 25 |
| fade_longshot | **$9878.87** | $-140.38 | $19.25 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9147.27** | $-628.27 | $-224.46 | 218 | 52% | $-847.4 | 25 |
| mm_sports | **$8869** | $-729.07 | $-401.93 | 999 | 54% | $-948.2 | 23 |
| strong_dip | **$8777.47** | $-1377 | $154.47 | 274 | 58% | $-1470.63 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_strong | **$8376.98** | $-1403.39 | $-219.63 | 350 | 53% | $-1622.52 | 25 |
| copy_top | **$8374.2** | $-1470.79 | $-155.01 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7639.69** | $-1958.38 | $-401.93 | 568 | 52% | $-2177.51 | 23 |
| random_control | **$7534.9** | $-2434.87 | $-30.23 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7325.38** | $-2722.45 | $47.83 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.45** | $-4244.08 | $215.53 | 563 | 46% | $-4695.54 | 4 |
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
| maker_sports | 449 | 2 | 0 | 100% | 1.39¢ |

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
