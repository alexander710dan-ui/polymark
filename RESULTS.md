# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19846 · Last run: 2026-08-01T04:25:17.668Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 300 | 155 | 52% | $513.78 | 1.09% | $-336.22 | 22 | $10767.97 |
| copy_top | 324 | 170 | 52% | $665.74 | 2.05% | $-662.83 | 19 | $10723.22 |
| strong_dip | 78 | 49 | 63% | $-37.27 | -0.48% | $-129.58 | 23 | $10023.26 |
| fade_longshot | 86 | 82 | 95% | $18.75 | 0.22% | $8.01 | 25 | $9989.55 |
| mid_momentum | 165 | 94 | 57% | $373.98 | 2.27% | $160.5 | 25 | $9902.55 |
| random_control | 91 | 50 | 55% | $-346.93 | -3.81% | $-961.22 | 25 | $9502.25 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9466.07 |
| mm_tight | 117 | 59 | 50% | $-931.12 | -7.96% | $-1134.15 | 9 | $9269.19 |
| mm_max | 42 | 19 | 45% | $-874.26 | -20.82% | $-991.65 | 4 | $9187.36 |
| super | 55 | 25 | 45% | $-349.65 | -4.72% | $-565.5 | 14 | $9115.42 |
| mm_slow | 40 | 18 | 45% | $-1051.39 | -26.28% | $-1168.78 | 25 | $8874.9 |
| mm_sports | 135 | 69 | 51% | $-1417.68 | -10.5% | $-1620.71 | 10 | $8787.77 |
| mm_strong | 54 | 24 | 44% | $-1015.26 | -18.8% | $-1219.21 | 25 | $8578.86 |
| momentum | 206 | 138 | 67% | $-1294 | -6.28% | $-1782.24 | 25 | $8198.16 |
| whale_fade | 325 | 152 | 47% | $-2839.18 | -8.74% | $-3173.96 | 19 | $6652.91 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9310.79 |
| favorite (retired) | 124 | 83 | 67% | $-1160.45 | -9.36% | $-1224.38 | 12 | $9088.86 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 137 | 36 | 26% | $-1165.3 | -8.51% | $-3192.96 | 10 | $8028.87 |
| longshot (retired) | 73 | 2 | 3% | $-3891.55 | -53.31% | $-5791.55 | 11 | $5095.08 |

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
