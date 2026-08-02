# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22240 · Last run: 2026-08-02T00:24:39.754Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10475.14** | $611.51 | $-136.37 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10332.71** | $298.98 | $33.73 | 348 | 53% | $-1029.59 | 23 |
| mm_cheap | **$10213.28** | $157.17 | $56.11 | 9 | 67% | $19.07 | 25 |
| fade_longshot | **$10005.72** | $117.48 | $-111.76 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9941.1** | $-219.84 | $160.94 | 331 | 51% | $-1069.84 | 25 |
| mm_tight | **$9865.04** | $-3.59 | $-131.37 | 152 | 55% | $-206.62 | 22 |
| strong_dip | **$9860.97** | $-471.26 | $332.23 | 92 | 59% | $-563.57 | 25 |
| mm_sports | **$9800.06** | $-99.89 | $-100.05 | 178 | 57% | $-302.92 | 24 |
| ai_judge | **$9430.61** | $-487.64 | $-81.75 | 6 | 17% | $-500 | 3 |
| super | **$9384.38** | $-649.65 | $34.03 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9191.18** | $-768.98 | $-39.84 | 49 | 47% | $-886.37 | 2 |
| mm_slow | **$8967.99** | $-940.49 | $-91.52 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$8851.07** | $-540.85 | $-608.08 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8548.07** | $-782.78 | $-669.15 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8401.35** | $-1261.91 | $-336.74 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7127.88** | $-2930.57 | $58.45 | 349 | 47% | $-3265.35 | 23 |
| copy_month (retired) | **$9326.07** | $-777.42 | $103.49 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9070.71** | $-1003.53 | $74.24 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8133.81** | $-1837.09 | $-29.1 | 145 | 26% | $-3864.75 | 2 |
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
