# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21321 · Last run: 2026-08-01T16:43:59.473Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10631.84** | $872.38 | $-240.54 | 318 | 53% | $22.38 | 25 |
| copy_top | **$10510.88** | $638.97 | $-128.09 | 341 | 53% | $-689.6 | 15 |
| strong_dip | **$10146.81** | $-136.87 | $283.68 | 87 | 62% | $-229.18 | 24 |
| mid_momentum | **$10057.21** | $60.13 | $-2.92 | 172 | 56% | $-153.35 | 25 |
| fade_longshot | **$10032.27** | $115.44 | $-83.17 | 101 | 96% | $104.7 | 25 |
| mm_cheap | **$10000.81** | $0 | $0.81 | 0 | — | $0 | 15 |
| mm_tight | **$9803.9** | $-458.5 | $262.4 | 133 | 53% | $-661.53 | 12 |
| mm_sports | **$9502.34** | $-857.01 | $359.35 | 153 | 54% | $-1060.04 | 14 |
| ai_judge | **$9468.68** | $-487.64 | $-43.68 | 6 | 17% | $-500 | 3 |
| random_control | **$9421.51** | $-271.43 | $-307.06 | 107 | 59% | $-885.72 | 25 |
| mm_max | **$9198.26** | $-839.48 | $37.74 | 46 | 46% | $-956.87 | 1 |
| super | **$9185.55** | $-649.65 | $-164.8 | 58 | 43% | $-865.5 | 11 |
| mm_slow | **$8916.67** | $-1029.17 | $-54.16 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8660.75** | $-885.1 | $-454.15 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8517.69** | $-1391.83 | $-90.48 | 220 | 67% | $-1880.07 | 25 |
| whale_fade | **$6801.25** | $-3256.02 | $57.27 | 342 | 46% | $-3590.8 | 15 |
| copy_month (retired) | **$9318.11** | $-777.42 | $95.53 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9093.48** | $-1003.53 | $97.01 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8013.17** | $-1837.09 | $-149.74 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5079.24** | $-4691.55 | $-229.21 | 81 | 2% | $-6591.55 | 3 |

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
