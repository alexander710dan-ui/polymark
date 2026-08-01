# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21445 · Last run: 2026-08-01T17:45:54.942Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10520.39** | $572.38 | $-51.99 | 320 | 52% | $-277.62 | 25 |
| copy_top | **$10463.54** | $438.97 | $24.57 | 343 | 53% | $-889.6 | 15 |
| mid_momentum | **$10288.28** | $223.29 | $64.99 | 173 | 56% | $9.81 | 25 |
| fade_longshot | **$10026.85** | $117.48 | $-90.63 | 102 | 96% | $106.74 | 25 |
| mm_cheap | **$9994.35** | $-100 | $94.35 | 1 | 0% | $0 | 23 |
| strong_dip | **$9928.74** | $-136.87 | $65.61 | 87 | 62% | $-229.18 | 25 |
| mm_tight | **$9813.41** | $-488.23 | $301.64 | 136 | 52% | $-691.26 | 13 |
| mm_sports | **$9510.72** | $-830.49 | $341.21 | 157 | 54% | $-1033.52 | 16 |
| ai_judge | **$9465.35** | $-487.64 | $-47.01 | 6 | 17% | $-500 | 3 |
| random_control | **$9421.44** | $-239.85 | $-338.71 | 108 | 59% | $-854.14 | 25 |
| mm_max | **$9249.11** | $-839.48 | $88.59 | 46 | 46% | $-956.87 | 1 |
| super | **$9160.54** | $-649.65 | $-189.81 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$8979.12** | $-1029.17 | $8.29 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8728.76** | $-885.1 | $-386.14 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8672.38** | $-1228.67 | $-98.95 | 221 | 67% | $-1716.91 | 25 |
| whale_fade | **$6837.11** | $-2977.42 | $-185.47 | 344 | 47% | $-3312.2 | 15 |
| copy_month (retired) | **$9291.72** | $-777.42 | $69.14 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9090.53** | $-1003.53 | $94.06 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8023.17** | $-1837.09 | $-139.74 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5078.2** | $-4691.55 | $-230.25 | 81 | 2% | $-6591.55 | 3 |

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
