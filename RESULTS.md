# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31948 · Last run: 2026-08-05T15:51:27.740Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11096.42** | $1207.06 | $-110.64 | 374 | 55% | $1004.03 | 16 |
| mm_sports | **$10802.55** | $1259 | $-456.45 | 436 | 56% | $1039.87 | 24 |
| mid_momentum | **$10705.5** | $967.28 | $-261.78 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10518.17** | $887.82 | $-369.65 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9929.8** | $111.17 | $-181.37 | 118 | 96% | $100.43 | 25 |
| super | **$9899.18** | $-425.73 | $324.91 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9837.61** | $173.24 | $-335.63 | 5 | 80% | $75.74 | 25 |
| copy_top | **$9774.37** | $-477.25 | $251.62 | 410 | 51% | $-1805.82 | 25 |
| mm_max | **$9728.29** | $-330.56 | $58.85 | 163 | 53% | $-497.68 | 3 |
| mm_sports_v2 | **$9614.37** | $64.9 | $-450.53 | 6 | 67% | $-32.6 | 19 |
| mid_momentum_v2 | **$9612.69** | $64.9 | $-452.21 | 6 | 67% | $-32.6 | 25 |
| strong_dip | **$9474.62** | $-528.32 | $2.94 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9380.96** | $-937.88 | $318.84 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9092.26** | $-516.83 | $-390.91 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8829.38** | $-1058.61 | $-112.01 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8747.31** | $-664.88 | $-587.81 | 127 | 51% | $-867.91 | 13 |
| mm_strong | **$8737.6** | $-876.62 | $-385.78 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8311.89** | $-1380.33 | $-307.78 | 76 | 39% | $-1574.45 | 20 |
| momentum | **$8223.05** | $-1076.77 | $-700.18 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7293.18** | $-2055.23 | $-651.59 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 96 | 62 | 0 | 61% | 2.99¢ |
| maker_sports | 140 | 92 | 6 | 60% | 1.58¢ |

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
