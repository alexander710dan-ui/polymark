# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24497 · Last run: 2026-08-02T19:25:27.433Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10756.09** | $790.6 | $-34.51 | 228 | 57% | $587.57 | 24 |
| mid_momentum | **$10446.06** | $630.98 | $-184.92 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10430.48** | $50.53 | $379.95 | 368 | 52% | $-1278.04 | 25 |
| copy_pro | **$10359.9** | $-392.45 | $752.35 | 353 | 51% | $-1242.45 | 25 |
| mm_tight | **$10222.44** | $456.54 | $-234.1 | 196 | 55% | $253.51 | 19 |
| mm_cheap | **$10169.1** | $704.44 | $-535.34 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9969.63** | $-393.8 | $363.43 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9940.43** | $117.48 | $-177.05 | 102 | 96% | $106.74 | 25 |
| super | **$9750.19** | $-245.84 | $-3.97 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9393.9** | $-487.64 | $-118.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9357.61** | $-613.77 | $-28.62 | 59 | 51% | $-731.16 | 9 |
| random_control | **$9276.16** | $-310.74 | $-413.1 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8902.61** | $-882.32 | $-215.07 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8639.34** | $-933.53 | $-427.13 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8218.42** | $-1139.53 | $-642.05 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7001.24** | $-2198.76 | $-800 | 369 | 47% | $-2553.31 | 25 |
| copy_month (retired) | **$9387.55** | $-777.42 | $164.97 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9035.44** | $-1003.53 | $38.97 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8329.83** | $-1837.09 | $166.92 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5111.2** | $-4691.55 | $-197.25 | 81 | 2% | $-6591.55 | 3 |

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
