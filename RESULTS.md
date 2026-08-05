# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32084 · Last run: 2026-08-05T17:07:08.488Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11232.88** | $1219.16 | $13.72 | 378 | 54% | $1016.13 | 16 |
| mm_sports | **$10835.4** | $1183.55 | $-348.15 | 441 | 56% | $964.42 | 24 |
| mid_momentum | **$10636.72** | $967.28 | $-330.56 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10478.26** | $887.82 | $-409.56 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9944.86** | $111.17 | $-166.31 | 118 | 96% | $100.43 | 25 |
| mm_max | **$9896.99** | $-218.64 | $115.63 | 164 | 54% | $-385.76 | 4 |
| super | **$9896.24** | $-425.73 | $321.97 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9790.24** | $166.79 | $-376.55 | 9 | 67% | $54.87 | 25 |
| copy_top | **$9688.03** | $-477.25 | $165.28 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9628.4** | $72.55 | $-444.15 | 10 | 60% | $-53.47 | 20 |
| mid_momentum_v2 | **$9566.35** | $58.45 | $-492.1 | 10 | 60% | $-53.47 | 25 |
| strong_dip | **$9514.01** | $-528.32 | $42.33 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9262.14** | $-1246.73 | $508.87 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9023.6** | $-516.83 | $-459.57 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8933.73** | $-1058.61 | $-7.66 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8912.19** | $-713.83 | $-373.98 | 132 | 51% | $-916.86 | 12 |
| mm_strong | **$8680.25** | $-876.62 | $-443.13 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8547.23** | $-1237.61 | $-215.16 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8207.44** | $-1076.77 | $-715.79 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7288.68** | $-2055.23 | $-656.09 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
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
