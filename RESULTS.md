# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16396 · Last run: 2026-07-30T23:19:51.292Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 284 | 144 | 51% | $441.35 | 1.55% | $-887.22 | 24 | $10501.09 |
| mid_momentum | 153 | 93 | 61% | $1331.12 | 8.7% | $1117.64 | 25 | $10466.85 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10130.85 |
| mm_max | 19 | 11 | 58% | $-27.94 | -1.47% | $-145.33 | 3 | $9885.76 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9688.17 |
| mm_tight | 37 | 19 | 51% | $-310.08 | -8.38% | $-448.18 | 8 | $9644.1 |
| mm_strong | 28 | 14 | 50% | $-393.02 | -14.04% | $-531.12 | 25 | $9578.54 |
| copy_pro | 258 | 127 | 49% | $-657.77 | -1.61% | $-1507.77 | 23 | $9546.3 |
| mm_slow | 22 | 11 | 50% | $-367.3 | -16.7% | $-484.69 | 18 | $9489.49 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9472.94 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 18 | $9409.34 |
| mm_sports | 40 | 19 | 48% | $-641.35 | -16.03% | $-779.45 | 14 | $9144.74 |
| random_control | 78 | 41 | 53% | $-735.82 | -9.43% | $-1350.11 | 25 | $9133.62 |
| momentum | 189 | 132 | 70% | $-246.69 | -1.31% | $-734.93 | 25 | $8885.89 |
| whale_fade | 284 | 138 | 49% | $-1131.94 | -3.99% | $-1466.72 | 25 | $8018.08 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9493.85 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9013.61 |
| mean_revert (retired) | 130 | 31 | 24% | $-1181.38 | -9.09% | $-3209.04 | 17 | $8715.42 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5194.07 |

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
