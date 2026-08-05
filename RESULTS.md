# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31835 · Last run: 2026-08-05T14:38:59.595Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10971.5** | $1129.02 | $-157.52 | 371 | 54% | $925.99 | 14 |
| mm_sports | **$10791.87** | $1180.96 | $-389.09 | 433 | 56% | $961.83 | 20 |
| mid_momentum | **$10757.31** | $967.28 | $-209.97 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10509.84** | $887.82 | $-377.98 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9928.56** | $109.23 | $-180.67 | 117 | 96% | $98.49 | 25 |
| mm_cheap_v2 | **$9902.35** | $95.2 | $-192.85 | 2 | 100% | $47.6 | 25 |
| super | **$9869.25** | $-425.73 | $294.98 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9768.85** | $-477.25 | $246.1 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9679.57** | $-13.14 | $-307.29 | 3 | 67% | $-60.74 | 25 |
| mm_max | **$9660.9** | $-428.06 | $88.96 | 162 | 53% | $-595.18 | 3 |
| mm_sports_v2 | **$9657.22** | $-13.14 | $-329.64 | 3 | 67% | $-60.74 | 13 |
| strong_dip | **$9431.07** | $-528.32 | $-40.61 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9388.6** | $-587.64 | $-23.76 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9323.88** | $-937.88 | $261.76 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9135.76** | $-516.83 | $-347.41 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8877.22** | $-1058.61 | $-64.17 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8837.34** | $-744.4 | $-418.26 | 124 | 51% | $-947.43 | 12 |
| mm_strong | **$8782.87** | $-876.62 | $-340.51 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8530.97** | $-1380.33 | $-88.7 | 76 | 39% | $-1574.45 | 16 |
| momentum | **$8248.61** | $-1076.77 | $-674.62 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7302.5** | $-2055.23 | $-642.27 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.04** | $-931.5 | $-71.46 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8516.25** | $-1937.09 | $453.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 1 | 60% | 3.03¢ |
| maker_sports | 136 | 89 | 3 | 60% | 1.59¢ |

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
