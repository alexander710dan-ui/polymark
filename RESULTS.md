# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 18832 · Last run: 2026-07-31T19:51:27.012Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 301 | 155 | 51% | $641.78 | 2.13% | $-686.79 | 25 | $10742.67 |
| mid_momentum | 156 | 93 | 60% | $1131.12 | 7.25% | $917.64 | 25 | $10432.66 |
| copy_pro | 275 | 140 | 51% | $85.83 | 0.2% | $-764.17 | 25 | $9984.14 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $9981.03 |
| strong_dip | 64 | 35 | 55% | $-679.87 | -10.62% | $-772.18 | 25 | $9777.61 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9470.33 |
| random_control | 82 | 43 | 52% | $-709.3 | -8.65% | $-1323.59 | 25 | $9354.1 |
| mm_max | 33 | 15 | 45% | $-680.81 | -20.63% | $-798.2 | 5 | $9303 |
| mm_tight | 92 | 47 | 51% | $-506.33 | -5.5% | $-709.36 | 16 | $9156.07 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9111.8 |
| mm_strong | 44 | 21 | 48% | $-779.58 | -17.72% | $-917.68 | 25 | $9033.35 |
| mm_slow | 36 | 16 | 44% | $-961.49 | -26.71% | $-1078.88 | 25 | $9025.41 |
| momentum | 192 | 134 | 70% | $-316.64 | -1.65% | $-804.88 | 25 | $8606.01 |
| mm_sports | 104 | 50 | 48% | $-1521.53 | -14.63% | $-1724.56 | 19 | $8390.91 |
| whale_fade | 302 | 144 | 48% | $-1816.01 | -6.01% | $-2150.79 | 25 | $6963.34 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9382.16 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9087.33 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 131 | 31 | 24% | $-1281.38 | -9.78% | $-3309.04 | 16 | $8049.07 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5130.34 |

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
