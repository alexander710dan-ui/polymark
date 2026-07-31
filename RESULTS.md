# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 18235 · Last run: 2026-07-31T14:46:17.415Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 295 | 151 | 51% | $544.96 | 1.85% | $-783.61 | 25 | $10549.38 |
| mid_momentum | 155 | 93 | 60% | $1131.12 | 7.3% | $917.64 | 25 | $10349.03 |
| copy_pro | 271 | 138 | 51% | $232.09 | 0.54% | $-617.91 | 25 | $10054.92 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10052.31 |
| strong_dip | 62 | 34 | 55% | $-711.6 | -11.48% | $-803.91 | 25 | $9605.17 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9466.88 |
| random_control | 81 | 43 | 53% | $-609.3 | -7.52% | $-1223.59 | 25 | $9253.14 |
| mm_strong | 42 | 19 | 45% | $-953.64 | -22.71% | $-1091.74 | 25 | $9208.07 |
| mm_max | 28 | 12 | 43% | $-785.08 | -28.04% | $-902.47 | 4 | $9172.23 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9152.77 |
| mm_tight | 68 | 31 | 46% | $-1110.76 | -16.33% | $-1313.79 | 22 | $9084 |
| mm_slow | 34 | 15 | 44% | $-913.01 | -26.85% | $-1030.4 | 24 | $9060.36 |
| momentum | 191 | 133 | 70% | $-332.92 | -1.74% | $-821.16 | 25 | $8739.99 |
| mm_sports | 80 | 36 | 45% | $-1614.98 | -20.19% | $-1818.01 | 23 | $8388.71 |
| whale_fade | 296 | 142 | 48% | $-1538.93 | -5.2% | $-1873.71 | 25 | $7463.43 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9392.46 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9078.85 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 131 | 31 | 24% | $-1281.38 | -9.78% | $-3309.04 | 16 | $8063.48 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5150.91 |

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
