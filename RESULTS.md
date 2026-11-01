# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85812 · Last run: 2026-11-01T18:56:07.835Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11735.9** | $1539.66 | $196.24 | 497 | 54% | $689.66 | 25 |
| maker_sports | **$11581.22** | $1724.14 | $-142.92 | 103 | 61% | $1511.64 | 8 |
| mid_momentum | **$10731.68** | $760.42 | $-28.74 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10657.49** | $830.25 | $-172.76 | 553 | 54% | $621.15 | 8 |
| mm_cheap | **$10293.23** | $482.82 | $-189.59 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10273.23** | $303.95 | $-30.72 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10210.47** | $319.37 | $-108.9 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$10003.47** | $-45.23 | $48.7 | 169 | 95% | $-55.97 | 25 |
| conviction | **$9690.75** | $-306.99 | $-2.26 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9682.07** | $-151.57 | $-166.36 | 657 | 55% | $-370.7 | 9 |
| mid_momentum_v2 | **$9506.5** | $-464.76 | $-28.74 | 132 | 51% | $-657.31 | 25 |
| mm_cheap_v2 | **$9443.59** | $-366.82 | $-189.59 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9345.02** | $-348.45 | $-306.53 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9156.86** | $-827.88 | $-15.26 | 520 | 53% | $-2156.45 | 25 |
| strong_dip | **$9096.55** | $-963.24 | $59.79 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8988.01** | $-899.06 | $-112.93 | 190 | 55% | $-1513.35 | 25 |
| super | **$8919.32** | $-1150.21 | $69.53 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8647.15** | $-1007.21 | $-345.64 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8452.76** | $-1380.88 | $-166.36 | 226 | 52% | $-1600.01 | 9 |
| momentum | **$7216.54** | $-2740.4 | $-43.06 | 306 | 65% | $-3228.64 | 25 |
| whale_fade | **$6355.98** | $-3193.42 | $-450.6 | 521 | 47% | $-3644.88 | 25 |
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
| maker_sports | 111 | 1 | 1 | 99% | 1.41¢ |

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
