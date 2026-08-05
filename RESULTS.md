# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32609 · Last run: 2026-08-05T21:59:38.656Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10706.02** | $875.83 | $-169.81 | 397 | 54% | $672.8 | 15 |
| mm_cheap | **$10486.98** | $887.82 | $-400.84 | 35 | 66% | $710.04 | 25 |
| mid_momentum | **$10476.16** | $763.13 | $-286.97 | 209 | 57% | $549.65 | 25 |
| mm_cheap_v2 | **$10034.18** | $-41.54 | $75.72 | 22 | 55% | $-153.46 | 25 |
| super | **$9997.11** | $-425.73 | $422.84 | 73 | 48% | $-641.58 | 13 |
| fade_longshot | **$9847.35** | $22.92 | $-175.57 | 122 | 95% | $12.18 | 25 |
| copy_top | **$9834.19** | $-387.99 | $222.18 | 416 | 52% | $-1716.56 | 25 |
| copy_pro | **$9738.12** | $-801.45 | $539.57 | 396 | 51% | $-1651.45 | 25 |
| mid_momentum_v2 | **$9706.79** | $-181.29 | $-111.92 | 22 | 50% | $-293.21 | 25 |
| mm_sports | **$9627.11** | $96.96 | $-469.85 | 467 | 55% | $-122.17 | 18 |
| mm_max | **$9590.83** | $-289.7 | $-119.47 | 174 | 53% | $-456.82 | 2 |
| strong_dip | **$9518.11** | $-482.76 | $0.87 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9346.21** | $-587.64 | $-66.15 | 7 | 14% | $-600 | 2 |
| random_control | **$8976.31** | $-1000.59 | $-23.1 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8772.34** | $-548.67 | $-678.99 | 58 | 52% | $-734.38 | 25 |
| maker_flat | **$8606.82** | $-1049 | $-344.18 | 83 | 42% | $-1243.12 | 19 |
| mm_strong | **$8515.1** | $-908.46 | $-576.44 | 84 | 48% | $-1112.41 | 25 |
| mm_sports_v2 | **$8411.88** | $-1143.23 | $-444.89 | 34 | 38% | $-1269.25 | 18 |
| momentum | **$8124.32** | $-1160.77 | $-714.91 | 262 | 68% | $-1649.01 | 25 |
| maker_sports | **$7955.81** | $-1498.15 | $-546.04 | 152 | 49% | $-1701.18 | 10 |
| whale_fade | **$6923.47** | $-2434.9 | $-641.63 | 417 | 47% | $-2789.45 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.91** | $-931.5 | $-71.59 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8539.58** | $-1937.09 | $476.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 102 | 68 | 0 | 60% | 2.96¢ |
| maker_sports | 162 | 105 | 6 | 61% | 1.59¢ |

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
