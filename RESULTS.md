# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27743 · Last run: 2026-08-04T00:42:20.676Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11784.42** | $1767.87 | $16.55 | 313 | 58% | $1564.84 | 25 |
| mm_tight | **$11241.8** | $824.81 | $416.99 | 271 | 54% | $621.78 | 21 |
| mid_momentum | **$10375.8** | $780.44 | $-404.64 | 193 | 58% | $566.96 | 25 |
| mm_cheap | **$10368.16** | $893.78 | $-525.62 | 25 | 72% | $716 | 25 |
| mm_max | **$10041.05** | $-137.67 | $178.72 | 104 | 53% | $-257.14 | 13 |
| fade_longshot | **$9970.61** | $39.78 | $-69.17 | 106 | 95% | $29.04 | 25 |
| maker_flat | **$9880.27** | $134.2 | $-253.93 | 15 | 53% | $-43.58 | 17 |
| strong_dip | **$9804.06** | $-361.15 | $165.21 | 98 | 60% | $-453.46 | 25 |
| super | **$9605.71** | $-353.9 | $-40.39 | 64 | 47% | $-569.75 | 11 |
| copy_top | **$9591.75** | $-716.01 | $307.76 | 391 | 51% | $-2044.58 | 23 |
| maker_sports | **$9543.95** | $-166.9 | $-289.15 | 29 | 48% | $-352.61 | 14 |
| ai_judge | **$9427.32** | $-587.64 | $14.96 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9339.87** | $-916.05 | $255.92 | 370 | 51% | $-1766.05 | 24 |
| random_control | **$9097.76** | $-249.45 | $-652.79 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8952.55** | $-762.3 | $-285.15 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8771.67** | $-1021.38 | $-206.95 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8348.94** | $-1208.17 | $-442.89 | 241 | 67% | $-1696.41 | 25 |
| whale_fade | **$7515.48** | $-1868.7 | $-615.82 | 392 | 48% | $-2223.25 | 23 |
| copy_month (retired) | **$9376.59** | $-730.36 | $106.95 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9040.27** | $-942.24 | $-17.49 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8296.24** | $-1937.09 | $233.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 32 | 21 | 5 | 60% | 3.08¢ |
| maker_sports | 43 | 23 | 5 | 65% | 1.65¢ |

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
