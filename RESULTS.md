# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83080 · Last run: 2026-10-31T22:18:20.861Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11445.96** | $1350.53 | $95.43 | 488 | 53% | $500.53 | 25 |
| maker_sports | **$11235** | $1286.9 | $-51.9 | 87 | 60% | $1074.4 | 8 |
| mid_momentum | **$10899.29** | $778.16 | $121.13 | 291 | 56% | $564.68 | 25 |
| mm_tight | **$10678.27** | $757 | $-78.73 | 542 | 54% | $547.9 | 7 |
| mm_cheap | **$10336.11** | $486.59 | $-150.48 | 116 | 56% | $294.9 | 25 |
| mm_max | **$10272.09** | $271.77 | $0.32 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10128.56** | $140.79 | $-12.23 | 28 | 50% | $-50.76 | 25 |
| fade_longshot | **$9944.93** | $-70.35 | $15.28 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9689.37** | $-306.99 | $-3.64 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9674.11** | $-447.02 | $121.13 | 126 | 51% | $-639.57 | 25 |
| mm_strong | **$9518.14** | $-232.66 | $-249.2 | 168 | 54% | $-436.61 | 25 |
| mm_cheap_v2 | **$9486.47** | $-363.05 | $-150.48 | 133 | 52% | $-554.74 | 25 |
| mm_sports | **$9427.98** | $-496.82 | $-75.2 | 641 | 54% | $-715.95 | 8 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9208.7** | $-768.54 | $-22.76 | 509 | 52% | $-2097.11 | 25 |
| random_control | **$9028.82** | $-794.17 | $-177.01 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8882.44** | $-1007.21 | $-110.35 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8879.19** | $-1022.63 | $-98.18 | 161 | 58% | $-1116.26 | 22 |
| super | **$8816.61** | $-1198.33 | $14.94 | 118 | 50% | $-1480.23 | 7 |
| mm_sports_v2 | **$8198.67** | $-1726.13 | $-75.2 | 210 | 50% | $-1945.26 | 8 |
| momentum | **$7257.01** | $-2644.98 | $-98.01 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6706.37** | $-2947.22 | $-346.41 | 510 | 47% | $-3398.68 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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
