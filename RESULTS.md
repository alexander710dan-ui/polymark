# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71890 · Last run: 2026-10-29T20:23:36.428Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10896.68** | $608.09 | $288.59 | 443 | 53% | $-241.91 | 25 |
| maker_sports | **$10674.78** | $699.24 | $-24.46 | 19 | 74% | $507.69 | 7 |
| mm_tight | **$10618.15** | $605.55 | $12.6 | 483 | 54% | $396.45 | 3 |
| mid_momentum | **$10545.94** | $503.32 | $42.62 | 261 | 56% | $289.84 | 21 |
| fade_longshot | **$10093.73** | $89.44 | $4.29 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9997.21** | $-16.21 | $13.42 | 208 | 53% | $-225.31 | 2 |
| maker_flat | **$9886.6** | $93 | $-206.4 | 11 | 55% | $-98.55 | 20 |
| mm_cheap | **$9837.69** | $-148.79 | $-13.52 | 80 | 54% | $-331.25 | 17 |
| copy_top | **$9655.36** | $-442.32 | $97.68 | 458 | 53% | $-1770.89 | 16 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9539.23** | $-422.81 | $-37.96 | 572 | 55% | $-641.94 | 7 |
| strong_dip | **$9508.31** | $-335.55 | $-156.14 | 140 | 61% | $-427.86 | 10 |
| mid_momentum_v2 | **$9320.76** | $-721.86 | $42.62 | 96 | 49% | $-912.68 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$8988.05** | $-998.43 | $-13.52 | 97 | 48% | $-1189.25 | 17 |
| mm_strong | **$8801.49** | $-1210.99 | $12.48 | 138 | 51% | $-1414.94 | 18 |
| random_control | **$8779.19** | $-1190.91 | $-29.9 | 182 | 56% | $-1805.2 | 25 |
| mm_slow | **$8388.24** | $-1704.03 | $92.27 | 101 | 48% | $-1889.74 | 17 |
| mm_sports_v2 | **$8309.92** | $-1652.12 | $-37.96 | 141 | 50% | $-1871.25 | 7 |
| momentum | **$7411.58** | $-2533.86 | $-54.56 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6146.56** | $-3714.82 | $-138.62 | 459 | 46% | $-4069.37 | 16 |
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
| maker_flat | 31 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 26 | 1 | 0 | 96% | 1.77¢ |

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
