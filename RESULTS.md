# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31587 · Last run: 2026-08-05T12:21:06.978Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11086.86** | $1248.6 | $-161.74 | 422 | 56% | $1029.47 | 21 |
| mm_tight | **$11057.97** | $1027.81 | $30.16 | 363 | 54% | $824.78 | 14 |
| mid_momentum | **$10746.09** | $967.28 | $-221.19 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10501.08** | $887.82 | $-386.74 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10034.49** | $0 | $34.49 | 0 | — | $0 | 15 |
| mm_sports_v2 | **$9935.88** | $0 | $-64.12 | 0 | — | $0 | 6 |
| fade_longshot | **$9920.66** | $109.23 | $-188.57 | 117 | 96% | $98.49 | 25 |
| mid_momentum_v2 | **$9919.56** | $0 | $-80.44 | 0 | — | $0 | 18 |
| super | **$9887.22** | $-425.73 | $312.95 | 73 | 48% | $-641.58 | 11 |
| copy_top | **$9816.61** | $-374.75 | $191.36 | 409 | 52% | $-1703.32 | 24 |
| copy_pro | **$9607.19** | $-732.88 | $340.07 | 389 | 51% | $-1582.88 | 25 |
| mm_max | **$9479.86** | $-517.02 | $-3.12 | 160 | 53% | $-684.14 | 2 |
| strong_dip | **$9447.46** | $-528.32 | $-24.22 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9374.92** | $-587.64 | $-37.44 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9182.42** | $-543.79 | $-273.79 | 118 | 52% | $-746.82 | 11 |
| mm_slow | **$9116.16** | $-516.83 | $-367.01 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8860.92** | $-955.81 | $-183.27 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8750.22** | $-876.62 | $-373.16 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8534.44** | $-1258.9 | $-206.66 | 73 | 40% | $-1453.02 | 16 |
| momentum | **$8222.24** | $-1076.77 | $-700.99 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7285.68** | $-2148.86 | $-565.46 | 410 | 48% | $-2503.41 | 24 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.47** | $-931.5 | $-66.03 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8499.58** | $-1937.09 | $436.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 89 | 61 | 0 | 59% | 2.97¢ |
| maker_sports | 129 | 86 | 2 | 60% | 1.6¢ |

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
