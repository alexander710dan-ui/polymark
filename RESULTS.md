# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30742 · Last run: 2026-08-05T04:30:55.179Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11158.59** | $934.86 | $223.73 | 417 | 56% | $715.73 | 7 |
| mm_tight | **$11053.11** | $976.98 | $76.13 | 360 | 54% | $773.95 | 5 |
| mid_momentum | **$10783.22** | $967.28 | $-184.06 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10479.31** | $887.82 | $-408.51 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10003.9** | $-169.55 | $173.45 | 407 | 52% | $-1498.12 | 25 |
| copy_pro | **$9950.08** | $-373.48 | $323.56 | 387 | 51% | $-1223.48 | 24 |
| fade_longshot | **$9915.3** | $92.73 | $-177.43 | 115 | 96% | $81.99 | 25 |
| super | **$9883.1** | $-425.73 | $308.83 | 73 | 48% | $-641.58 | 11 |
| strong_dip | **$9495.76** | $-528.32 | $24.08 | 102 | 59% | $-620.63 | 25 |
| mm_max | **$9485.04** | $-590.31 | $75.35 | 159 | 52% | $-757.43 | 1 |
| ai_judge | **$9398.09** | $-587.64 | $-14.27 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9348.73** | $-663.72 | $12.45 | 114 | 51% | $-866.75 | 4 |
| mm_slow | **$9143.41** | $-516.83 | $-339.76 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8987.88** | $-955.81 | $-56.31 | 138 | 57% | $-1570.1 | 25 |
| maker_flat | **$8983.09** | $-817.63 | $-199.28 | 67 | 42% | $-1011.75 | 14 |
| mm_strong | **$8780.8** | $-876.62 | $-342.58 | 81 | 48% | $-1080.57 | 25 |
| momentum | **$8232.18** | $-1099.28 | $-668.54 | 259 | 68% | $-1587.52 | 25 |
| whale_fade | **$7465.22** | $-2341.91 | $-192.87 | 408 | 48% | $-2696.46 | 25 |
| copy_month (retired) | **$9419.64** | $-730.36 | $150 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.37** | $-931.5 | $-64.13 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8476.25** | $-1937.09 | $413.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5097.57** | $-4791.55 | $-110.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 48 | 1 | 63% | 2.94¢ |
| maker_sports | 118 | 72 | 0 | 62% | 1.57¢ |

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
