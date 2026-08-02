# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22567 · Last run: 2026-08-02T03:08:20.392Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10466.52** | $658.57 | $-192.05 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10225.29** | $143.29 | $82 | 191 | 57% | $-59.74 | 15 |
| copy_top | **$10145.63** | $9.68 | $135.95 | 360 | 52% | $-1318.89 | 12 |
| mm_tight | **$10116.64** | $202.36 | $-85.72 | 165 | 55% | $-0.67 | 13 |
| copy_pro | **$10079.81** | $-118.71 | $198.52 | 341 | 51% | $-968.71 | 20 |
| mm_cheap | **$10049.35** | $522.9 | $-473.55 | 14 | 71% | $345.12 | 25 |
| fade_longshot | **$9945.55** | $117.48 | $-171.93 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9934.92** | $-393.8 | $328.72 | 94 | 60% | $-486.11 | 25 |
| super | **$9725.36** | $-472.29 | $197.65 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9387.7** | $-487.64 | $-124.66 | 6 | 17% | $-500 | 3 |
| mm_max | **$9265.12** | $-705.34 | $-29.54 | 52 | 48% | $-822.73 | 6 |
| random_control | **$9091.17** | $-523.46 | $-385.37 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8943.97** | $-851.81 | $-204.22 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8612.48** | $-982.78 | $-404.74 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8178.55** | $-1173.23 | $-648.22 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7196.55** | $-2645.9 | $-157.55 | 361 | 47% | $-2980.68 | 12 |
| copy_month (retired) | **$9398.59** | $-777.42 | $176.01 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9034.1** | $-1003.53 | $37.63 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8326.63** | $-1837.09 | $163.72 | 145 | 26% | $-3864.75 | 2 |
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
