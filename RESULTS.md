# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32333 · Last run: 2026-08-05T19:26:12.328Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10921.7** | $1035.41 | $-113.71 | 386 | 54% | $832.38 | 18 |
| mid_momentum | **$10642.34** | $867.28 | $-224.94 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10486.19** | $887.82 | $-401.63 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10270.72** | $634.47 | $-363.75 | 451 | 56% | $415.34 | 24 |
| super | **$9953.29** | $-425.73 | $379.02 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9944.22** | $120.58 | $-176.36 | 120 | 96% | $109.84 | 25 |
| mm_cheap_v2 | **$9830.54** | $-243.01 | $73.55 | 13 | 46% | $-354.93 | 25 |
| mid_momentum_v2 | **$9808.68** | $-249.92 | $58.6 | 15 | 47% | $-361.84 | 25 |
| mm_max | **$9790.9** | $-126.22 | $-82.88 | 168 | 54% | $-293.34 | 5 |
| copy_top | **$9713.62** | $-472.32 | $185.94 | 411 | 52% | $-1800.89 | 25 |
| strong_dip | **$9528.6** | $-482.76 | $11.36 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9363.3** | $-587.64 | $-49.06 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9179.56** | $-1348.73 | $528.29 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8987.1** | $-1012.4 | $-0.5 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8960.54** | $-516.83 | $-522.63 | 55 | 53% | $-702.54 | 25 |
| mm_sports_v2 | **$8938.52** | $-603.19 | $-458.29 | 18 | 39% | $-729.21 | 24 |
| maker_flat | **$8690.05** | $-1130.82 | $-179.13 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8676.21** | $-876.62 | $-447.17 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8460.72** | $-1109.75 | $-429.53 | 138 | 49% | $-1312.78 | 19 |
| momentum | **$8219.19** | $-1059.12 | $-721.69 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7165.87** | $-2155.23 | $-678.9 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.98** | $-931.5 | $-69.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 65 | 2 | 60% | 2.99¢ |
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
