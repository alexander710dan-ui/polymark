# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32075 · Last run: 2026-08-05T17:02:08.425Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11273.22** | $1107.24 | $165.98 | 377 | 54% | $904.21 | 17 |
| mm_sports | **$10875.07** | $1057.53 | $-182.46 | 440 | 56% | $838.4 | 25 |
| mid_momentum | **$10657.62** | $967.28 | $-309.66 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10469.82** | $887.82 | $-418 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9942.98** | $111.17 | $-168.19 | 118 | 96% | $100.43 | 25 |
| mm_max | **$9939.86** | $-330.56 | $270.42 | 163 | 53% | $-497.68 | 5 |
| super | **$9899.21** | $-425.73 | $324.94 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9846.39** | $54.87 | $-208.48 | 8 | 63% | $-42.63 | 25 |
| copy_top | **$9692.7** | $-477.25 | $169.95 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9665.67** | $-53.47 | $-280.86 | 9 | 56% | $-150.97 | 21 |
| mid_momentum_v2 | **$9621.92** | $-53.47 | $-324.61 | 9 | 56% | $-150.97 | 25 |
| strong_dip | **$9503.79** | $-528.32 | $32.11 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9314.1** | $-1246.73 | $560.83 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9062.57** | $-516.83 | $-420.6 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8949.15** | $-856.55 | $-194.3 | 131 | 50% | $-1059.58 | 13 |
| random_control | **$8877.15** | $-1058.61 | $-64.24 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8701.88** | $-876.62 | $-421.5 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8450.6** | $-1380.33 | $-169.07 | 76 | 39% | $-1574.45 | 22 |
| momentum | **$8209.36** | $-1076.77 | $-713.87 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7287.83** | $-2055.23 | $-656.94 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.26** | $-931.5 | $-72.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 1 | 61% | 2.97¢ |
| maker_sports | 144 | 94 | 5 | 61% | 1.58¢ |

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
