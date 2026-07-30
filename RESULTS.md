# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16173 · Last run: 2026-07-30T21:28:08.860Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 152 | 93 | 61% | $1431.12 | 9.42% | $1217.64 | 25 | $10533.61 |
| copy_top | 280 | 141 | 50% | $403.53 | 1.44% | $-925.04 | 21 | $10482.05 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10195.02 |
| mm_max | 15 | 9 | 60% | $62.53 | 4.17% | $-54.86 | 5 | $9910.54 |
| copy_pro | 253 | 123 | 49% | $-735.13 | -1.83% | $-1585.13 | 25 | $9727.23 |
| mm_strong | 23 | 13 | 57% | $-65.43 | -2.84% | $-203.53 | 25 | $9671.88 |
| mm_tight | 29 | 15 | 52% | $-228.61 | -7.88% | $-366.71 | 13 | $9664.17 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9605.59 |
| mm_slow | 17 | 9 | 53% | $-219.16 | -12.89% | $-336.55 | 22 | $9527.06 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9510.83 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9494.13 |
| mm_sports | 32 | 15 | 47% | $-563.96 | -17.62% | $-702.06 | 16 | $9281.33 |
| momentum | 188 | 132 | 70% | $-146.69 | -0.78% | $-634.93 | 25 | $9178.66 |
| random_control | 77 | 40 | 52% | $-740.1 | -9.61% | $-1354.39 | 25 | $9001.88 |
| whale_fade | 280 | 137 | 49% | $-920.62 | -3.29% | $-1255.4 | 22 | $8243.82 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9578.87 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8975.69 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8639.78 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5198.65 |

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
