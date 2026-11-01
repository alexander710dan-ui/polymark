# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86064 · Last run: 2026-11-01T20:40:27.581Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11718.32** | $1539.66 | $178.66 | 497 | 54% | $689.66 | 25 |
| maker_sports | **$11392.22** | $1624.14 | $-231.92 | 104 | 61% | $1411.64 | 9 |
| mid_momentum | **$10743.2** | $760.42 | $-17.22 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10551.12** | $727 | $-175.88 | 554 | 54% | $517.9 | 7 |
| mm_cheap | **$10299.79** | $482.82 | $-183.03 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10284.37** | $303.95 | $-19.58 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10201.09** | $216.12 | $-15.03 | 231 | 54% | $7.02 | 1 |
| fade_longshot | **$10001.34** | $-39.09 | $40.43 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9690.39** | $-306.99 | $-2.62 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9518.02** | $-464.76 | $-17.22 | 132 | 51% | $-657.31 | 25 |
| mm_sports | **$9490.33** | $-254.82 | $-254.85 | 658 | 55% | $-473.95 | 9 |
| mm_cheap_v2 | **$9450.15** | $-366.82 | $-183.03 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9355.58** | $-348.45 | $-295.97 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9117.89** | $-930.83 | $48.72 | 521 | 52% | $-2259.4 | 25 |
| strong_dip | **$9111.25** | $-963.24 | $74.49 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8990.83** | $-899.06 | $-110.11 | 190 | 55% | $-1513.35 | 25 |
| super | **$8918.36** | $-1150.21 | $68.57 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8651.91** | $-1007.21 | $-340.88 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8261.02** | $-1484.13 | $-254.85 | 227 | 52% | $-1703.26 | 9 |
| momentum | **$7204** | $-2734.26 | $-61.74 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6284.42** | $-3128.75 | $-586.83 | 522 | 47% | $-3580.21 | 25 |
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
| maker_flat | 54 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 113 | 1 | 0 | 99% | 1.4¢ |

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
