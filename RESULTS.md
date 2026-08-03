# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25291 · Last run: 2026-08-03T02:08:42.442Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11088.68** | $946.38 | $142.3 | 259 | 57% | $743.35 | 12 |
| mid_momentum | **$10547.32** | $716.17 | $-168.85 | 183 | 57% | $502.69 | 25 |
| copy_pro | **$10358.53** | $265.25 | $93.28 | 359 | 52% | $-584.75 | 25 |
| mm_tight | **$10352.03** | $278.62 | $73.41 | 221 | 53% | $75.59 | 9 |
| mm_cheap | **$10285.95** | $789.63 | $-503.68 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9976.12** | $-378.86 | $354.98 | 95 | 60% | $-471.17 | 25 |
| fade_longshot | **$9941.73** | $134.52 | $-192.79 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9876.58** | $47.78 | $-171.2 | 375 | 52% | $-1280.79 | 25 |
| super | **$9564.81** | $-245.84 | $-189.35 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9454.37** | $-539.65 | $-5.98 | 72 | 51% | $-657.04 | 3 |
| ai_judge | **$9407.79** | $-487.64 | $-104.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9247.01** | $-310.74 | $-442.25 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8875.05** | $-882.32 | $-242.63 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8623.68** | $-933.53 | $-442.79 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8219.41** | $-1139.53 | $-641.06 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7160.78** | $-2326.79 | $-512.43 | 376 | 47% | $-2681.34 | 25 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9032.95** | $-1003.53 | $36.48 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.04** | $-1837.09 | $170.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5105.12** | $-4691.55 | $-203.33 | 81 | 2% | $-6591.55 | 3 |

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
