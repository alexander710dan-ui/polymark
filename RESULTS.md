# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24990 · Last run: 2026-08-02T23:37:56.637Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10844.88** | $1057.99 | $-213.11 | 251 | 58% | $854.96 | 14 |
| mid_momentum | **$10534.1** | $716.17 | $-182.07 | 182 | 58% | $502.69 | 25 |
| copy_pro | **$10449.75** | $0.13 | $449.62 | 358 | 51% | $-849.87 | 25 |
| mm_cheap | **$10253.45** | $789.63 | $-536.18 | 22 | 73% | $611.85 | 25 |
| mm_tight | **$10105.25** | $290.23 | $-184.98 | 214 | 54% | $87.2 | 12 |
| strong_dip | **$9961.98** | $-393.8 | $355.78 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9942.84** | $134.52 | $-191.68 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9942.03** | $47.78 | $-105.75 | 375 | 52% | $-1280.79 | 23 |
| super | **$9551.29** | $-245.84 | $-202.87 | 62 | 47% | $-461.69 | 12 |
| ai_judge | **$9406.68** | $-487.64 | $-105.68 | 6 | 17% | $-500 | 3 |
| mm_max | **$9403.75** | $-533.77 | $-62.48 | 69 | 54% | $-651.16 | 4 |
| random_control | **$9273.2** | $-310.74 | $-416.06 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8907.11** | $-882.32 | $-210.57 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8628.78** | $-933.53 | $-437.69 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8232.07** | $-1139.53 | $-628.4 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7178.71** | $-2326.79 | $-494.5 | 376 | 47% | $-2681.34 | 23 |
| copy_month (retired) | **$9383.46** | $-777.42 | $160.88 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.38** | $-1003.53 | $36.91 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8336.37** | $-1837.09 | $173.46 | 145 | 26% | $-3864.75 | 2 |
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
