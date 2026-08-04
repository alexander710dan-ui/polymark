# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28085 · Last run: 2026-08-04T03:52:40.887Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11191.69** | $1230.23 | $-38.54 | 336 | 57% | $1027.2 | 14 |
| mm_tight | **$10824.23** | $760.68 | $63.55 | 292 | 54% | $557.65 | 10 |
| mm_cheap | **$10535.39** | $904.81 | $-369.42 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10361.62** | $679.34 | $-317.72 | 198 | 58% | $465.86 | 25 |
| copy_top | **$9982.65** | $-162.67 | $145.32 | 395 | 52% | $-1491.24 | 21 |
| fade_longshot | **$9966.47** | $47.31 | $-80.84 | 107 | 95% | $36.57 | 25 |
| maker_flat | **$9935.41** | $-283.72 | $219.13 | 25 | 44% | $-461.5 | 13 |
| strong_dip | **$9780.16** | $-463.45 | $243.61 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9681.6** | $-604.36 | $285.96 | 374 | 51% | $-1454.36 | 23 |
| super | **$9610.53** | $-353.9 | $-35.57 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9503.63** | $-293.14 | $-203.23 | 120 | 53% | $-412.61 | 4 |
| maker_sports | **$9494.41** | $-671.45 | $165.86 | 49 | 47% | $-857.16 | 7 |
| ai_judge | **$9423.98** | $-587.64 | $11.62 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9117.67** | $-624.29 | $-258.04 | 51 | 51% | $-810 | 25 |
| random_control | **$9056.7** | $-457.3 | $-486 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8588.61** | $-791.06 | $-620.33 | 72 | 49% | $-995.01 | 25 |
| momentum | **$8290.29** | $-1163.43 | $-546.28 | 247 | 67% | $-1651.67 | 25 |
| whale_fade | **$7242.28** | $-2274.9 | $-482.82 | 396 | 47% | $-2629.45 | 21 |
| copy_month (retired) | **$9382.14** | $-730.36 | $112.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.97** | $-942.24 | $-19.79 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.25** | $-1937.09 | $243.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5090.7** | $-4691.55 | $-217.75 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 0 | 60% | 2.96¢ |
| maker_sports | 56 | 28 | 2 | 67% | 1.61¢ |

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
