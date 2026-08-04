# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27810 · Last run: 2026-08-04T01:19:36.277Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11386.8** | $1899.43 | $-512.63 | 318 | 58% | $1696.4 | 22 |
| mm_tight | **$10857.09** | $1051.52 | $-194.43 | 277 | 54% | $848.49 | 18 |
| mm_cheap | **$10283.01** | $893.78 | $-610.77 | 25 | 72% | $716 | 25 |
| mid_momentum | **$10271.16** | $780.44 | $-509.28 | 193 | 58% | $566.96 | 25 |
| fade_longshot | **$9973.55** | $39.78 | $-66.23 | 106 | 95% | $29.04 | 25 |
| maker_flat | **$9858.64** | $92.93 | $-234.29 | 17 | 53% | $-84.85 | 16 |
| strong_dip | **$9793.08** | $-463.45 | $256.53 | 99 | 60% | $-555.76 | 25 |
| copy_top | **$9727.91** | $-716.01 | $443.92 | 391 | 51% | $-2044.58 | 23 |
| mm_max | **$9697.79** | $54.01 | $-356.22 | 108 | 54% | $-65.46 | 11 |
| super | **$9564.42** | $-353.9 | $-81.68 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9478.49** | $-916.05 | $394.54 | 370 | 51% | $-1766.05 | 24 |
| maker_sports | **$9452.48** | $-381.71 | $-165.81 | 33 | 45% | $-567.42 | 15 |
| ai_judge | **$9442.87** | $-587.64 | $30.51 | 7 | 14% | $-600 | 2 |
| random_control | **$9033.78** | $-354.2 | $-612.02 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8915.05** | $-762.3 | $-322.65 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8687.52** | $-1021.38 | $-291.1 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8196.99** | $-1176.09 | $-626.92 | 242 | 67% | $-1664.33 | 25 |
| whale_fade | **$7401.15** | $-1868.7 | $-730.15 | 392 | 48% | $-2223.25 | 23 |
| copy_month (retired) | **$9377.97** | $-730.36 | $108.33 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9048.57** | $-942.24 | $-9.19 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8249.58** | $-1937.09 | $186.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5099.99** | $-4691.55 | $-208.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 33 | 23 | 3 | 59% | 3.05¢ |
| maker_sports | 48 | 23 | 4 | 68% | 1.58¢ |

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
