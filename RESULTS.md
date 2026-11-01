# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86175 · Last run: 2026-11-01T21:25:31.816Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11799.82** | $1539.66 | $260.16 | 497 | 54% | $689.66 | 25 |
| maker_sports | **$11368.01** | $1624.14 | $-256.13 | 104 | 61% | $1411.64 | 11 |
| mid_momentum | **$10791.83** | $760.42 | $31.41 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10512.87** | $727 | $-214.13 | 554 | 54% | $517.9 | 9 |
| maker_flat | **$10445.94** | $303.95 | $141.99 | 29 | 52% | $112.4 | 25 |
| mm_cheap | **$10347.94** | $482.82 | $-134.88 | 125 | 56% | $291.13 | 25 |
| mm_max | **$10216.21** | $216.12 | $0.09 | 231 | 54% | $7.02 | 2 |
| fade_longshot | **$9999.18** | $-39.09 | $38.27 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9690.39** | $-306.99 | $-2.62 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9566.65** | $-464.76 | $31.41 | 132 | 51% | $-657.31 | 25 |
| mm_cheap_v2 | **$9498.3** | $-366.82 | $-134.88 | 142 | 52% | $-558.51 | 25 |
| mm_sports | **$9459.57** | $-254.82 | $-285.61 | 658 | 55% | $-473.95 | 11 |
| mm_strong | **$9361.97** | $-348.45 | $-289.58 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9159.19** | $-874.75 | $33.94 | 523 | 53% | $-2203.32 | 25 |
| strong_dip | **$9097.88** | $-963.24 | $61.12 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8991.02** | $-899.06 | $-109.92 | 190 | 55% | $-1513.35 | 25 |
| super | **$8918.59** | $-1150.21 | $68.8 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8658.92** | $-1007.21 | $-333.87 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8230.26** | $-1484.13 | $-285.61 | 227 | 52% | $-1703.26 | 11 |
| momentum | **$7200.69** | $-2734.26 | $-65.05 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6209.43** | $-3336.4 | $-454.17 | 524 | 47% | $-3787.86 | 25 |
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
| maker_sports | 115 | 1 | 0 | 99% | 1.4¢ |

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
