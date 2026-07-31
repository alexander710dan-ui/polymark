# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19192 · Last run: 2026-07-31T22:51:54.996Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 310 | 163 | 53% | $1036.26 | 3.34% | $-292.31 | 22 | $10845.88 |
| mid_momentum | 158 | 94 | 59% | $1073.98 | 6.8% | $860.5 | 25 | $10238.44 |
| copy_pro | 286 | 148 | 52% | $253.63 | 0.56% | $-596.37 | 25 | $10064.31 |
| fade_longshot | 75 | 71 | 95% | $-38.53 | -0.51% | $-48.42 | 25 | $9982.25 |
| strong_dip | 68 | 39 | 57% | $-520.01 | -7.65% | $-612.32 | 25 | $9840.86 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9471.23 |
| random_control | 85 | 46 | 54% | $-266.04 | -3.13% | $-880.33 | 25 | $9446.88 |
| mm_max | 35 | 16 | 46% | $-698.99 | -19.97% | $-816.38 | 4 | $9168.62 |
| mm_tight | 101 | 51 | 50% | $-749.4 | -7.42% | $-952.43 | 12 | $9062.11 |
| super | 54 | 24 | 44% | $-449.65 | -6.2% | $-665.5 | 14 | $9014.43 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8863.93 |
| mm_strong | 48 | 23 | 48% | $-597.08 | -12.44% | $-801.03 | 25 | $8827.42 |
| momentum | 195 | 134 | 69% | $-616.64 | -3.16% | $-1104.88 | 25 | $8484.45 |
| mm_sports | 115 | 55 | 48% | $-1840.2 | -16% | $-2043.23 | 14 | $8155.96 |
| whale_fade | 311 | 145 | 47% | $-2589.43 | -8.33% | $-2924.21 | 22 | $6877.11 |
| copy_month (retired) | 158 | 76 | 48% | $-384.95 | -2.44% | $-1194.04 | 7 | $9303.16 |
| favorite (retired) | 121 | 80 | 66% | $-1208.65 | -9.99% | $-1272.58 | 15 | $9081.62 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 133 | 33 | 25% | $-1188.72 | -8.94% | $-3216.38 | 14 | $8057.91 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5138.16 |

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
