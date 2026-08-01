# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21314 · Last run: 2026-08-01T16:40:18.167Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10645.22** | $872.38 | $-227.16 | 318 | 53% | $22.38 | 25 |
| copy_top | **$10513.65** | $638.97 | $-125.32 | 341 | 53% | $-689.6 | 15 |
| strong_dip | **$10155.78** | $-136.87 | $292.65 | 87 | 62% | $-229.18 | 24 |
| mid_momentum | **$10060.18** | $60.13 | $0.05 | 172 | 56% | $-153.35 | 25 |
| fade_longshot | **$10017.88** | $115.44 | $-97.56 | 101 | 96% | $104.7 | 25 |
| mm_cheap | **$9990.34** | $0 | $-9.66 | 0 | — | $0 | 15 |
| mm_tight | **$9798.03** | $-358.5 | $156.53 | 132 | 53% | $-561.53 | 12 |
| mm_sports | **$9496.47** | $-757.01 | $253.48 | 152 | 54% | $-960.04 | 14 |
| ai_judge | **$9466.46** | $-487.64 | $-45.9 | 6 | 17% | $-500 | 3 |
| random_control | **$9438.63** | $-271.43 | $-289.94 | 107 | 59% | $-885.72 | 25 |
| mm_max | **$9198.26** | $-839.48 | $37.74 | 46 | 46% | $-956.87 | 1 |
| super | **$9188.84** | $-649.65 | $-161.51 | 58 | 43% | $-865.5 | 11 |
| mm_slow | **$8921.12** | $-1029.17 | $-49.71 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8665.21** | $-885.1 | $-449.69 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8515.64** | $-1391.83 | $-92.53 | 220 | 67% | $-1880.07 | 25 |
| whale_fade | **$6799.72** | $-3256.02 | $55.74 | 342 | 46% | $-3590.8 | 15 |
| copy_month (retired) | **$9320.88** | $-777.42 | $98.3 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9092.31** | $-1003.53 | $95.84 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8019.83** | $-1837.09 | $-143.08 | 145 | 26% | $-3864.75 | 2 |
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
