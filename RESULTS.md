# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32669 · Last run: 2026-08-05T22:33:12.890Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10750.27** | $833.04 | $-82.77 | 401 | 54% | $630.01 | 17 |
| mm_cheap | **$10482.42** | $887.82 | $-405.4 | 35 | 66% | $710.04 | 25 |
| mid_momentum | **$10476.67** | $763.13 | $-286.46 | 209 | 57% | $549.65 | 25 |
| mm_cheap_v2 | **$10018.78** | $-144.14 | $162.92 | 23 | 52% | $-256.06 | 25 |
| super | **$9995.81** | $-425.73 | $421.54 | 73 | 48% | $-641.58 | 15 |
| fade_longshot | **$9848.01** | $25.97 | $-177.96 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9782.8** | $-387.99 | $170.79 | 416 | 52% | $-1716.56 | 25 |
| copy_pro | **$9698.46** | $-801.45 | $499.91 | 396 | 51% | $-1651.45 | 25 |
| mid_momentum_v2 | **$9696.52** | $-283.89 | $-19.59 | 23 | 48% | $-395.81 | 25 |
| mm_sports | **$9675.41** | $-210.19 | $-114.4 | 470 | 55% | $-429.32 | 22 |
| mm_max | **$9613.81** | $-392.15 | $5.96 | 175 | 53% | $-559.27 | 4 |
| strong_dip | **$9516.74** | $-482.76 | $-0.5 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9351.76** | $-587.64 | $-60.6 | 7 | 14% | $-600 | 2 |
| random_control | **$8927.66** | $-1000.59 | $-71.75 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8777.85** | $-548.67 | $-673.48 | 58 | 52% | $-734.38 | 25 |
| maker_flat | **$8581.67** | $-1249 | $-169.33 | 85 | 41% | $-1443.12 | 18 |
| mm_strong | **$8500.66** | $-908.46 | $-590.88 | 84 | 48% | $-1112.41 | 25 |
| mm_sports_v2 | **$8458.02** | $-1370.81 | $-171.17 | 38 | 37% | $-1496.83 | 21 |
| momentum | **$8136.69** | $-1142.52 | $-720.79 | 263 | 68% | $-1630.76 | 25 |
| maker_sports | **$7929.19** | $-1798.15 | $-272.66 | 155 | 48% | $-2001.18 | 11 |
| whale_fade | **$6953.22** | $-2434.9 | $-611.88 | 417 | 47% | $-2789.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.85** | $-931.5 | $-68.65 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 103 | 68 | 1 | 60% | 2.96¢ |
| maker_sports | 166 | 106 | 8 | 61% | 1.58¢ |

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
