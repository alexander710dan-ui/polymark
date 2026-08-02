# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24415 · Last run: 2026-08-02T18:40:22.089Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10732.11** | $731.87 | $0.24 | 227 | 57% | $528.84 | 21 |
| mid_momentum | **$10373.99** | $630.98 | $-256.99 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10319.87** | $50.53 | $269.34 | 368 | 52% | $-1278.04 | 25 |
| copy_pro | **$10274.19** | $-392.45 | $666.64 | 353 | 51% | $-1242.45 | 25 |
| mm_tight | **$10229.69** | $456.54 | $-226.85 | 196 | 55% | $253.51 | 16 |
| mm_cheap | **$10091.83** | $704.44 | $-612.61 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9992.91** | $-393.8 | $386.71 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9951.93** | $117.48 | $-165.55 | 102 | 96% | $106.74 | 25 |
| super | **$9742.61** | $-245.84 | $-11.55 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9408.26** | $-487.64 | $-104.1 | 6 | 17% | $-500 | 3 |
| mm_max | **$9368.25** | $-613.77 | $-17.98 | 59 | 51% | $-731.16 | 7 |
| random_control | **$9245.85** | $-310.74 | $-443.41 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8864.95** | $-882.32 | $-252.73 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8602.32** | $-933.53 | $-464.15 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8222.86** | $-1139.53 | $-637.61 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7155.55** | $-2198.76 | $-645.69 | 369 | 47% | $-2553.31 | 25 |
| copy_month (retired) | **$9384.77** | $-777.42 | $162.19 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9037.83** | $-1003.53 | $41.36 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8309.83** | $-1837.09 | $146.92 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5116.24** | $-4691.55 | $-192.21 | 81 | 2% | $-6591.55 | 3 |

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
