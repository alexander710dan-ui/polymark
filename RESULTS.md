# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31932 · Last run: 2026-08-05T15:42:33.576Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11074.14** | $1207.06 | $-132.92 | 374 | 55% | $1004.03 | 16 |
| mm_sports | **$10865.88** | $1259 | $-393.12 | 436 | 56% | $1039.87 | 24 |
| mid_momentum | **$10756.85** | $967.28 | $-210.43 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10529.25** | $887.82 | $-358.57 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9915.87** | $111.17 | $-195.3 | 118 | 96% | $100.43 | 25 |
| mm_cheap_v2 | **$9905.27** | $173.24 | $-267.97 | 5 | 80% | $75.74 | 25 |
| super | **$9901.29** | $-425.73 | $327.02 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9791.34** | $-477.25 | $268.59 | 410 | 51% | $-1805.82 | 25 |
| mm_max | **$9722.39** | $-330.56 | $52.95 | 163 | 53% | $-497.68 | 3 |
| mm_sports_v2 | **$9684.29** | $64.9 | $-380.61 | 6 | 67% | $-32.6 | 19 |
| mid_momentum_v2 | **$9680.88** | $64.9 | $-384.02 | 6 | 67% | $-32.6 | 25 |
| strong_dip | **$9438.9** | $-528.32 | $-32.78 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9391.33** | $-587.64 | $-21.03 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9389.36** | $-937.88 | $327.24 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9120.79** | $-516.83 | $-362.38 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8852.69** | $-664.88 | $-482.43 | 127 | 51% | $-867.91 | 12 |
| random_control | **$8799.44** | $-1058.61 | $-141.95 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8773.13** | $-876.62 | $-350.25 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8497.56** | $-1380.33 | $-122.11 | 76 | 39% | $-1574.45 | 19 |
| momentum | **$8234.59** | $-1076.77 | $-688.64 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7303.79** | $-2055.23 | $-640.98 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.3** | $-931.5 | $-72.2 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 95 | 62 | 1 | 61% | 3¢ |
| maker_sports | 139 | 91 | 7 | 60% | 1.59¢ |

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
