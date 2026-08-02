# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24763 · Last run: 2026-08-02T21:43:51.208Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10959.76** | $587.72 | $372.04 | 240 | 57% | $384.69 | 21 |
| copy_pro | **$10712.21** | $-261.58 | $973.79 | 356 | 51% | $-1111.58 | 25 |
| mid_momentum | **$10510.86** | $630.98 | $-120.12 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10338.64** | $76 | $262.64 | 205 | 54% | $-127.03 | 16 |
| copy_top | **$10251.27** | $181.11 | $70.16 | 372 | 52% | $-1147.46 | 22 |
| mm_cheap | **$10241.35** | $704.44 | $-463.09 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9970.58** | $-393.8 | $364.38 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9960.83** | $117.48 | $-156.65 | 102 | 96% | $106.74 | 25 |
| super | **$9691.64** | $-245.84 | $-62.52 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9605.06** | $-432.27 | $37.33 | 65 | 54% | $-549.66 | 6 |
| ai_judge | **$9416.2** | $-487.64 | $-96.16 | 6 | 17% | $-500 | 3 |
| random_control | **$9228.12** | $-310.74 | $-461.14 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8916.02** | $-882.32 | $-201.66 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8601.28** | $-933.53 | $-465.19 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8267.49** | $-1139.53 | $-592.98 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7064.21** | $-2390.43 | $-545.36 | 373 | 47% | $-2744.98 | 22 |
| copy_month (retired) | **$9380.46** | $-777.42 | $157.88 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9040.05** | $-1003.53 | $43.58 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8300.09** | $-1837.09 | $137.18 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5108.07** | $-4691.55 | $-200.38 | 81 | 2% | $-6591.55 | 3 |

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
