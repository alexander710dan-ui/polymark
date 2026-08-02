# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22485 · Last run: 2026-08-02T02:27:11.780Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10445.51** | $658.57 | $-213.06 | 179 | 58% | $445.09 | 25 |
| copy_top | **$10243.93** | $196.91 | $47.02 | 356 | 53% | $-1131.66 | 16 |
| mm_sports | **$10211.72** | $508.1 | $-296.38 | 183 | 58% | $305.07 | 23 |
| copy_pro | **$10094.18** | $-39.08 | $133.26 | 338 | 51% | $-889.08 | 22 |
| fade_longshot | **$9960.91** | $117.48 | $-156.57 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9954.05** | $-471.26 | $425.31 | 92 | 59% | $-563.57 | 25 |
| mm_cheap | **$9940.47** | $288.71 | $-348.24 | 11 | 73% | $150.61 | 25 |
| mm_tight | **$9925.21** | $504.4 | $-579.19 | 158 | 56% | $301.37 | 20 |
| super | **$9657.38** | $-472.29 | $129.67 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9422.06** | $-487.64 | $-90.3 | 6 | 17% | $-500 | 3 |
| mm_max | **$9133.91** | $-787.16 | $-78.93 | 51 | 47% | $-904.55 | 5 |
| random_control | **$9070.83** | $-423.46 | $-505.71 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8976.53** | $-851.81 | $-171.66 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8518.5** | $-782.78 | $-698.72 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8246.1** | $-1173.23 | $-580.67 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7094.7** | $-2847.24 | $-58.06 | 357 | 47% | $-3182.02 | 16 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9047.09** | $-1003.53 | $50.62 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8246.63** | $-1837.09 | $83.72 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5082.37** | $-4691.55 | $-226.08 | 81 | 2% | $-6591.55 | 3 |

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
