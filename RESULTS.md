# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86776 · Last run: 2026-11-02T01:35:56.343Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11662.49** | $1650.53 | $11.96 | 111 | 60% | $1438.03 | 8 |
| copy_pro | **$11611.48** | $1446.33 | $165.15 | 500 | 54% | $596.33 | 25 |
| mid_momentum | **$10895.12** | $857.92 | $37.2 | 298 | 56% | $644.44 | 25 |
| mm_tight | **$10847.44** | $772.52 | $74.92 | 561 | 54% | $563.42 | 5 |
| maker_flat | **$10500.71** | $426.17 | $74.54 | 30 | 53% | $234.62 | 25 |
| mm_cheap | **$10349.69** | $478.12 | $-128.43 | 127 | 56% | $286.43 | 25 |
| mm_max | **$10296.15** | $216.12 | $80.03 | 231 | 54% | $7.02 | 2 |
| fade_longshot | **$10002.14** | $-39.09 | $41.23 | 170 | 95% | $-49.83 | 25 |
| mm_sports | **$9717.27** | $-262.54 | $-20.19 | 665 | 55% | $-481.67 | 8 |
| conviction | **$9687.11** | $-306.99 | $-5.9 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9669.94** | $-367.26 | $37.2 | 133 | 51% | $-559.81 | 25 |
| mm_cheap_v2 | **$9500.05** | $-371.52 | $-128.43 | 144 | 52% | $-563.21 | 25 |
| mm_strong | **$9290.1** | $-450.65 | $-259.25 | 175 | 54% | $-654.6 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9060** | $-963.24 | $23.24 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8952.71** | $-899.06 | $-148.23 | 190 | 55% | $-1513.35 | 25 |
| copy_top | **$8922.46** | $-1053.52 | $-24.02 | 528 | 52% | $-2382.09 | 25 |
| super | **$8904.88** | $-1150.21 | $55.09 | 123 | 50% | $-1432.11 | 5 |
| mm_slow | **$8694.98** | $-1007.21 | $-297.81 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8487.96** | $-1491.85 | $-20.19 | 234 | 52% | $-1710.98 | 8 |
| momentum | **$7207.8** | $-2734.26 | $-57.94 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6596.48** | $-2998.02 | $-405.5 | 529 | 47% | $-3449.48 | 25 |
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
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 119 | 1 | 0 | 99% | 1.4¢ |

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
