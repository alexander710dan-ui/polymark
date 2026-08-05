# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32328 · Last run: 2026-08-05T19:23:14.505Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10968.72** | $1035.41 | $-66.69 | 386 | 54% | $832.38 | 18 |
| mid_momentum | **$10667.22** | $867.28 | $-200.06 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10494.57** | $887.82 | $-393.25 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10313.03** | $634.47 | $-321.44 | 451 | 56% | $415.34 | 24 |
| fade_longshot | **$9944.22** | $120.58 | $-176.36 | 120 | 96% | $109.84 | 25 |
| super | **$9902.83** | $-425.73 | $328.56 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9829.13** | $-126.22 | $-44.65 | 168 | 54% | $-293.34 | 5 |
| mid_momentum_v2 | **$9756.34** | $-249.92 | $6.26 | 15 | 47% | $-361.84 | 25 |
| copy_top | **$9734.31** | $-472.32 | $206.63 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9722.18** | $-243.01 | $-34.81 | 13 | 46% | $-354.93 | 24 |
| strong_dip | **$9510.92** | $-482.76 | $-6.32 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9363.3** | $-587.64 | $-49.06 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9220.99** | $-1348.73 | $569.72 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8987.16** | $-1012.4 | $-0.44 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8987.09** | $-516.83 | $-496.08 | 55 | 53% | $-702.54 | 25 |
| mm_sports_v2 | **$8980.83** | $-603.19 | $-415.98 | 18 | 39% | $-729.21 | 24 |
| mm_strong | **$8701.24** | $-876.62 | $-422.14 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8667.83** | $-1130.82 | $-201.35 | 82 | 41% | $-1324.94 | 17 |
| maker_sports | **$8501.82** | $-1109.75 | $-388.43 | 138 | 49% | $-1312.78 | 19 |
| momentum | **$8230.3** | $-1059.12 | $-710.58 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7137.96** | $-2155.23 | $-706.81 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.98** | $-931.5 | $-69.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 65 | 1 | 60% | 2.99¢ |
| maker_sports | 157 | 101 | 3 | 61% | 1.61¢ |

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
