# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33354 · Last run: 2026-08-06T04:54:03.788Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10409.47** | $661.27 | $-251.8 | 214 | 57% | $447.79 | 25 |
| mm_cheap | **$10382.19** | $787.82 | $-405.63 | 36 | 64% | $610.04 | 25 |
| super | **$10327.71** | $251.33 | $76.38 | 78 | 51% | $-13 | 12 |
| mm_tight | **$10309.67** | $444.03 | $-134.36 | 428 | 53% | $234.93 | 7 |
| copy_top | **$10095.14** | $-14.85 | $109.99 | 423 | 52% | $-1343.42 | 21 |
| fade_longshot | **$9864.09** | $25.97 | $-161.88 | 123 | 95% | $15.23 | 25 |
| mm_cheap_v2 | **$9755.12** | $38.7 | $-283.58 | 44 | 55% | $-152.12 | 19 |
| mid_momentum_v2 | **$9731.66** | $63.07 | $-331.41 | 40 | 53% | $-127.75 | 22 |
| copy_pro | **$9710.1** | $-611.84 | $321.94 | 402 | 51% | $-1461.84 | 23 |
| mm_sports | **$9627.13** | $-206.1 | $-166.77 | 504 | 55% | $-425.23 | 8 |
| strong_dip | **$9605.47** | $-494.63 | $100.1 | 106 | 59% | $-586.94 | 24 |
| mm_max | **$9555.24** | $-332.35 | $-112.41 | 191 | 53% | $-541.45 | 2 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$8997.03** | $-1085.22 | $82.25 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8730.47** | $-707.39 | $-562.14 | 61 | 51% | $-893.1 | 25 |
| maker_flat | **$8581.54** | $-1218.24 | $-200.22 | 93 | 42% | $-1412.36 | 16 |
| mm_sports_v2 | **$8369.9** | $-1511.6 | $-118.5 | 74 | 45% | $-1730.73 | 6 |
| mm_strong | **$8303.64** | $-1112.97 | $-583.39 | 90 | 47% | $-1316.92 | 25 |
| momentum | **$8012.76** | $-1274.22 | $-713.02 | 268 | 68% | $-1762.46 | 25 |
| maker_sports | **$7629.52** | $-2262.76 | $-107.72 | 183 | 48% | $-2465.79 | 2 |
| whale_fade | **$6628.61** | $-2968.28 | $-403.11 | 424 | 47% | $-3322.83 | 21 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.89** | $-931.5 | $-70.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.32** | $-4791.55 | $-99.13 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 75 | 1 | 59% | 2.95¢ |
| maker_sports | 185 | 121 | 3 | 60% | 1.54¢ |

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
