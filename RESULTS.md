# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86501 · Last run: 2026-11-01T23:40:45.055Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11872.74** | $1751.13 | $121.61 | 498 | 54% | $901.13 | 25 |
| maker_sports | **$11699.09** | $1572.63 | $126.46 | 108 | 60% | $1360.13 | 8 |
| mm_tight | **$10895.74** | $708.54 | $187.2 | 558 | 54% | $499.44 | 6 |
| mid_momentum | **$10850.73** | $857.92 | $-7.19 | 298 | 56% | $644.44 | 25 |
| maker_flat | **$10439.63** | $426.17 | $13.46 | 30 | 53% | $234.62 | 24 |
| mm_cheap | **$10421.41** | $580.32 | $-158.91 | 126 | 56% | $388.63 | 25 |
| mm_max | **$10291.14** | $216.12 | $75.02 | 231 | 54% | $7.02 | 2 |
| fade_longshot | **$10004.98** | $-39.09 | $44.07 | 170 | 95% | $-49.83 | 25 |
| mm_sports | **$9768.17** | $-326.52 | $94.69 | 662 | 55% | $-545.65 | 8 |
| conviction | **$9690.1** | $-306.99 | $-2.91 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9625.55** | $-367.26 | $-7.19 | 133 | 51% | $-559.81 | 25 |
| mm_cheap_v2 | **$9571.77** | $-269.32 | $-158.91 | 143 | 52% | $-461.01 | 25 |
| mm_strong | **$9368.97** | $-348.45 | $-282.58 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9168.1** | $-769.02 | $-62.88 | 524 | 53% | $-2097.59 | 25 |
| strong_dip | **$9104.01** | $-963.24 | $67.25 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8987.1** | $-899.06 | $-113.84 | 190 | 55% | $-1513.35 | 25 |
| super | **$8915.95** | $-1150.21 | $66.16 | 123 | 50% | $-1432.11 | 4 |
| mm_slow | **$8646.12** | $-1007.21 | $-346.67 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8538.86** | $-1555.83 | $94.69 | 231 | 52% | $-1774.96 | 8 |
| momentum | **$7207.12** | $-2734.26 | $-58.62 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6358.25** | $-3438.75 | $-203 | 525 | 47% | $-3890.21 | 25 |
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
