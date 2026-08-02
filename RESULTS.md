# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24884 · Last run: 2026-08-02T22:45:01.951Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10953.53** | $0.13 | $953.4 | 358 | 51% | $-849.87 | 25 |
| mm_sports | **$10896.68** | $1065.88 | $-169.2 | 248 | 58% | $862.85 | 14 |
| mid_momentum | **$10532.02** | $716.17 | $-184.15 | 182 | 58% | $502.69 | 25 |
| mm_tight | **$10318.13** | $440.98 | $-122.85 | 211 | 55% | $237.95 | 11 |
| copy_top | **$10267.46** | $147.78 | $119.68 | 374 | 52% | $-1180.79 | 23 |
| mm_cheap | **$10235.09** | $789.63 | $-554.54 | 22 | 73% | $611.85 | 25 |
| strong_dip | **$9961.98** | $-393.8 | $355.78 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9927.04** | $125.82 | $-198.78 | 103 | 96% | $115.08 | 25 |
| super | **$9750.38** | $-245.84 | $-3.78 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9503.6** | $-483.02 | $-13.38 | 67 | 54% | $-600.41 | 4 |
| ai_judge | **$9419.58** | $-487.64 | $-92.78 | 6 | 17% | $-500 | 3 |
| random_control | **$9268.14** | $-310.74 | $-421.12 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8914.95** | $-882.32 | $-202.73 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8641.33** | $-933.53 | $-425.14 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8221.27** | $-1139.53 | $-639.2 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7041.97** | $-2408.61 | $-549.42 | 375 | 47% | $-2763.16 | 23 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9035.44** | $-1003.53 | $38.97 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8323.3** | $-1837.09 | $160.39 | 145 | 26% | $-3864.75 | 2 |
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
