# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21825 · Last run: 2026-08-01T20:56:44.645Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10443.42** | $383.13 | $60.29 | 175 | 57% | $169.65 | 25 |
| copy_top | **$10415.71** | $338.97 | $76.74 | 344 | 53% | $-989.6 | 15 |
| mm_cheap | **$10170.43** | $-127.59 | $298.02 | 3 | 33% | $-200 | 25 |
| copy_pro | **$10041.5** | $204.07 | $-162.57 | 325 | 52% | $-645.93 | 25 |
| fade_longshot | **$10033.59** | $117.48 | $-83.89 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9763.04** | $-271.26 | $34.3 | 90 | 60% | $-363.57 | 25 |
| mm_tight | **$9575.2** | $-355.3 | $-69.5 | 142 | 54% | $-558.33 | 21 |
| ai_judge | **$9461.63** | $-487.64 | $-50.73 | 6 | 17% | $-500 | 3 |
| random_control | **$9325.35** | $-140.85 | $-533.8 | 112 | 61% | $-755.14 | 25 |
| mm_max | **$9255.47** | $-839.48 | $94.95 | 46 | 46% | $-956.87 | 2 |
| super | **$9152.08** | $-649.65 | $-198.27 | 58 | 43% | $-865.5 | 12 |
| mm_sports | **$9146.67** | $-656.71 | $-196.62 | 164 | 55% | $-859.74 | 25 |
| mm_slow | **$9027.08** | $-1029.17 | $56.25 | 42 | 45% | $-1151.39 | 25 |
| momentum | **$8770.04** | $-1189.81 | $-40.15 | 224 | 67% | $-1678.05 | 25 |
| mm_strong | **$8664.28** | $-871.46 | $-464.26 | 58 | 47% | $-1075.41 | 25 |
| whale_fade | **$6842.95** | $-2888.74 | $-268.31 | 345 | 47% | $-3223.52 | 15 |
| copy_month (retired) | **$9287.62** | $-777.42 | $65.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9088.25** | $-1003.53 | $91.78 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8033.04** | $-1837.09 | $-129.87 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5074.03** | $-4691.55 | $-234.42 | 81 | 2% | $-6591.55 | 3 |

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
