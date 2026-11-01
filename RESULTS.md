# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86356 · Last run: 2026-11-01T22:40:39.691Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11978.87** | $1751.13 | $227.74 | 498 | 54% | $901.13 | 25 |
| maker_sports | **$11560.41** | $1424.14 | $136.27 | 106 | 59% | $1211.64 | 10 |
| mid_momentum | **$10859.12** | $857.92 | $1.2 | 298 | 56% | $644.44 | 25 |
| mm_tight | **$10755.31** | $522.05 | $233.26 | 556 | 53% | $312.95 | 8 |
| mm_cheap | **$10462.4** | $580.32 | $-117.92 | 126 | 56% | $388.63 | 25 |
| maker_flat | **$10456.07** | $426.17 | $29.9 | 30 | 53% | $234.62 | 24 |
| mm_max | **$10291.14** | $216.12 | $75.02 | 231 | 54% | $7.02 | 2 |
| fade_longshot | **$10002.97** | $-39.09 | $42.06 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9689.15** | $-306.99 | $-3.86 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9637.61** | $-459.77 | $97.38 | 660 | 55% | $-678.9 | 10 |
| mid_momentum_v2 | **$9633.94** | $-367.26 | $1.2 | 133 | 51% | $-559.81 | 25 |
| mm_cheap_v2 | **$9612.76** | $-269.32 | $-117.92 | 143 | 52% | $-461.01 | 25 |
| mm_strong | **$9411.75** | $-348.45 | $-239.8 | 174 | 54% | $-552.4 | 25 |
| copy_top | **$9272.11** | $-769.02 | $41.13 | 524 | 53% | $-2097.59 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9098.65** | $-963.24 | $61.89 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8989.66** | $-899.06 | $-111.28 | 190 | 55% | $-1513.35 | 25 |
| super | **$8916.57** | $-1150.21 | $66.78 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8656.68** | $-1007.21 | $-336.11 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8408.3** | $-1689.08 | $97.38 | 229 | 51% | $-1908.21 | 10 |
| momentum | **$7206.3** | $-2734.26 | $-59.44 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6040.46** | $-3438.75 | $-520.79 | 525 | 47% | $-3890.21 | 25 |
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
| maker_sports | 116 | 1 | 0 | 99% | 1.41¢ |

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
