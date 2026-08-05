# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31537 · Last run: 2026-08-05T11:53:10.719Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10971.63** | $1203.14 | $-231.51 | 421 | 56% | $984.01 | 22 |
| mm_tight | **$10959.87** | $1027.81 | $-67.94 | 363 | 54% | $824.78 | 14 |
| mid_momentum | **$10741.02** | $967.28 | $-226.26 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10513.02** | $887.82 | $-374.8 | 35 | 66% | $710.04 | 25 |
| copy_top | **$9943.61** | $-271.55 | $215.16 | 408 | 52% | $-1600.12 | 25 |
| fade_longshot | **$9922.17** | $102.17 | $-180 | 116 | 96% | $91.43 | 25 |
| mm_cheap_v2 | **$9917.17** | $0 | $-82.83 | 0 | — | $0 | 15 |
| super | **$9891.44** | $-425.73 | $317.17 | 73 | 48% | $-641.58 | 11 |
| copy_pro | **$9874.61** | $-578.08 | $452.69 | 388 | 51% | $-1428.08 | 25 |
| mm_sports_v2 | **$9824.13** | $0 | $-175.87 | 0 | — | $0 | 6 |
| mid_momentum_v2 | **$9802.92** | $0 | $-197.08 | 0 | — | $0 | 18 |
| mm_max | **$9478.29** | $-517.02 | $-4.69 | 160 | 53% | $-684.14 | 2 |
| strong_dip | **$9455.97** | $-528.32 | $-15.71 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.21** | $-587.64 | $-29.15 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9103.25** | $-516.83 | $-379.92 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$9087.51** | $-543.79 | $-368.7 | 118 | 52% | $-746.82 | 11 |
| random_control | **$8847.04** | $-955.81 | $-197.15 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8734.54** | $-876.62 | $-388.84 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8510.94** | $-1317.63 | $-171.43 | 72 | 39% | $-1511.75 | 17 |
| momentum | **$8216.55** | $-1076.77 | $-706.68 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7176.66** | $-2200.96 | $-622.38 | 409 | 48% | $-2555.51 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.25** | $-931.5 | $-64.25 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 89 | 61 | 0 | 59% | 2.97¢ |
| maker_sports | 129 | 84 | 4 | 61% | 1.6¢ |

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
