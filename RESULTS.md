# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 18496 · Last run: 2026-07-31T16:56:59.016Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 297 | 153 | 52% | $787.14 | 2.65% | $-541.43 | 25 | $10482.66 |
| mid_momentum | 155 | 93 | 60% | $1131.12 | 7.3% | $917.64 | 25 | $10396.99 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10047.73 |
| copy_pro | 272 | 139 | 51% | $359.36 | 0.84% | $-490.64 | 25 | $9638.29 |
| strong_dip | 62 | 34 | 55% | $-711.6 | -11.48% | $-803.91 | 25 | $9628.86 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9469.91 |
| random_control | 81 | 43 | 53% | $-609.3 | -7.52% | $-1223.59 | 25 | $9252.84 |
| mm_strong | 43 | 20 | 47% | $-840.87 | -19.56% | $-978.97 | 25 | $9189.67 |
| mm_max | 29 | 12 | 41% | $-885.08 | -30.52% | $-1002.47 | 6 | $9169.07 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9134.41 |
| mm_slow | 35 | 15 | 43% | $-1013.01 | -28.94% | $-1130.4 | 25 | $9093.67 |
| mm_tight | 78 | 38 | 49% | $-881.73 | -11.3% | $-1084.76 | 24 | $9035.49 |
| momentum | 192 | 134 | 70% | $-316.64 | -1.65% | $-804.88 | 25 | $8715.26 |
| mm_sports | 89 | 41 | 46% | $-1588.78 | -17.85% | $-1791.81 | 25 | $8375.68 |
| whale_fade | 298 | 142 | 48% | $-1738.93 | -5.84% | $-2073.71 | 25 | $7367.93 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9384.25 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9085.19 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 131 | 31 | 24% | $-1281.38 | -9.78% | $-3309.04 | 16 | $8054.9 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5140.72 |

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
