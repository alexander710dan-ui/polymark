# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23939 · Last run: 2026-08-02T14:35:56.539Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10749.17** | $562.12 | $187.05 | 212 | 58% | $359.09 | 18 |
| mm_tight | **$10518.41** | $366.79 | $151.62 | 183 | 55% | $163.76 | 14 |
| mid_momentum | **$10389.28** | $630.98 | $-241.7 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10203.53** | $150.53 | $53 | 367 | 52% | $-1178.04 | 21 |
| mm_cheap | **$10107.65** | $704.44 | $-596.79 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10070.53** | $-92.45 | $162.98 | 351 | 51% | $-942.45 | 25 |
| strong_dip | **$10007.58** | $-393.8 | $401.38 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9961.46** | $117.48 | $-156.02 | 102 | 96% | $106.74 | 25 |
| super | **$9698.34** | $-245.84 | $-55.82 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9403.9** | $-487.64 | $-108.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9384.94** | $-660.83 | $45.77 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9152.12** | $-665.29 | $-182.59 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8876.34** | $-882.32 | $-241.34 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8597.48** | $-933.53 | $-468.99 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8204.74** | $-1139.53 | $-655.73 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7246.62** | $-2553.31 | $-200.07 | 368 | 47% | $-2888.09 | 21 |
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
