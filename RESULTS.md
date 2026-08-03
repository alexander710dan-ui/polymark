# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25060 · Last run: 2026-08-03T00:12:59.908Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10812.45** | $1057.99 | $-245.54 | 251 | 58% | $854.96 | 17 |
| copy_pro | **$10557.4** | $0.13 | $557.27 | 358 | 51% | $-849.87 | 25 |
| mid_momentum | **$10530.87** | $716.17 | $-185.3 | 182 | 58% | $502.69 | 25 |
| mm_cheap | **$10254.27** | $789.63 | $-535.36 | 22 | 73% | $611.85 | 25 |
| mm_tight | **$10105.01** | $290.23 | $-185.22 | 214 | 54% | $87.2 | 13 |
| copy_top | **$9999.23** | $47.78 | $-48.55 | 375 | 52% | $-1280.79 | 23 |
| strong_dip | **$9956.1** | $-393.8 | $349.9 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9940.8** | $134.52 | $-193.72 | 104 | 96% | $123.78 | 25 |
| super | **$9550.17** | $-245.84 | $-203.99 | 62 | 47% | $-461.69 | 12 |
| ai_judge | **$9406.33** | $-487.64 | $-106.03 | 6 | 17% | $-500 | 3 |
| mm_max | **$9352.14** | $-533.77 | $-114.09 | 69 | 54% | $-651.16 | 4 |
| random_control | **$9253.74** | $-310.74 | $-435.52 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8914.13** | $-882.32 | $-203.55 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8626.36** | $-933.53 | $-440.11 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8236.85** | $-1139.53 | $-623.62 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7073.03** | $-2326.79 | $-600.18 | 376 | 47% | $-2681.34 | 23 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9032.51** | $-1003.53 | $36.04 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8339.96** | $-1837.09 | $177.05 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.12** | $-4691.55 | $-199.33 | 81 | 2% | $-6591.55 | 3 |

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
