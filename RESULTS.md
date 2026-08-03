# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27560 · Last run: 2026-08-03T23:00:00.520Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11618.81** | $1700.03 | $-81.22 | 305 | 57% | $1497 | 25 |
| mm_tight | **$10883.44** | $817.87 | $65.57 | 264 | 54% | $614.84 | 20 |
| mid_momentum | **$10441.24** | $665.95 | $-224.71 | 191 | 58% | $452.47 | 25 |
| mm_cheap | **$10355.59** | $893.78 | $-538.19 | 25 | 72% | $716 | 25 |
| strong_dip | **$10008.98** | $-258.85 | $267.83 | 97 | 61% | $-351.16 | 24 |
| fade_longshot | **$9957.08** | $39.78 | $-82.7 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9828.57** | $-205.15 | $33.72 | 99 | 53% | $-324.62 | 10 |
| maker_flat | **$9696.81** | $-103.97 | $-199.22 | 11 | 45% | $-231.24 | 11 |
| maker_sports | **$9678.43** | $-340.23 | $18.66 | 23 | 43% | $-525.94 | 12 |
| super | **$9676.58** | $-353.9 | $30.48 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9570.05** | $-882.82 | $452.87 | 368 | 51% | $-1732.82 | 25 |
| copy_top | **$9441.34** | $-645.89 | $87.23 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9412.87** | $-587.64 | $0.51 | 7 | 14% | $-600 | 2 |
| random_control | **$9206.27** | $-249.45 | $-544.28 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8935.37** | $-762.3 | $-302.33 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8794.38** | $-1021.38 | $-184.24 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8141.06** | $-1304.42 | $-554.52 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7707.43** | $-1810.06 | $-482.51 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9390.48** | $-730.36 | $120.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9032.57** | $-942.24 | $-25.19 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8339.58** | $-1937.09 | $276.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 22 | 19 | 3 | 54% | 3.11¢ |
| maker_sports | 35 | 18 | 6 | 66% | 1.8¢ |

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
