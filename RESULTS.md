# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28072 · Last run: 2026-08-04T03:45:22.782Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11190.5** | $1153.86 | $36.64 | 335 | 56% | $950.83 | 15 |
| mm_tight | **$10829.14** | $684.31 | $144.83 | 291 | 54% | $481.28 | 11 |
| mm_cheap | **$10541.99** | $904.81 | $-362.82 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10363.02** | $679.34 | $-316.32 | 198 | 58% | $465.86 | 25 |
| copy_top | **$9974.21** | $-162.67 | $136.88 | 395 | 52% | $-1491.24 | 21 |
| fade_longshot | **$9965.93** | $47.31 | $-81.38 | 107 | 95% | $36.57 | 25 |
| maker_flat | **$9936.37** | $-283.72 | $220.09 | 25 | 44% | $-461.5 | 13 |
| strong_dip | **$9777.78** | $-463.45 | $241.23 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9678.37** | $-604.36 | $282.73 | 374 | 51% | $-1454.36 | 22 |
| super | **$9605.77** | $-353.9 | $-40.33 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9504.61** | $-293.14 | $-202.25 | 120 | 53% | $-412.61 | 4 |
| maker_sports | **$9490.27** | $-753.27 | $243.54 | 48 | 46% | $-938.98 | 8 |
| ai_judge | **$9422.87** | $-587.64 | $10.51 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9122.6** | $-624.29 | $-253.11 | 51 | 51% | $-810 | 25 |
| random_control | **$9046.14** | $-457.3 | $-496.56 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8591.66** | $-791.06 | $-617.28 | 72 | 49% | $-995.01 | 25 |
| momentum | **$8294.94** | $-1163.43 | $-541.63 | 247 | 67% | $-1651.67 | 25 |
| whale_fade | **$7246.4** | $-2274.9 | $-478.7 | 396 | 47% | $-2629.45 | 21 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.38** | $-942.24 | $-20.38 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8309.58** | $-1937.09 | $246.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


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
