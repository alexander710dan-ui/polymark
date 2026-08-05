# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32646 · Last run: 2026-08-05T22:20:15.900Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10769.87** | $1038.29 | $-268.42 | 399 | 54% | $835.26 | 18 |
| mm_cheap | **$10486.15** | $887.82 | $-401.67 | 35 | 66% | $710.04 | 25 |
| mid_momentum | **$10473.85** | $763.13 | $-289.28 | 209 | 57% | $549.65 | 25 |
| mm_cheap_v2 | **$10053.64** | $-41.54 | $95.18 | 22 | 55% | $-153.46 | 25 |
| super | **$10005.29** | $-425.73 | $431.02 | 73 | 48% | $-641.58 | 14 |
| fade_longshot | **$9848.41** | $25.97 | $-177.56 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9831.51** | $-387.99 | $219.5 | 416 | 52% | $-1716.56 | 25 |
| copy_pro | **$9725.85** | $-801.45 | $527.3 | 396 | 51% | $-1651.45 | 25 |
| mid_momentum_v2 | **$9701.25** | $-181.29 | $-117.46 | 22 | 50% | $-293.21 | 25 |
| mm_sports | **$9692.4** | $-4.94 | $-302.66 | 468 | 55% | $-224.07 | 23 |
| mm_max | **$9580.55** | $-289.7 | $-129.75 | 174 | 53% | $-456.82 | 5 |
| strong_dip | **$9521.71** | $-482.76 | $4.47 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9348.43** | $-587.64 | $-63.93 | 7 | 14% | $-600 | 2 |
| random_control | **$8968.55** | $-1000.59 | $-30.86 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8765.32** | $-548.67 | $-686.01 | 58 | 52% | $-734.38 | 25 |
| maker_flat | **$8598.98** | $-1149 | $-252.02 | 84 | 42% | $-1343.12 | 18 |
| mm_strong | **$8508.08** | $-908.46 | $-583.46 | 84 | 48% | $-1112.41 | 25 |
| mm_sports_v2 | **$8475** | $-1165.56 | $-359.44 | 36 | 39% | $-1291.58 | 22 |
| momentum | **$8120.8** | $-1160.77 | $-718.43 | 262 | 68% | $-1649.01 | 25 |
| maker_sports | **$7950.35** | $-1598.15 | $-451.5 | 153 | 48% | $-1801.18 | 9 |
| whale_fade | **$6921.02** | $-2434.9 | $-644.08 | 417 | 47% | $-2789.45 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.09** | $-931.5 | $-70.41 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 102 | 68 | 1 | 60% | 2.96¢ |
| maker_sports | 162 | 106 | 11 | 60% | 1.59¢ |

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
