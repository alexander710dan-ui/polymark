# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21819 · Last run: 2026-08-01T20:53:56.169Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10447.79** | $383.13 | $64.66 | 175 | 57% | $169.65 | 25 |
| copy_top | **$10426.78** | $338.97 | $87.81 | 344 | 53% | $-989.6 | 15 |
| mm_cheap | **$10159.48** | $-127.59 | $287.07 | 3 | 33% | $-200 | 25 |
| copy_pro | **$10087.16** | $204.07 | $-116.91 | 325 | 52% | $-645.93 | 25 |
| fade_longshot | **$10033.38** | $117.48 | $-84.1 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9758.1** | $-271.26 | $29.36 | 90 | 60% | $-363.57 | 25 |
| mm_tight | **$9608.46** | $-355.3 | $-36.24 | 142 | 54% | $-558.33 | 21 |
| ai_judge | **$9461.63** | $-487.64 | $-50.73 | 6 | 17% | $-500 | 3 |
| random_control | **$9308.6** | $-140.85 | $-550.55 | 112 | 61% | $-755.14 | 25 |
| mm_max | **$9244.56** | $-839.48 | $84.04 | 46 | 46% | $-956.87 | 2 |
| mm_sports | **$9173.16** | $-656.71 | $-170.13 | 164 | 55% | $-859.74 | 25 |
| super | **$9154.46** | $-649.65 | $-195.89 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9031.59** | $-1029.17 | $60.76 | 42 | 45% | $-1151.39 | 25 |
| momentum | **$8761.05** | $-1200.92 | $-38.03 | 223 | 67% | $-1689.16 | 25 |
| mm_strong | **$8668.59** | $-871.46 | $-459.95 | 58 | 47% | $-1075.41 | 25 |
| whale_fade | **$6833.95** | $-2888.74 | $-277.31 | 345 | 47% | $-3223.52 | 15 |
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
