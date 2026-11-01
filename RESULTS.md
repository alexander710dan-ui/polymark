# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86317 · Last run: 2026-11-01T22:24:23.713Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11947.85** | $1751.13 | $196.72 | 498 | 54% | $901.13 | 25 |
| maker_sports | **$11475.23** | $1524.14 | $-48.91 | 105 | 60% | $1311.64 | 11 |
| mid_momentum | **$10854.26** | $857.92 | $-3.66 | 298 | 56% | $644.44 | 25 |
| mm_tight | **$10619.34** | $624.65 | $-5.31 | 555 | 54% | $415.55 | 8 |
| maker_flat | **$10449.2** | $426.17 | $23.03 | 30 | 53% | $234.62 | 24 |
| mm_cheap | **$10440.74** | $580.32 | $-139.58 | 126 | 56% | $388.63 | 25 |
| mm_max | **$10284.98** | $216.12 | $68.86 | 231 | 54% | $7.02 | 2 |
| fade_longshot | **$10002.27** | $-39.09 | $41.36 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9690.39** | $-306.99 | $-2.62 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9629.08** | $-367.26 | $-3.66 | 133 | 51% | $-559.81 | 25 |
| mm_cheap_v2 | **$9591.1** | $-269.32 | $-139.58 | 143 | 52% | $-461.01 | 25 |
| mm_sports | **$9557.35** | $-357.17 | $-85.48 | 659 | 55% | $-576.3 | 11 |
| mm_strong | **$9391.37** | $-348.45 | $-260.18 | 174 | 54% | $-552.4 | 25 |
| copy_top | **$9232.37** | $-769.02 | $1.39 | 524 | 53% | $-2097.59 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9100.3** | $-963.24 | $63.54 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8987.48** | $-899.06 | $-113.46 | 190 | 55% | $-1513.35 | 25 |
| super | **$8919.05** | $-1150.21 | $69.26 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8655.41** | $-1007.21 | $-337.38 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8328.04** | $-1586.48 | $-85.48 | 228 | 51% | $-1805.61 | 11 |
| momentum | **$7206.3** | $-2734.26 | $-59.44 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6064.7** | $-3438.75 | $-496.55 | 525 | 47% | $-3890.21 | 25 |
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
