# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24183 · Last run: 2026-08-02T16:40:03.301Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10691.15** | $836.85 | $-145.7 | 219 | 58% | $633.82 | 19 |
| mid_momentum | **$10439.35** | $630.98 | $-191.63 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10422.79** | $611.61 | $-188.82 | 190 | 55% | $408.58 | 15 |
| copy_top | **$10179.9** | $150.53 | $29.37 | 367 | 52% | $-1178.04 | 23 |
| mm_cheap | **$10118.82** | $704.44 | $-585.62 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10004.72** | $-192.45 | $197.17 | 352 | 51% | $-1042.45 | 25 |
| strong_dip | **$9984.58** | $-393.8 | $378.38 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9958.99** | $117.48 | $-158.49 | 102 | 96% | $106.74 | 25 |
| super | **$9697.2** | $-245.84 | $-56.96 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9406.76** | $-487.64 | $-105.6 | 6 | 17% | $-500 | 3 |
| mm_max | **$9356.34** | $-613.77 | $-29.89 | 59 | 51% | $-731.16 | 3 |
| random_control | **$9272.79** | $-665.29 | $-61.92 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8902.06** | $-882.32 | $-215.62 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8643.36** | $-933.53 | $-423.11 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8256.57** | $-1139.53 | $-603.9 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7355.5** | $-2553.31 | $-91.19 | 368 | 47% | $-2888.09 | 23 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9037.32** | $-1003.53 | $40.85 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8313.04** | $-1837.09 | $150.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5111.28** | $-4691.55 | $-197.17 | 81 | 2% | $-6591.55 | 3 |

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
