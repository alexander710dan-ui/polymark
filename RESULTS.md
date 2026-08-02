# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22593 · Last run: 2026-08-02T03:21:12.581Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10394.39** | $658.57 | $-264.18 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10217.81** | $256.06 | $-38.25 | 192 | 57% | $53.03 | 14 |
| mm_tight | **$10195.59** | $315.13 | $-119.54 | 166 | 55% | $112.1 | 12 |
| mm_cheap | **$10065.07** | $522.9 | $-457.83 | 14 | 71% | $345.12 | 25 |
| copy_top | **$10055.82** | $9.68 | $46.14 | 360 | 52% | $-1318.89 | 20 |
| strong_dip | **$9955.61** | $-393.8 | $349.41 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9945.68** | $117.48 | $-171.8 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9891.48** | $-118.71 | $10.19 | 341 | 51% | $-968.71 | 22 |
| super | **$9770.9** | $-472.29 | $243.19 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9397.62** | $-487.64 | $-114.74 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.72** | $-664.49 | $2.21 | 53 | 49% | $-781.88 | 5 |
| random_control | **$9031.38** | $-523.46 | $-445.16 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8860.05** | $-851.81 | $-288.14 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8591.44** | $-982.78 | $-425.78 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8124.39** | $-1173.23 | $-702.38 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7275.11** | $-2645.9 | $-78.99 | 361 | 47% | $-2980.68 | 20 |
| copy_month (retired) | **$9398.59** | $-777.42 | $176.01 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9034.14** | $-1003.53 | $37.67 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8319.96** | $-1837.09 | $157.05 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5080.28** | $-4691.55 | $-228.17 | 81 | 2% | $-6591.55 | 3 |

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
