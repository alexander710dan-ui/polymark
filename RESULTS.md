# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22573 · Last run: 2026-08-02T03:11:11.773Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10428.22** | $658.57 | $-230.35 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10188.21** | $143.29 | $44.92 | 191 | 57% | $-59.74 | 15 |
| copy_top | **$10120.18** | $9.68 | $110.5 | 360 | 52% | $-1318.89 | 12 |
| mm_tight | **$10105.19** | $202.36 | $-97.17 | 165 | 55% | $-0.67 | 13 |
| mm_cheap | **$10049.47** | $522.9 | $-473.43 | 14 | 71% | $345.12 | 25 |
| copy_pro | **$10004.56** | $-118.71 | $123.27 | 341 | 51% | $-968.71 | 20 |
| fade_longshot | **$9945** | $117.48 | $-172.48 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9942.42** | $-393.8 | $336.22 | 94 | 60% | $-486.11 | 25 |
| super | **$9726.23** | $-472.29 | $198.52 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9387.7** | $-487.64 | $-124.66 | 6 | 17% | $-500 | 3 |
| mm_max | **$9274** | $-705.34 | $-20.66 | 52 | 48% | $-822.73 | 6 |
| random_control | **$9042.06** | $-523.46 | $-434.48 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8919.19** | $-851.81 | $-229 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8603.6** | $-982.78 | $-413.62 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8146.26** | $-1173.23 | $-680.51 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7228.36** | $-2645.9 | $-125.74 | 361 | 47% | $-2980.68 | 12 |
| copy_month (retired) | **$9395.81** | $-777.42 | $173.23 | 163 | 47% | $-1586.51 | 2 |
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
