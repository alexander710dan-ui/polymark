# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32086 · Last run: 2026-08-05T17:08:02.250Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11226.41** | $1116.91 | $109.5 | 379 | 54% | $913.88 | 15 |
| mm_sports | **$10828.93** | $1081.3 | $-252.37 | 442 | 56% | $862.17 | 23 |
| mid_momentum | **$10635.43** | $967.28 | $-331.85 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10476.79** | $887.82 | $-411.03 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9945.5** | $111.17 | $-165.67 | 118 | 96% | $100.43 | 25 |
| mm_max | **$9897.24** | $-218.64 | $115.88 | 164 | 54% | $-385.76 | 4 |
| super | **$9894.29** | $-425.73 | $320.02 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9783.28** | $166.79 | $-383.51 | 9 | 67% | $54.87 | 25 |
| copy_top | **$9688.81** | $-477.25 | $166.06 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9621.92** | $-29.7 | $-348.38 | 11 | 55% | $-155.72 | 19 |
| mid_momentum_v2 | **$9561.47** | $-43.8 | $-394.73 | 11 | 55% | $-155.72 | 25 |
| strong_dip | **$9514.87** | $-528.32 | $43.19 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9263.21** | $-1246.73 | $509.94 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9021.1** | $-516.83 | $-462.07 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8933.73** | $-1058.61 | $-7.66 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8918.18** | $-813.83 | $-267.99 | 133 | 50% | $-1016.86 | 12 |
| mm_strong | **$8678.86** | $-876.62 | $-444.52 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8512.97** | $-1237.61 | $-249.42 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8208.09** | $-1076.77 | $-715.14 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7287.37** | $-2055.23 | $-657.4 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 1 | 61% | 2.97¢ |
| maker_sports | 145 | 96 | 3 | 60% | 1.58¢ |

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
