# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32628 · Last run: 2026-08-05T22:10:14.388Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10698.57** | $958.72 | $-260.15 | 398 | 54% | $755.69 | 16 |
| mm_cheap | **$10486.72** | $887.82 | $-401.1 | 35 | 66% | $710.04 | 25 |
| mid_momentum | **$10449.24** | $763.13 | $-313.89 | 209 | 57% | $549.65 | 25 |
| mm_cheap_v2 | **$10020.55** | $-41.54 | $62.09 | 22 | 55% | $-153.46 | 25 |
| super | **$9998.34** | $-425.73 | $424.07 | 73 | 48% | $-641.58 | 14 |
| fade_longshot | **$9850.56** | $25.97 | $-175.41 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9831.41** | $-387.99 | $219.4 | 416 | 52% | $-1716.56 | 25 |
| copy_pro | **$9720.22** | $-801.45 | $521.67 | 396 | 51% | $-1651.45 | 25 |
| mid_momentum_v2 | **$9684.8** | $-181.29 | $-133.91 | 22 | 50% | $-293.21 | 25 |
| mm_sports | **$9619.89** | $-4.94 | $-375.17 | 468 | 55% | $-224.07 | 19 |
| mm_max | **$9563.66** | $-289.7 | $-146.64 | 174 | 53% | $-456.82 | 2 |
| strong_dip | **$9522.69** | $-482.76 | $5.45 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9350.65** | $-587.64 | $-61.71 | 7 | 14% | $-600 | 2 |
| random_control | **$8963.43** | $-1000.59 | $-35.98 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8748.76** | $-548.67 | $-702.57 | 58 | 52% | $-734.38 | 25 |
| maker_flat | **$8581.49** | $-1049 | $-369.51 | 83 | 42% | $-1243.12 | 19 |
| mm_strong | **$8491.86** | $-908.46 | $-599.68 | 84 | 48% | $-1112.41 | 25 |
| mm_sports_v2 | **$8404.66** | $-1245.13 | $-350.21 | 35 | 37% | $-1371.15 | 19 |
| momentum | **$8120.51** | $-1160.77 | $-718.72 | 262 | 68% | $-1649.01 | 25 |
| maker_sports | **$7927.95** | $-1598.15 | $-473.9 | 153 | 48% | $-1801.18 | 9 |
| whale_fade | **$6923.56** | $-2434.9 | $-641.54 | 417 | 47% | $-2789.45 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.26** | $-931.5 | $-69.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 102 | 68 | 1 | 60% | 2.96¢ |
| maker_sports | 162 | 105 | 8 | 61% | 1.59¢ |

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
