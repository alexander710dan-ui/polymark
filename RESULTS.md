# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21350 · Last run: 2026-08-01T16:58:30.559Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10604.05** | $772.38 | $-168.33 | 319 | 52% | $-77.62 | 25 |
| copy_top | **$10499.4** | $538.97 | $-39.57 | 342 | 53% | $-789.6 | 14 |
| mid_momentum | **$10131.73** | $223.29 | $-91.56 | 173 | 56% | $9.81 | 25 |
| strong_dip | **$10089.81** | $-136.87 | $226.68 | 87 | 62% | $-229.18 | 24 |
| mm_cheap | **$10088.66** | $0 | $88.66 | 0 | — | $0 | 19 |
| fade_longshot | **$10031.3** | $115.44 | $-84.14 | 101 | 96% | $104.7 | 25 |
| mm_tight | **$9882.94** | $-288.23 | $171.17 | 134 | 53% | $-491.26 | 12 |
| mm_sports | **$9581.86** | $-630.49 | $212.35 | 155 | 54% | $-833.52 | 15 |
| ai_judge | **$9472.53** | $-487.64 | $-39.83 | 6 | 17% | $-500 | 3 |
| random_control | **$9437.79** | $-239.85 | $-322.36 | 108 | 59% | $-854.14 | 25 |
| mm_max | **$9199.2** | $-839.48 | $38.68 | 46 | 46% | $-956.87 | 1 |
| super | **$9175.94** | $-649.65 | $-174.41 | 58 | 43% | $-865.5 | 11 |
| mm_slow | **$8921.53** | $-1029.17 | $-49.3 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8669.09** | $-885.1 | $-445.81 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8534.76** | $-1228.67 | $-236.57 | 221 | 67% | $-1716.91 | 25 |
| whale_fade | **$6809.42** | $-3085.75 | $-104.83 | 343 | 46% | $-3420.53 | 14 |
| copy_month (retired) | **$9309.04** | $-777.42 | $86.46 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9092.68** | $-1003.53 | $96.21 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8014.45** | $-1837.09 | $-148.46 | 145 | 26% | $-3864.75 | 2 |
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
