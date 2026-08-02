# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23952 · Last run: 2026-08-02T14:42:11.526Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10748** | $684.34 | $63.66 | 213 | 58% | $481.31 | 19 |
| mm_tight | **$10517.22** | $459.1 | $58.12 | 184 | 55% | $256.07 | 15 |
| mid_momentum | **$10387.32** | $630.98 | $-243.66 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10176.11** | $150.53 | $25.58 | 367 | 52% | $-1178.04 | 21 |
| mm_cheap | **$10103.62** | $704.44 | $-600.82 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10023.93** | $-192.45 | $216.38 | 352 | 51% | $-1042.45 | 25 |
| strong_dip | **$10013.09** | $-393.8 | $406.89 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9963.76** | $117.48 | $-153.72 | 102 | 96% | $106.74 | 25 |
| super | **$9685.76** | $-245.84 | $-68.4 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9403.9** | $-487.64 | $-108.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9384.94** | $-660.83 | $45.77 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9213.92** | $-665.29 | $-120.79 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8872.09** | $-882.32 | $-245.59 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8594.59** | $-933.53 | $-471.88 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8210.74** | $-1139.53 | $-649.73 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7300.61** | $-2553.31 | $-146.08 | 368 | 47% | $-2888.09 | 21 |
| copy_month (retired) | **$9384.77** | $-777.42 | $162.19 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9040.73** | $-1003.53 | $44.26 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8299.83** | $-1837.09 | $136.92 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5106.32** | $-4691.55 | $-202.13 | 81 | 2% | $-6591.55 | 3 |

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
