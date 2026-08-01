# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19541 · Last run: 2026-08-01T01:52:39.752Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 316 | 165 | 52% | $651.32 | 2.06% | $-677.25 | 22 | $10763.49 |
| copy_pro | 290 | 149 | 51% | $179.82 | 0.4% | $-670.18 | 25 | $10242.03 |
| strong_dip | 74 | 45 | 61% | $-288.08 | -3.89% | $-380.39 | 25 | $10078.35 |
| fade_longshot | 83 | 79 | 95% | $-0.05 | 0% | $-10.79 | 25 | $9986.78 |
| mid_momentum | 163 | 94 | 58% | $573.98 | 3.52% | $360.5 | 25 | $9916.45 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9466.65 |
| random_control | 88 | 48 | 55% | $-325.13 | -3.69% | $-939.42 | 25 | $9399.38 |
| super | 54 | 24 | 44% | $-449.65 | -6.2% | $-665.5 | 15 | $9127.5 |
| mm_max | 38 | 17 | 45% | $-845.14 | -22.24% | $-962.53 | 6 | $9119.93 |
| mm_tight | 106 | 53 | 50% | $-931.62 | -8.79% | $-1134.65 | 17 | $8955.34 |
| mm_slow | 39 | 17 | 44% | $-1107.64 | -28.4% | $-1225.03 | 25 | $8909.17 |
| mm_strong | 52 | 24 | 46% | $-815.26 | -15.68% | $-1019.21 | 25 | $8535.64 |
| mm_sports | 121 | 59 | 49% | $-1768.8 | -14.62% | $-1971.83 | 20 | $8466.89 |
| momentum | 201 | 134 | 67% | $-1216.64 | -6.05% | $-1704.88 | 25 | $8133 |
| whale_fade | 317 | 149 | 47% | $-2643.95 | -8.34% | $-2978.73 | 22 | $6920.22 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9324.09 |
| favorite (retired) | 123 | 82 | 67% | $-1175.39 | -9.56% | $-1239.32 | 13 | $9082.46 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 136 | 36 | 26% | $-1065.3 | -7.83% | $-3092.96 | 11 | $8055.66 |
| longshot (retired) | 72 | 2 | 3% | $-3791.55 | -52.66% | $-5691.55 | 12 | $5122.64 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

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
