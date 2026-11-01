# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85039 · Last run: 2026-11-01T13:34:48.345Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11615.03** | $1510.09 | $104.94 | 495 | 54% | $660.09 | 25 |
| maker_sports | **$11589.77** | $1410.31 | $179.46 | 100 | 60% | $1197.81 | 5 |
| mid_momentum | **$10872.04** | $695.75 | $176.29 | 296 | 56% | $482.27 | 25 |
| mm_tight | **$10804.32** | $667.55 | $136.77 | 551 | 54% | $458.45 | 5 |
| mm_cheap | **$10423.11** | $418.15 | $4.96 | 124 | 56% | $226.46 | 25 |
| maker_flat | **$10357.12** | $303.95 | $53.17 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10294.39** | $319.37 | $-24.98 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$9987.68** | $-60.67 | $48.35 | 164 | 95% | $-71.41 | 25 |
| mm_sports | **$9707.9** | $-438.74 | $146.64 | 654 | 55% | $-657.87 | 5 |
| conviction | **$9692.5** | $-306.99 | $-0.51 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9646.86** | $-529.43 | $176.29 | 131 | 50% | $-721.98 | 25 |
| mm_cheap_v2 | **$9573.47** | $-431.49 | $4.96 | 141 | 52% | $-623.18 | 25 |
| mm_strong | **$9474.93** | $-415.89 | $-109.18 | 173 | 54% | $-619.84 | 25 |
| copy_top | **$9243.3** | $-745.53 | $-11.17 | 518 | 53% | $-2074.1 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9030.69** | $-963.24 | $-6.07 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8945.78** | $-899.06 | $-155.16 | 190 | 55% | $-1513.35 | 25 |
| super | **$8927.35** | $-1150.21 | $77.56 | 123 | 50% | $-1432.11 | 2 |
| mm_slow | **$8770.69** | $-1007.21 | $-222.1 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8478.59** | $-1668.05 | $146.64 | 223 | 51% | $-1887.18 | 5 |
| momentum | **$7232.08** | $-2744.41 | $-23.51 | 305 | 65% | $-3232.65 | 25 |
| whale_fade | **$6408.74** | $-3132.75 | $-458.51 | 519 | 47% | $-3584.21 | 25 |
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
| maker_sports | 105 | 1 | 0 | 99% | 1.43¢ |

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
