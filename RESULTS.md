# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31849 · Last run: 2026-08-05T14:55:20.350Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10965.73** | $1226.52 | $-260.79 | 372 | 55% | $1023.49 | 14 |
| mm_sports | **$10786.1** | $1278.46 | $-492.36 | 434 | 56% | $1059.33 | 20 |
| mid_momentum | **$10764.99** | $967.28 | $-202.29 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10513.38** | $887.82 | $-374.44 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9933.85** | $109.23 | $-175.38 | 117 | 96% | $98.49 | 25 |
| mm_cheap_v2 | **$9897.34** | $192.7 | $-295.36 | 3 | 100% | $95.2 | 25 |
| super | **$9872.73** | $-425.73 | $298.46 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9776.73** | $-477.25 | $253.98 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9661.16** | $84.36 | $-423.2 | 4 | 75% | $-13.14 | 25 |
| mm_max | **$9658.5** | $-330.56 | $-10.94 | 163 | 53% | $-497.68 | 2 |
| mm_sports_v2 | **$9651.8** | $84.36 | $-432.56 | 4 | 75% | $-13.14 | 13 |
| strong_dip | **$9434.83** | $-528.32 | $-36.85 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9385.86** | $-587.64 | $-26.5 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9325.34** | $-937.88 | $263.22 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9145.18** | $-516.83 | $-337.99 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8868.34** | $-1058.61 | $-73.05 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8835.4** | $-640.32 | $-524.28 | 125 | 51% | $-843.35 | 11 |
| mm_strong | **$8784.5** | $-876.62 | $-338.88 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8530.07** | $-1380.33 | $-89.6 | 76 | 39% | $-1574.45 | 16 |
| momentum | **$8245.35** | $-1076.77 | $-677.88 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7305.2** | $-2055.23 | $-639.57 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.74** | $-931.5 | $-69.76 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8512.91** | $-1937.09 | $450 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 2 | 60% | 3.03¢ |
| maker_sports | 136 | 90 | 3 | 60% | 1.59¢ |

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
