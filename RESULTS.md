# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84899 · Last run: 2026-11-14T02:00:30.891Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13121.9** | $3181.61 | $-59.71 | 457 | 57% | $2936.78 | 19 |
| copy_pro | **$12382.67** | $2319.6 | $63.07 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11522.86** | $1706.04 | $-183.18 | 873 | 53% | $1486.91 | 18 |
| mid_momentum | **$11394.24** | $1346.27 | $47.97 | 426 | 55% | $1126.45 | 25 |
| maker_flat | **$11163.54** | $1119.44 | $44.1 | 138 | 53% | $925.32 | 25 |
| mm_cheap | **$10773.07** | $828.3 | $-55.23 | 287 | 53% | $608.48 | 25 |
| mm_max | **$10733.32** | $834.22 | $-100.9 | 342 | 55% | $625.12 | 2 |
| mid_momentum_v2 | **$10169.06** | $121.09 | $47.97 | 261 | 52% | $-98.73 | 25 |
| mm_cheap_v2 | **$9923.43** | $-21.34 | $-55.23 | 304 | 52% | $-241.16 | 25 |
| fade_longshot | **$9876.98** | $-138.8 | $15.78 | 231 | 94% | $-149.54 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9146.92** | $-694.42 | $-158.66 | 1035 | 53% | $-913.55 | 21 |
| mm_slow | **$8997.74** | $-770.53 | $-231.73 | 223 | 52% | $-989.66 | 24 |
| mm_strong | **$8667.17** | $-1323.5 | $-9.33 | 375 | 51% | $-1542.63 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8568.88** | $-1635.38 | $204.26 | 287 | 56% | $-1729.01 | 25 |
| copy_top | **$8373.76** | $-1570.4 | $-55.84 | 566 | 53% | $-2898.97 | 2 |
| mm_sports_v2 | **$7917.61** | $-1923.73 | $-158.66 | 604 | 51% | $-2142.86 | 21 |
| random_control | **$7327.3** | $-2535.61 | $-137.09 | 245 | 53% | $-3149.9 | 25 |
| momentum | **$7299.15** | $-2822.65 | $121.8 | 380 | 65% | $-3310.89 | 25 |
| whale_fade | **$5963.7** | $-4034.69 | $-1.61 | 565 | 46% | $-4486.15 | 2 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 163 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 476 | 4 | 0 | 99% | 1.38¢ |

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
