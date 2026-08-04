# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28163 · Last run: 2026-08-04T04:36:01.308Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11152.09** | $1079.12 | $72.97 | 341 | 56% | $876.09 | 9 |
| mm_tight | **$10858.6** | $571.22 | $287.38 | 296 | 53% | $368.19 | 6 |
| mm_cheap | **$10585.08** | $978.1 | $-393.02 | 29 | 72% | $800.32 | 25 |
| mid_momentum | **$10402.73** | $786.23 | $-383.5 | 200 | 58% | $572.75 | 25 |
| fade_longshot | **$9979.51** | $47.31 | $-67.8 | 107 | 95% | $36.57 | 25 |
| maker_flat | **$9963.23** | $-12.95 | $-23.82 | 29 | 48% | $-190.73 | 9 |
| copy_top | **$9949.19** | $-27.47 | $-23.34 | 396 | 52% | $-1356.04 | 22 |
| strong_dip | **$9772.57** | $-463.45 | $236.02 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9618.32** | $-469.16 | $87.48 | 375 | 51% | $-1319.16 | 23 |
| super | **$9605.9** | $-353.9 | $-40.2 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9517.4** | $-482.6 | $0 | 124 | 52% | $-602.07 | 0 |
| maker_sports | **$9455.91** | $-520.68 | $-23.41 | 53 | 49% | $-706.39 | 3 |
| ai_judge | **$9414.07** | $-587.64 | $1.71 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9169.74** | $-544.72 | $-285.54 | 52 | 52% | $-730.43 | 25 |
| random_control | **$8935.26** | $-457.3 | $-607.44 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8598.17** | $-920.12 | $-481.71 | 75 | 48% | $-1124.07 | 22 |
| momentum | **$8319.27** | $-1052.42 | $-628.31 | 250 | 68% | $-1540.66 | 25 |
| whale_fade | **$7264.05** | $-2376.95 | $-359 | 397 | 47% | $-2731.5 | 22 |
| copy_month (retired) | **$9382.14** | $-730.36 | $112.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.93** | $-942.24 | $-19.83 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8312.91** | $-1937.09 | $250 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 1 | 60% | 2.96¢ |
| maker_sports | 56 | 29 | 2 | 66% | 1.61¢ |

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
