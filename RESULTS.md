# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31982 · Last run: 2026-08-05T16:10:19.200Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11136.64** | $1001.51 | $135.13 | 376 | 54% | $798.48 | 16 |
| mm_sports | **$10799.74** | $1053.45 | $-253.71 | 438 | 56% | $834.32 | 23 |
| mid_momentum | **$10737.47** | $967.28 | $-229.81 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10511.8** | $887.82 | $-376.02 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9939.63** | $111.17 | $-171.54 | 118 | 96% | $100.43 | 25 |
| super | **$9899.72** | $-425.73 | $325.45 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9876.83** | $70.19 | $-193.36 | 6 | 67% | $-27.31 | 25 |
| mm_max | **$9775.06** | $-330.56 | $105.62 | 163 | 53% | $-497.68 | 3 |
| copy_top | **$9739.27** | $-477.25 | $216.52 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9647.81** | $-38.15 | $-314.04 | 7 | 57% | $-135.65 | 25 |
| mm_sports_v2 | **$9608.48** | $-38.15 | $-353.37 | 7 | 57% | $-135.65 | 19 |
| strong_dip | **$9456.48** | $-528.32 | $-15.2 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.75** | $-587.64 | $-27.61 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9366** | $-937.88 | $303.88 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9147.05** | $-516.83 | $-336.12 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8822.38** | $-1058.61 | $-119.01 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8776.85** | $-876.62 | $-346.53 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8749.3** | $-864.88 | $-385.82 | 129 | 50% | $-1067.91 | 11 |
| maker_flat | **$8352.14** | $-1380.33 | $-267.53 | 76 | 39% | $-1574.45 | 20 |
| momentum | **$8239.36** | $-1076.77 | $-683.87 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7301.78** | $-2055.23 | $-642.99 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.03** | $-931.5 | $-70.47 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8516.25** | $-1937.09 | $453.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 96 | 62 | 0 | 61% | 2.99¢ |
| maker_sports | 140 | 92 | 7 | 60% | 1.58¢ |

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
