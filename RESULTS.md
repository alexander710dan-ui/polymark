# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24905 · Last run: 2026-08-02T22:55:34.953Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11116.23** | $0.13 | $1116.1 | 358 | 51% | $-849.87 | 25 |
| mm_sports | **$10898.91** | $1065.88 | $-166.97 | 248 | 58% | $862.85 | 16 |
| mid_momentum | **$10536.92** | $716.17 | $-179.25 | 182 | 58% | $502.69 | 25 |
| copy_top | **$10333.07** | $147.78 | $185.29 | 374 | 52% | $-1180.79 | 23 |
| mm_tight | **$10277.19** | $440.98 | $-163.79 | 211 | 55% | $237.95 | 14 |
| mm_cheap | **$10246.43** | $789.63 | $-543.2 | 22 | 73% | $611.85 | 25 |
| strong_dip | **$9963.71** | $-393.8 | $357.51 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9929.52** | $125.82 | $-196.3 | 103 | 96% | $115.08 | 25 |
| super | **$9725.98** | $-245.84 | $-28.18 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9468.99** | $-483.02 | $-47.99 | 67 | 54% | $-600.41 | 5 |
| ai_judge | **$9418.81** | $-487.64 | $-93.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9264.97** | $-310.74 | $-424.29 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8922.94** | $-882.32 | $-194.74 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8629.39** | $-933.53 | $-437.08 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8230.38** | $-1139.53 | $-630.09 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7048.42** | $-2408.61 | $-542.97 | 375 | 47% | $-2763.16 | 23 |
| copy_month (retired) | **$9389.01** | $-777.42 | $166.43 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9034.59** | $-1003.53 | $38.12 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8323.04** | $-1837.09 | $160.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5110.16** | $-4691.55 | $-198.29 | 81 | 2% | $-6591.55 | 3 |

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
