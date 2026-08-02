# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22781 · Last run: 2026-08-02T04:55:35.244Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10523.71** | $479.45 | $44.26 | 202 | 57% | $276.42 | 7 |
| mid_momentum | **$10497.2** | $630.98 | $-133.78 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10376.18** | $307.51 | $68.67 | 174 | 55% | $104.48 | 6 |
| copy_top | **$10207.01** | $-190.32 | $397.33 | 362 | 52% | $-1518.89 | 18 |
| copy_pro | **$10083.44** | $-315.15 | $398.59 | 346 | 51% | $-1165.15 | 18 |
| mm_cheap | **$10078.97** | $544.43 | $-465.46 | 19 | 68% | $366.65 | 25 |
| fade_longshot | **$9937.72** | $117.48 | $-179.76 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9937.34** | $-393.8 | $331.14 | 94 | 60% | $-486.11 | 25 |
| super | **$9778.65** | $-472.29 | $250.94 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9393.9** | $-487.64 | $-118.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9333.52** | $-705.76 | $39.28 | 57 | 49% | $-823.15 | 1 |
| random_control | **$8954.68** | $-653.97 | $-391.35 | 121 | 58% | $-1268.26 | 25 |
| mm_slow | **$8945.06** | $-882.32 | $-172.62 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8616.06** | $-982.78 | $-401.16 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8212.96** | $-1200.82 | $-586.22 | 232 | 67% | $-1689.06 | 25 |
| whale_fade | **$7196.68** | $-2413.32 | $-390 | 363 | 47% | $-2748.1 | 18 |
| copy_month (retired) | **$9395.88** | $-777.42 | $173.3 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.05** | $-1003.53 | $36.58 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8329.83** | $-1837.09 | $166.92 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5091.74** | $-4691.55 | $-216.71 | 81 | 2% | $-6591.55 | 3 |

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
