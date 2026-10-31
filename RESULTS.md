# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83267 · Last run: 2026-10-31T23:43:28.446Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11927.46** | $1350.53 | $576.93 | 488 | 53% | $500.53 | 25 |
| maker_sports | **$11337.71** | $1364.4 | $-26.69 | 90 | 60% | $1151.9 | 5 |
| mid_momentum | **$10968.49** | $861.05 | $107.44 | 292 | 56% | $647.57 | 24 |
| mm_tight | **$10770.01** | $817.3 | $-47.29 | 545 | 54% | $608.2 | 4 |
| mm_cheap | **$10398.97** | $463.76 | $-64.79 | 118 | 56% | $272.07 | 23 |
| mm_max | **$10272.42** | $271.77 | $0.65 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10233.77** | $140.79 | $92.98 | 28 | 50% | $-50.76 | 25 |
| fade_longshot | **$9958.87** | $-70.35 | $29.22 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9743.31** | $-364.13 | $107.44 | 127 | 51% | $-556.68 | 24 |
| conviction | **$9688.93** | $-306.99 | $-4.08 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9632.52** | $-258.69 | $-108.79 | 170 | 54% | $-462.64 | 23 |
| mm_cheap_v2 | **$9549.33** | $-385.88 | $-64.79 | 135 | 52% | $-577.57 | 23 |
| mm_sports | **$9519.75** | $-436.52 | $-43.73 | 644 | 55% | $-655.65 | 5 |
| copy_top | **$9403.07** | $-768.54 | $171.61 | 509 | 52% | $-2097.11 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9017.29** | $-794.17 | $-188.54 | 189 | 56% | $-1408.46 | 25 |
| super | **$8949.64** | $-1025.67 | $-24.69 | 119 | 50% | $-1307.57 | 6 |
| mm_slow | **$8885.53** | $-1007.21 | $-107.26 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8882.36** | $-1022.63 | $-95.01 | 161 | 58% | $-1116.26 | 22 |
| mm_sports_v2 | **$8290.44** | $-1665.83 | $-43.73 | 213 | 51% | $-1884.96 | 5 |
| momentum | **$7269.79** | $-2644.98 | $-85.23 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6547.06** | $-2947.22 | $-505.72 | 510 | 47% | $-3398.68 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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
