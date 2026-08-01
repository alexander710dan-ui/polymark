# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19355 · Last run: 2026-08-01T00:19:25.240Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 315 | 165 | 52% | $751.32 | 2.39% | $-577.25 | 19 | $10696.29 |
| mid_momentum | 161 | 94 | 58% | $773.98 | 4.81% | $560.5 | 25 | $10080.46 |
| fade_longshot | 83 | 79 | 95% | $-0.05 | 0% | $-10.79 | 25 | $9997.86 |
| copy_pro | 288 | 148 | 51% | $53.63 | 0.12% | $-796.37 | 25 | $9908.88 |
| strong_dip | 74 | 45 | 61% | $-288.08 | -3.89% | $-380.39 | 20 | $9852.7 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9474.17 |
| random_control | 88 | 48 | 55% | $-325.13 | -3.69% | $-939.42 | 25 | $9360.76 |
| mm_max | 36 | 16 | 44% | $-798.99 | -22.19% | $-916.38 | 7 | $9249.58 |
| mm_tight | 104 | 52 | 50% | $-885.47 | -8.51% | $-1088.5 | 14 | $9115.63 |
| super | 54 | 24 | 44% | $-449.65 | -6.2% | $-665.5 | 15 | $8999.98 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8880.33 |
| mm_strong | 50 | 23 | 46% | $-797.08 | -15.94% | $-1001.03 | 25 | $8661.37 |
| mm_sports | 118 | 57 | 48% | $-1763.5 | -14.94% | $-1966.53 | 18 | $8472.91 |
| momentum | 199 | 134 | 67% | $-1016.64 | -5.11% | $-1504.88 | 25 | $8317.09 |
| whale_fade | 316 | 148 | 47% | $-2725.77 | -8.63% | $-3060.55 | 19 | $7052.08 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9309.11 |
| favorite (retired) | 123 | 82 | 67% | $-1175.39 | -9.56% | $-1239.32 | 13 | $9085.51 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 136 | 36 | 26% | $-1065.3 | -7.83% | $-3092.96 | 11 | $8037.89 |
| longshot (retired) | 72 | 2 | 3% | $-3791.55 | -52.66% | $-5691.55 | 12 | $5133.39 |

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
