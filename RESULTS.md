# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 18796 · Last run: 2026-07-31T19:32:15.509Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 301 | 155 | 51% | $641.78 | 2.13% | $-686.79 | 24 | $10746.82 |
| mid_momentum | 156 | 93 | 60% | $1131.12 | 7.25% | $917.64 | 25 | $10371.46 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10028.15 |
| copy_pro | 275 | 140 | 51% | $85.83 | 0.2% | $-764.17 | 25 | $9926.52 |
| strong_dip | 64 | 35 | 55% | $-679.87 | -10.62% | $-772.18 | 25 | $9660.85 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9472.93 |
| random_control | 82 | 43 | 52% | $-709.3 | -8.65% | $-1323.59 | 25 | $9366.04 |
| mm_max | 32 | 15 | 47% | $-580.81 | -18.15% | $-698.2 | 6 | $9356.53 |
| mm_tight | 91 | 47 | 52% | $-406.33 | -4.47% | $-609.36 | 17 | $9287.34 |
| mm_slow | 36 | 16 | 44% | $-961.49 | -26.71% | $-1078.88 | 25 | $9150.66 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9106.17 |
| mm_strong | 44 | 21 | 48% | $-779.58 | -17.72% | $-917.68 | 25 | $9095.17 |
| momentum | 192 | 134 | 70% | $-316.64 | -1.65% | $-804.88 | 25 | $8663.92 |
| mm_sports | 103 | 50 | 49% | $-1421.53 | -13.8% | $-1624.56 | 20 | $8553.69 |
| whale_fade | 302 | 144 | 48% | $-1816.01 | -6.01% | $-2150.79 | 24 | $6993.91 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9383.31 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9088.41 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 131 | 31 | 24% | $-1281.38 | -9.78% | $-3309.04 | 16 | $8042.82 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5127.7 |

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
