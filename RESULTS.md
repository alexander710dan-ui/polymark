# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32048 · Last run: 2026-08-05T16:47:05.446Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11275.24** | $1107.24 | $168 | 377 | 54% | $904.21 | 16 |
| mm_sports | **$10876.64** | $1057.53 | $-180.89 | 440 | 56% | $838.4 | 24 |
| mid_momentum | **$10691.36** | $967.28 | $-275.92 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10490.72** | $887.82 | $-397.1 | 35 | 66% | $710.04 | 25 |
| mm_max | **$9949.14** | $-330.56 | $279.7 | 163 | 53% | $-497.68 | 5 |
| fade_longshot | **$9938.25** | $111.17 | $-172.92 | 118 | 96% | $100.43 | 25 |
| super | **$9897.69** | $-425.73 | $323.42 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9896.29** | $54.87 | $-158.58 | 8 | 63% | $-42.63 | 25 |
| copy_top | **$9711.67** | $-477.25 | $188.92 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9669.61** | $-53.47 | $-276.92 | 9 | 56% | $-150.97 | 25 |
| mm_sports_v2 | **$9666** | $-53.47 | $-280.53 | 9 | 56% | $-150.97 | 20 |
| strong_dip | **$9483.29** | $-528.32 | $11.61 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9339.36** | $-1246.73 | $586.09 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9089.6** | $-516.83 | $-393.57 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8952.03** | $-856.55 | $-191.42 | 131 | 50% | $-1059.58 | 11 |
| random_control | **$8840.36** | $-1058.61 | $-101.03 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8736.85** | $-876.62 | $-386.53 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8440.46** | $-1380.33 | $-179.21 | 76 | 39% | $-1574.45 | 21 |
| momentum | **$8215.18** | $-1076.77 | $-708.05 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7300.79** | $-2055.23 | $-643.98 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.26** | $-931.5 | $-72.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 97 | 62 | 1 | 61% | 2.98¢ |
| maker_sports | 142 | 94 | 5 | 60% | 1.58¢ |

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
