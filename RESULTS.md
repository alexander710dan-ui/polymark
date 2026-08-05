# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32004 · Last run: 2026-08-05T16:22:40.042Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11134.02** | $1001.51 | $132.51 | 376 | 54% | $798.48 | 16 |
| mm_sports | **$10771.84** | $951.8 | $-179.96 | 439 | 56% | $732.67 | 25 |
| mid_momentum | **$10727.09** | $967.28 | $-240.19 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10504.11** | $887.82 | $-383.71 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9937.95** | $111.17 | $-173.22 | 118 | 96% | $100.43 | 25 |
| super | **$9886.66** | $-425.73 | $312.39 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9850.13** | $-31.46 | $-118.41 | 7 | 57% | $-128.96 | 25 |
| mm_max | **$9789.14** | $-330.56 | $119.7 | 163 | 53% | $-497.68 | 4 |
| copy_top | **$9726.3** | $-477.25 | $203.55 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9621.14** | $-139.8 | $-239.06 | 8 | 50% | $-237.3 | 25 |
| mm_sports_v2 | **$9565.15** | $-139.8 | $-295.05 | 8 | 50% | $-237.3 | 21 |
| strong_dip | **$9457.75** | $-528.32 | $-13.93 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9331.09** | $-937.88 | $268.97 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9144.29** | $-516.83 | $-338.88 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8842.57** | $-1058.61 | $-98.82 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8777.36** | $-964.88 | $-257.76 | 130 | 50% | $-1167.91 | 11 |
| mm_strong | **$8773.96** | $-876.62 | $-349.42 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8376.55** | $-1380.33 | $-243.12 | 76 | 39% | $-1574.45 | 20 |
| momentum | **$8236.5** | $-1076.77 | $-686.73 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7308.44** | $-2055.23 | $-636.33 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 96 | 62 | 0 | 61% | 2.99¢ |
| maker_sports | 141 | 92 | 7 | 61% | 1.58¢ |

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
