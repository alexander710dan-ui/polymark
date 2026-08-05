# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31861 · Last run: 2026-08-05T15:02:38.957Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10966.25** | $1226.52 | $-260.27 | 372 | 55% | $1023.49 | 14 |
| mm_sports | **$10785.89** | $1278.46 | $-492.57 | 434 | 56% | $1059.33 | 21 |
| mid_momentum | **$10765.59** | $967.28 | $-201.69 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10512.23** | $887.82 | $-375.59 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9933.38** | $109.23 | $-175.85 | 117 | 96% | $98.49 | 25 |
| mm_cheap_v2 | **$9899.04** | $192.7 | $-293.66 | 3 | 100% | $95.2 | 25 |
| super | **$9872.51** | $-425.73 | $298.24 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9775.42** | $-477.25 | $252.67 | 410 | 51% | $-1805.82 | 25 |
| mid_momentum_v2 | **$9662.88** | $84.36 | $-421.48 | 4 | 75% | $-13.14 | 25 |
| mm_max | **$9658.5** | $-330.56 | $-10.94 | 163 | 53% | $-497.68 | 2 |
| mm_sports_v2 | **$9650.32** | $84.36 | $-434.04 | 4 | 75% | $-13.14 | 15 |
| strong_dip | **$9435.81** | $-528.32 | $-35.87 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.75** | $-587.64 | $-27.61 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9327.75** | $-937.88 | $265.63 | 390 | 51% | $-1787.88 | 25 |
| mm_slow | **$9145.62** | $-516.83 | $-337.55 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8875.97** | $-1058.61 | $-65.42 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8834.61** | $-640.32 | $-525.07 | 125 | 51% | $-843.35 | 12 |
| mm_strong | **$8784** | $-876.62 | $-339.38 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8526.51** | $-1380.33 | $-93.16 | 76 | 39% | $-1574.45 | 16 |
| momentum | **$8246.8** | $-1076.77 | $-676.43 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7309.2** | $-2055.23 | $-635.57 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.03** | $-931.5 | $-70.47 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8516.25** | $-1937.09 | $453.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 2 | 60% | 3.03¢ |
| maker_sports | 137 | 90 | 4 | 60% | 1.59¢ |

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
