# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25166 · Last run: 2026-08-03T01:06:20.392Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10974.54** | $1050.3 | $-75.76 | 253 | 58% | $847.27 | 16 |
| mid_momentum | **$10515.63** | $716.17 | $-200.54 | 182 | 58% | $502.69 | 25 |
| copy_pro | **$10419.96** | $265.25 | $154.71 | 359 | 52% | $-584.75 | 25 |
| mm_tight | **$10270.98** | $282.54 | $-11.56 | 216 | 54% | $79.51 | 12 |
| mm_cheap | **$10262.44** | $789.63 | $-527.19 | 22 | 73% | $611.85 | 25 |
| strong_dip | **$9973.2** | $-378.86 | $352.06 | 95 | 60% | $-471.17 | 25 |
| fade_longshot | **$9945.12** | $134.52 | $-189.4 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9888.75** | $47.78 | $-159.03 | 375 | 52% | $-1280.79 | 25 |
| super | **$9560.26** | $-245.84 | $-193.9 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9427.61** | $-533.77 | $-38.62 | 69 | 54% | $-651.16 | 4 |
| ai_judge | **$9407.79** | $-487.64 | $-104.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9243.57** | $-310.74 | $-445.69 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8875.77** | $-882.32 | $-241.91 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8625.13** | $-933.53 | $-441.34 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8225.41** | $-1139.53 | $-635.06 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7184.53** | $-2326.79 | $-488.68 | 376 | 47% | $-2681.34 | 25 |
| copy_month (retired) | **$9384.85** | $-777.42 | $162.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9032.83** | $-1003.53 | $36.36 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.04** | $-1837.09 | $170.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5102.95** | $-4691.55 | $-205.5 | 81 | 2% | $-6591.55 | 3 |

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
