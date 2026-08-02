# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22634 · Last run: 2026-08-02T03:41:46.194Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10385.79** | $558.57 | $-172.78 | 180 | 57% | $345.09 | 25 |
| mm_sports | **$10188.15** | $374.67 | $-186.52 | 196 | 57% | $171.64 | 10 |
| copy_top | **$10030.78** | $-190.32 | $221.1 | 362 | 52% | $-1518.89 | 18 |
| mm_tight | **$10021.31** | $417.71 | $-396.4 | 169 | 55% | $214.68 | 9 |
| mm_cheap | **$9977.34** | $572.02 | $-594.68 | 17 | 71% | $394.24 | 25 |
| strong_dip | **$9958.29** | $-393.8 | $352.09 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9944.12** | $117.48 | $-173.36 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9825.09** | $-459.98 | $285.07 | 345 | 51% | $-1309.98 | 18 |
| super | **$9770.6** | $-472.29 | $242.89 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9401.68** | $-487.64 | $-110.68 | 6 | 17% | $-500 | 3 |
| mm_max | **$9265.42** | $-664.49 | $-70.09 | 55 | 49% | $-781.88 | 3 |
| random_control | **$8986.21** | $-723.46 | $-290.33 | 120 | 58% | $-1337.75 | 25 |
| mm_slow | **$8852.8** | $-951.81 | $-195.39 | 45 | 47% | $-1074.03 | 25 |
| mm_strong | **$8591.01** | $-982.78 | $-426.21 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8104.69** | $-1273.23 | $-622.08 | 231 | 67% | $-1761.47 | 25 |
| whale_fade | **$7242.8** | $-2413.32 | $-343.88 | 363 | 47% | $-2748.1 | 18 |
| copy_month (retired) | **$9397.27** | $-777.42 | $174.69 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9036.58** | $-1003.53 | $40.11 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.5** | $-1837.09 | $143.59 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5086.53** | $-4691.55 | $-221.92 | 81 | 2% | $-6591.55 | 3 |

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
