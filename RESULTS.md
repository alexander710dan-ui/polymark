# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 16967 · Last run: 2026-07-31T04:05:50.629Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 153 | 93 | 61% | $1331.12 | 8.7% | $1117.64 | 25 | $10412.39 |
| copy_top | 287 | 147 | 51% | $703.01 | 2.45% | $-625.56 | 25 | $10375.31 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10094.63 |
| copy_pro | 262 | 131 | 50% | $-167.22 | -0.4% | $-1017.22 | 21 | $9764.99 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9726.82 |
| mm_max | 24 | 11 | 46% | $-527.94 | -22% | $-645.33 | 3 | $9442.4 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9434.42 |
| super | 51 | 24 | 47% | $-99.65 | -1.44% | $-315.5 | 17 | $9389.85 |
| mm_tight | 49 | 23 | 47% | $-671.44 | -13.7% | $-809.54 | 10 | $9375.63 |
| random_control | 79 | 41 | 52% | $-835.82 | -10.58% | $-1450.11 | 25 | $9193.93 |
| mm_slow | 29 | 14 | 48% | $-591.58 | -20.4% | $-708.97 | 18 | $9192.01 |
| mm_strong | 38 | 17 | 45% | $-845.63 | -22.25% | $-983.73 | 25 | $9041 |
| mm_sports | 56 | 26 | 46% | $-959.56 | -17.14% | $-1097.66 | 14 | $8883.67 |
| momentum | 189 | 132 | 70% | $-246.69 | -1.31% | $-734.93 | 25 | $8697.33 |
| whale_fade | 287 | 138 | 48% | $-1431.94 | -4.99% | $-1766.72 | 25 | $7894.47 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9462.58 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9032.66 |
| mean_revert (retired) | 130 | 31 | 24% | $-1181.38 | -9.09% | $-3209.04 | 17 | $8749.24 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5156.15 |

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
