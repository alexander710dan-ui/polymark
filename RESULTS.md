# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 17667 · Last run: 2026-07-31T10:01:27.747Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 293 | 149 | 51% | $457.82 | 1.56% | $-870.75 | 20 | $10388.8 |
| mid_momentum | 154 | 93 | 60% | $1231.12 | 7.99% | $1017.64 | 25 | $10383.29 |
| copy_pro | 268 | 135 | 50% | $-102.32 | -0.24% | $-952.32 | 21 | $10129.95 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10079.21 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9735.19 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9446.2 |
| random_control | 80 | 42 | 53% | $-779.57 | -9.74% | $-1393.86 | 25 | $9361.71 |
| super | 52 | 24 | 46% | $-249.65 | -3.54% | $-465.5 | 16 | $9339.47 |
| mm_tight | 56 | 27 | 48% | $-584.11 | -10.43% | $-787.14 | 18 | $9335.27 |
| mm_max | 26 | 12 | 46% | $-585.08 | -22.5% | $-702.47 | 5 | $9298.33 |
| mm_slow | 31 | 14 | 45% | $-791.58 | -25.53% | $-908.97 | 24 | $9029.46 |
| mm_strong | 41 | 18 | 44% | $-998.57 | -24.36% | $-1136.67 | 25 | $8980.26 |
| mm_sports | 65 | 30 | 46% | $-1115.29 | -17.16% | $-1318.32 | 25 | $8752.87 |
| momentum | 190 | 132 | 69% | $-346.69 | -1.82% | $-834.93 | 25 | $8621.85 |
| whale_fade | 294 | 142 | 48% | $-1338.93 | -4.55% | $-1673.71 | 19 | $7699.98 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9420.31 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9052.91 |
| mean_revert (retired) | 130 | 31 | 24% | $-1181.38 | -9.09% | $-3209.04 | 17 | $8679.44 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5155.48 |

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
