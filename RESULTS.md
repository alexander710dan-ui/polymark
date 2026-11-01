# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85775 · Last run: 2026-11-01T18:40:16.057Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11742.91** | $1539.66 | $203.25 | 497 | 54% | $689.66 | 25 |
| maker_sports | **$11568.82** | $1591.58 | $-22.76 | 102 | 61% | $1379.08 | 8 |
| mid_momentum | **$10733.63** | $760.42 | $-26.79 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10644.77** | $830.25 | $-185.48 | 553 | 54% | $621.15 | 6 |
| mm_cheap | **$10299.63** | $482.82 | $-183.19 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10281.86** | $303.95 | $-22.09 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10211.01** | $319.37 | $-108.36 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$9998.82** | $-45.23 | $44.05 | 169 | 95% | $-55.97 | 25 |
| conviction | **$9690.97** | $-306.99 | $-2.04 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9674.43** | $-276.04 | $-49.53 | 656 | 55% | $-495.17 | 8 |
| mid_momentum_v2 | **$9508.45** | $-464.76 | $-26.79 | 132 | 51% | $-657.31 | 25 |
| mm_cheap_v2 | **$9449.99** | $-366.82 | $-183.19 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9345.4** | $-348.45 | $-306.15 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9182.71** | $-827.88 | $10.59 | 520 | 53% | $-2156.45 | 25 |
| strong_dip | **$9094.79** | $-963.24 | $58.03 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8986.29** | $-899.06 | $-114.65 | 190 | 55% | $-1513.35 | 25 |
| super | **$8923.24** | $-1150.21 | $73.45 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8650.6** | $-1007.21 | $-342.19 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8445.12** | $-1505.35 | $-49.53 | 225 | 52% | $-1724.48 | 8 |
| momentum | **$7217.59** | $-2740.4 | $-42.01 | 306 | 65% | $-3228.64 | 25 |
| whale_fade | **$6335.6** | $-3193.42 | $-470.98 | 521 | 47% | $-3644.88 | 25 |
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
| maker_sports | 110 | 1 | 0 | 99% | 1.41¢ |

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
