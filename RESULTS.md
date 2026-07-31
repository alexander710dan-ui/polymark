# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19103 · Last run: 2026-07-31T22:07:21.673Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 306 | 160 | 52% | $912.33 | 2.98% | $-416.24 | 25 | $10838.99 |
| mid_momentum | 156 | 93 | 60% | $1131.12 | 7.25% | $917.64 | 25 | $10351.21 |
| copy_pro | 281 | 144 | 51% | $111.16 | 0.25% | $-738.84 | 25 | $10056.72 |
| fade_longshot | 73 | 70 | 96% | $56.21 | 0.77% | $46.32 | 25 | $9976.18 |
| strong_dip | 66 | 37 | 56% | $-601.4 | -9.11% | $-693.71 | 25 | $9750.11 |
| random_control | 83 | 44 | 53% | $-445.66 | -5.37% | $-1059.95 | 25 | $9615.18 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9469.96 |
| mm_max | 35 | 16 | 46% | $-698.99 | -19.97% | $-816.38 | 4 | $9294.4 |
| mm_tight | 98 | 51 | 52% | $-449.4 | -4.59% | $-652.43 | 12 | $9220.5 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9000.26 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8920.69 |
| mm_strong | 45 | 22 | 49% | $-575.63 | -12.79% | $-779.58 | 25 | $8916.28 |
| momentum | 193 | 134 | 69% | $-416.64 | -2.16% | $-904.88 | 25 | $8590.32 |
| mm_sports | 110 | 53 | 48% | $-1644.35 | -14.95% | $-1847.38 | 15 | $8275.28 |
| whale_fade | 307 | 144 | 47% | $-2316.01 | -7.54% | $-2650.79 | 25 | $6879.79 |
| copy_month (retired) | 157 | 76 | 48% | $-284.95 | -1.81% | $-1094.04 | 8 | $9303.1 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9084.05 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 132 | 32 | 24% | $-1212.18 | -9.18% | $-3239.84 | 15 | $8052.61 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5155.49 |

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
