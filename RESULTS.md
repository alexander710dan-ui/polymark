# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25338 · Last run: 2026-08-03T02:32:38.925Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11087.51** | $1046.38 | $41.13 | 260 | 57% | $843.35 | 11 |
| mid_momentum | **$10537.86** | $716.17 | $-178.31 | 183 | 57% | $502.69 | 25 |
| mm_tight | **$10350.87** | $378.62 | $-27.75 | 222 | 53% | $175.59 | 8 |
| copy_pro | **$10348.68** | $265.25 | $83.43 | 359 | 52% | $-584.75 | 25 |
| mm_cheap | **$10273.88** | $789.63 | $-515.75 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9980.23** | $-378.86 | $359.09 | 95 | 60% | $-471.17 | 25 |
| fade_longshot | **$9940.38** | $134.52 | $-194.14 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9873.03** | $47.78 | $-174.75 | 375 | 52% | $-1280.79 | 25 |
| super | **$9573.35** | $-245.84 | $-180.81 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9465.02** | $-539.65 | $4.67 | 72 | 51% | $-657.04 | 3 |
| ai_judge | **$9405.56** | $-487.64 | $-106.8 | 6 | 17% | $-500 | 3 |
| random_control | **$9257** | $-310.74 | $-432.26 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8873.71** | $-882.32 | $-243.97 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8623.67** | $-933.53 | $-442.8 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8209.82** | $-1139.53 | $-650.65 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7151.96** | $-2326.79 | $-521.25 | 376 | 47% | $-2681.34 | 25 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9031.9** | $-1003.53 | $35.43 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8339.71** | $-1837.09 | $176.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.07** | $-4691.55 | $-204.38 | 81 | 2% | $-6591.55 | 3 |

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
