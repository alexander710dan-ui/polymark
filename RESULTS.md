# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31908 · Last run: 2026-08-05T15:29:04.824Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10990.58** | $1207.06 | $-216.48 | 374 | 55% | $1004.03 | 13 |
| mm_sports | **$10807.14** | $1259 | $-451.86 | 436 | 56% | $1039.87 | 21 |
| mid_momentum | **$10757.54** | $967.28 | $-209.74 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10528.14** | $887.82 | $-359.68 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9917.94** | $111.17 | $-193.23 | 118 | 96% | $100.43 | 25 |
| super | **$9903.21** | $-425.73 | $328.94 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9867.18** | $173.24 | $-306.06 | 5 | 80% | $75.74 | 25 |
| copy_top | **$9780.86** | $-477.25 | $258.11 | 410 | 51% | $-1805.82 | 25 |
| mm_max | **$9674.13** | $-330.56 | $4.69 | 163 | 53% | $-497.68 | 2 |
| mm_sports_v2 | **$9653.98** | $64.9 | $-410.92 | 6 | 67% | $-32.6 | 16 |
| mid_momentum_v2 | **$9639.66** | $64.9 | $-425.24 | 6 | 67% | $-32.6 | 25 |
| strong_dip | **$9438.22** | $-528.32 | $-33.46 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9360.98** | $-937.88 | $298.86 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9118.92** | $-516.83 | $-364.25 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8851.85** | $-1058.61 | $-89.54 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8842.54** | $-664.88 | $-492.58 | 127 | 51% | $-867.91 | 10 |
| mm_strong | **$8767.1** | $-876.62 | $-356.28 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8513.16** | $-1380.33 | $-106.51 | 76 | 39% | $-1574.45 | 18 |
| momentum | **$8233.44** | $-1076.77 | $-689.79 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7302.21** | $-2055.23 | $-642.56 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.26** | $-931.5 | $-72.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 94 | 62 | 1 | 60% | 3.01¢ |
| maker_sports | 137 | 91 | 6 | 60% | 1.59¢ |

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
