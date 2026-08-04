# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28061 · Last run: 2026-08-04T03:39:16.927Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11161.65** | $1153.86 | $7.79 | 335 | 56% | $950.83 | 15 |
| mm_tight | **$10809.41** | $684.31 | $125.1 | 291 | 54% | $481.28 | 11 |
| mm_cheap | **$10532.27** | $904.81 | $-372.54 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10331.65** | $679.34 | $-347.69 | 198 | 58% | $465.86 | 25 |
| copy_top | **$9973.22** | $-162.67 | $135.89 | 395 | 52% | $-1491.24 | 21 |
| fade_longshot | **$9966.85** | $47.31 | $-80.46 | 107 | 95% | $36.57 | 25 |
| maker_flat | **$9917.5** | $-283.72 | $201.22 | 25 | 44% | $-461.5 | 13 |
| strong_dip | **$9773.59** | $-463.45 | $237.04 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9674.04** | $-604.36 | $278.4 | 374 | 51% | $-1454.36 | 22 |
| super | **$9606.47** | $-353.9 | $-39.63 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9481.03** | $-293.14 | $-225.83 | 120 | 53% | $-412.61 | 4 |
| maker_sports | **$9459.17** | $-753.27 | $212.44 | 48 | 46% | $-938.98 | 8 |
| ai_judge | **$9422.87** | $-587.64 | $10.51 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9116.7** | $-624.29 | $-259.01 | 51 | 51% | $-810 | 25 |
| random_control | **$9032.98** | $-457.3 | $-509.72 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8574.24** | $-791.06 | $-634.7 | 72 | 49% | $-995.01 | 25 |
| momentum | **$8276.86** | $-1163.43 | $-559.71 | 247 | 67% | $-1651.67 | 25 |
| whale_fade | **$7243.12** | $-2274.9 | $-481.98 | 396 | 47% | $-2629.45 | 21 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.38** | $-942.24 | $-20.38 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8309.58** | $-1937.09 | $246.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 0 | 60% | 2.96¢ |
| maker_sports | 56 | 27 | 2 | 67% | 1.61¢ |

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
