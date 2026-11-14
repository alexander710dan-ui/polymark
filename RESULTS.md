# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84973 · Last run: 2026-11-14T03:00:36.332Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13343.03** | $3081.61 | $261.42 | 458 | 57% | $2836.78 | 21 |
| copy_pro | **$12382.67** | $2319.6 | $63.07 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11667.87** | $1501.29 | $166.58 | 875 | 53% | $1282.16 | 19 |
| mid_momentum | **$11553.14** | $1346.27 | $206.87 | 426 | 55% | $1126.45 | 25 |
| maker_flat | **$11164.6** | $1019.44 | $145.16 | 139 | 53% | $825.32 | 25 |
| mm_cheap | **$10885.8** | $726.15 | $159.65 | 288 | 53% | $506.33 | 25 |
| mm_max | **$10730.62** | $731.62 | $-1 | 343 | 55% | $522.52 | 1 |
| mid_momentum_v2 | **$10327.96** | $121.09 | $206.87 | 261 | 52% | $-98.73 | 25 |
| mm_cheap_v2 | **$10036.16** | $-123.49 | $159.65 | 305 | 51% | $-343.31 | 25 |
| fade_longshot | **$9882.76** | $-138.8 | $21.56 | 231 | 94% | $-149.54 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9307.17** | $-899.32 | $206.49 | 1037 | 53% | $-1118.45 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9000.49** | $-873.28 | $-126.23 | 224 | 51% | $-1092.41 | 23 |
| mm_strong | **$8926.4** | $-1323.5 | $249.9 | 375 | 51% | $-1542.63 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8475.32** | $-1635.38 | $110.7 | 287 | 56% | $-1729.01 | 25 |
| copy_top | **$8373.76** | $-1570.4 | $-55.84 | 566 | 53% | $-2898.97 | 2 |
| mm_sports_v2 | **$8077.86** | $-2128.63 | $206.49 | 606 | 51% | $-2347.76 | 22 |
| random_control | **$7316.18** | $-2638.21 | $-45.61 | 246 | 53% | $-3252.5 | 25 |
| momentum | **$7309.25** | $-2822.65 | $131.9 | 380 | 65% | $-3310.89 | 25 |
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
| maker_flat | 164 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 479 | 4 | 0 | 99% | 1.38¢ |

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
