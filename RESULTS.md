# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32083 · Last run: 2026-08-05T17:06:33.810Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11232.88** | $1219.16 | $13.72 | 378 | 54% | $1016.13 | 16 |
| mm_sports | **$10835.4** | $1183.55 | $-348.15 | 441 | 56% | $964.42 | 24 |
| mid_momentum | **$10639.82** | $967.28 | $-327.46 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10478.91** | $887.82 | $-408.91 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9943.52** | $111.17 | $-167.65 | 118 | 96% | $100.43 | 25 |
| super | **$9899.29** | $-425.73 | $325.02 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9896.99** | $-218.64 | $115.63 | 164 | 54% | $-385.76 | 4 |
| mm_cheap_v2 | **$9790.77** | $166.79 | $-376.02 | 9 | 67% | $54.87 | 25 |
| copy_top | **$9689.13** | $-477.25 | $166.38 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9628.4** | $72.55 | $-444.15 | 10 | 60% | $-53.47 | 20 |
| mid_momentum_v2 | **$9566.86** | $58.45 | $-491.59 | 10 | 60% | $-53.47 | 25 |
| strong_dip | **$9512.11** | $-528.32 | $40.43 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9269.76** | $-1246.73 | $516.49 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9024.08** | $-516.83 | $-459.09 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8939.67** | $-1058.61 | $-1.72 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8912.19** | $-713.83 | $-373.98 | 132 | 51% | $-916.86 | 12 |
| mm_strong | **$8680.75** | $-876.62 | $-442.63 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8547.65** | $-1237.61 | $-214.74 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8209.62** | $-1076.77 | $-713.61 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7288.37** | $-2055.23 | $-656.4 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.26** | $-931.5 | $-72.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 1 | 61% | 2.97¢ |
| maker_sports | 144 | 95 | 4 | 60% | 1.58¢ |

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
