# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22153 · Last run: 2026-08-01T23:40:53.552Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10524.05** | $611.51 | $-87.46 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10274.62** | $298.98 | $-24.36 | 348 | 53% | $-1029.59 | 20 |
| mm_cheap | **$10248.95** | $157.17 | $91.78 | 9 | 67% | $19.07 | 25 |
| fade_longshot | **$10028.14** | $117.48 | $-89.34 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9951.64** | $-219.84 | $171.48 | 331 | 51% | $-1069.84 | 25 |
| strong_dip | **$9810.91** | $-471.26 | $282.17 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9699.17** | $-3.59 | $-297.24 | 152 | 55% | $-206.62 | 20 |
| mm_sports | **$9622.42** | $-99.89 | $-277.69 | 178 | 57% | $-302.92 | 21 |
| ai_judge | **$9454.28** | $-487.64 | $-58.08 | 6 | 17% | $-500 | 3 |
| super | **$9288.13** | $-649.65 | $-62.22 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9228.29** | $-768.98 | $-2.73 | 49 | 47% | $-886.37 | 1 |
| mm_slow | **$9058.49** | $-940.49 | $-1.02 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$9009.63** | $-540.85 | $-449.52 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8582.74** | $-782.78 | $-634.48 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8535.14** | $-1261.91 | $-202.95 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$6968.08** | $-2930.57 | $-101.35 | 349 | 47% | $-3265.35 | 20 |
| copy_month (retired) | **$9305.38** | $-777.42 | $82.8 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9082.63** | $-1003.53 | $86.16 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8060.22** | $-1837.09 | $-102.69 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5075.07** | $-4691.55 | $-233.38 | 81 | 2% | $-6591.55 | 3 |

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
