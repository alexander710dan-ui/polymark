# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25043 · Last run: 2026-08-03T00:04:35.555Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10764.26** | $1057.99 | $-293.73 | 251 | 58% | $854.96 | 17 |
| mid_momentum | **$10540.96** | $716.17 | $-175.21 | 182 | 58% | $502.69 | 25 |
| copy_pro | **$10514.46** | $0.13 | $514.33 | 358 | 51% | $-849.87 | 25 |
| mm_cheap | **$10246.22** | $789.63 | $-543.41 | 22 | 73% | $611.85 | 25 |
| mm_tight | **$10057.68** | $290.23 | $-232.55 | 214 | 54% | $87.2 | 13 |
| copy_top | **$9974.81** | $47.78 | $-72.97 | 375 | 52% | $-1280.79 | 23 |
| strong_dip | **$9961.93** | $-393.8 | $355.73 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9940.42** | $134.52 | $-194.1 | 104 | 96% | $123.78 | 25 |
| super | **$9552.25** | $-245.84 | $-201.91 | 62 | 47% | $-461.69 | 12 |
| ai_judge | **$9406.33** | $-487.64 | $-106.03 | 6 | 17% | $-500 | 3 |
| mm_max | **$9375.94** | $-533.77 | $-90.29 | 69 | 54% | $-651.16 | 4 |
| random_control | **$9259.85** | $-310.74 | $-429.41 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8898.23** | $-882.32 | $-219.45 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8628.02** | $-933.53 | $-438.45 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8229.71** | $-1139.53 | $-630.76 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7110.95** | $-2326.79 | $-562.26 | 376 | 47% | $-2681.34 | 23 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9032.51** | $-1003.53 | $36.04 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8339.96** | $-1837.09 | $177.05 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
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
