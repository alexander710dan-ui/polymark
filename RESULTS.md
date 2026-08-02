# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24410 · Last run: 2026-08-02T18:37:31.720Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10739.79** | $731.87 | $7.92 | 227 | 57% | $528.84 | 21 |
| mid_momentum | **$10389.73** | $630.98 | $-241.25 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10312.4** | $50.53 | $261.87 | 368 | 52% | $-1278.04 | 25 |
| mm_tight | **$10278.65** | $456.54 | $-177.89 | 196 | 55% | $253.51 | 15 |
| copy_pro | **$10274.91** | $-392.45 | $667.36 | 353 | 51% | $-1242.45 | 25 |
| mm_cheap | **$10103.28** | $704.44 | $-601.16 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9992.12** | $-393.8 | $385.92 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9951.44** | $117.48 | $-166.04 | 102 | 96% | $106.74 | 25 |
| super | **$9741.99** | $-245.84 | $-12.17 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9407.15** | $-487.64 | $-105.21 | 6 | 17% | $-500 | 3 |
| mm_max | **$9406.72** | $-613.77 | $20.49 | 59 | 51% | $-731.16 | 6 |
| random_control | **$9238.83** | $-310.74 | $-450.43 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8867.11** | $-882.32 | $-250.57 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8599.59** | $-933.53 | $-466.88 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8225.84** | $-1139.53 | $-634.63 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7158.92** | $-2198.76 | $-642.32 | 369 | 47% | $-2553.31 | 25 |
| copy_month (retired) | **$9384.77** | $-777.42 | $162.19 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9037.24** | $-1003.53 | $40.77 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8313.17** | $-1837.09 | $150.26 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5115.2** | $-4691.55 | $-193.25 | 81 | 2% | $-6591.55 | 3 |

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
