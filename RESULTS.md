# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25380 · Last run: 2026-08-03T02:56:28.028Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11101.58** | $1110.31 | $-8.73 | 261 | 57% | $907.28 | 10 |
| mid_momentum | **$10544.99** | $665.42 | $-120.43 | 185 | 57% | $451.94 | 25 |
| mm_tight | **$10364.94** | $442.55 | $-77.61 | 223 | 53% | $239.52 | 7 |
| copy_pro | **$10359.88** | $65.25 | $294.63 | 360 | 51% | $-784.75 | 25 |
| mm_cheap | **$10288.39** | $789.63 | $-501.24 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9979.47** | $-337.42 | $316.89 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9935.91** | $34.52 | $-98.61 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9885.59** | $-52.22 | $-62.19 | 376 | 52% | $-1380.79 | 24 |
| super | **$9586.03** | $-245.84 | $-168.13 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9465.43** | $-475.72 | $-58.85 | 73 | 52% | $-593.11 | 2 |
| ai_judge | **$9405.56** | $-487.64 | $-106.8 | 6 | 17% | $-500 | 3 |
| random_control | **$9254.22** | $-310.74 | $-435.04 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8868.19** | $-882.32 | $-249.49 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8630.21** | $-1133.53 | $-236.26 | 64 | 45% | $-1337.48 | 25 |
| momentum | **$8204.72** | $-1339.53 | $-455.75 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7138.34** | $-2163.63 | $-698.03 | 377 | 47% | $-2518.18 | 24 |
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
