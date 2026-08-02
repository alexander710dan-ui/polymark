# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22273 · Last run: 2026-08-02T00:40:58.999Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10490.2** | $611.51 | $-121.31 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10441.58** | $298.98 | $142.6 | 348 | 53% | $-1029.59 | 23 |
| mm_cheap | **$10241.87** | $157.17 | $84.7 | 9 | 67% | $19.07 | 25 |
| fade_longshot | **$10013.46** | $117.48 | $-104.02 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9968.3** | $-219.84 | $188.14 | 331 | 51% | $-1069.84 | 25 |
| mm_tight | **$9872.93** | $90.53 | $-217.6 | 154 | 55% | $-112.5 | 21 |
| strong_dip | **$9843.68** | $-471.26 | $314.94 | 92 | 59% | $-563.57 | 25 |
| mm_sports | **$9794.34** | $94.23 | $-299.89 | 179 | 57% | $-108.8 | 23 |
| ai_judge | **$9432.44** | $-487.64 | $-79.92 | 6 | 17% | $-500 | 3 |
| super | **$9303.9** | $-649.65 | $-46.45 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9240.59** | $-768.98 | $9.57 | 49 | 47% | $-886.37 | 3 |
| mm_slow | **$8953.44** | $-940.49 | $-106.07 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$8893.54** | $-540.85 | $-565.61 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8586.46** | $-782.78 | $-630.76 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8407.45** | $-1261.91 | $-330.64 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7016.41** | $-2930.57 | $-53.02 | 349 | 47% | $-3265.35 | 23 |
| copy_month (retired) | **$9323.37** | $-777.42 | $100.79 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9071.97** | $-1003.53 | $75.5 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8127.01** | $-1837.09 | $-35.9 | 145 | 26% | $-3864.75 | 2 |
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
