# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24818 · Last run: 2026-08-02T22:11:36.557Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10940.55** | $903.74 | $36.81 | 243 | 58% | $700.71 | 19 |
| copy_pro | **$10869.28** | $-122.6 | $991.88 | 357 | 51% | $-972.6 | 24 |
| mid_momentum | **$10535.64** | $630.98 | $-95.34 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10302.07** | $328.09 | $-26.02 | 207 | 54% | $125.06 | 15 |
| copy_top | **$10278.45** | $81.11 | $197.34 | 373 | 52% | $-1247.46 | 21 |
| mm_cheap | **$10205.83** | $704.44 | $-498.61 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9958.28** | $-393.8 | $352.08 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9913.55** | $117.48 | $-203.93 | 102 | 96% | $106.74 | 25 |
| super | **$9792.51** | $-245.84 | $38.35 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9540.51** | $-432.27 | $-27.22 | 65 | 54% | $-549.66 | 6 |
| ai_judge | **$9406.25** | $-487.64 | $-106.11 | 6 | 17% | $-500 | 3 |
| random_control | **$9317.46** | $-310.74 | $-371.8 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8888.12** | $-882.32 | $-229.56 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8633.34** | $-933.53 | $-433.13 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8196.79** | $-1139.53 | $-663.68 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7044.5** | $-2308.61 | $-646.89 | 374 | 47% | $-2663.16 | 21 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.91** | $-1003.53 | $31.44 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8363.3** | $-1837.09 | $200.39 | 145 | 26% | $-3864.75 | 2 |
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
