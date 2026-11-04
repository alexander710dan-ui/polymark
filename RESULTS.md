# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91399 · Last run: 2026-11-04T05:35:01.423Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12490.27** | $2328.51 | $161.76 | 517 | 54% | $1478.51 | 18 |
| mm_cheap | **$11871.47** | $353.07 | $1518.4 | 146 | 55% | $161.38 | 23 |
| mid_momentum | **$11644.85** | $739.88 | $904.97 | 321 | 55% | $526.4 | 25 |
| maker_sports | **$11538.28** | $872.07 | $666.21 | 227 | 56% | $638.74 | 9 |
| maker_flat | **$11487.51** | $-55.03 | $1542.54 | 60 | 48% | $-249.15 | 22 |
| mm_tight | **$11328.04** | $909.08 | $418.96 | 662 | 54% | $689.95 | 10 |
| mm_cheap_v2 | **$11021.83** | $-496.57 | $1518.4 | 163 | 52% | $-688.26 | 23 |
| mid_momentum_v2 | **$10419.67** | $-485.3 | $904.97 | 156 | 51% | $-677.85 | 25 |
| mm_max | **$10202.1** | $-223.37 | $425.47 | 274 | 53% | $-432.47 | 8 |
| mm_slow | **$10077.02** | $-592.6 | $669.62 | 143 | 52% | $-801.7 | 25 |
| mm_strong | **$10009.27** | $-869.82 | $879.09 | 218 | 53% | $-1073.77 | 24 |
| fade_longshot | **$9897.47** | $-189.2 | $86.67 | 181 | 94% | $-199.94 | 25 |
| conviction | **$9593.08** | $-306.99 | $-99.93 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9355.65** | $-1250.95 | $606.6 | 787 | 54% | $-1470.08 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8696.59** | $-879.2 | $-424.21 | 202 | 59% | $-972.83 | 24 |
| super | **$8579.86** | $-1370.14 | $-50 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8406.98** | $-1146.58 | $-446.44 | 549 | 53% | $-2475.15 | 19 |
| mm_sports_v2 | **$8126.34** | $-2480.26 | $606.6 | 356 | 51% | $-2699.39 | 10 |
| random_control | **$7851.28** | $-1203.06 | $-945.66 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7503.2** | $-2991.46 | $494.66 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6354.91** | $-3527.96 | $-117.13 | 547 | 47% | $-3979.42 | 20 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 236 | 1 | 0 | 100% | 1.31¢ |

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
