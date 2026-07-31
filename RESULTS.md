# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 19034 · Last run: 2026-07-31T21:32:55.783Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 304 | 158 | 52% | $883.11 | 2.9% | $-445.46 | 25 | $10861.2 |
| mid_momentum | 156 | 93 | 60% | $1131.12 | 7.25% | $917.64 | 25 | $10361.09 |
| copy_pro | 278 | 142 | 51% | $256.99 | 0.58% | $-593.01 | 25 | $10090.69 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $9980.25 |
| strong_dip | 65 | 36 | 55% | $-632.81 | -9.74% | $-725.12 | 25 | $9764.21 |
| random_control | 82 | 43 | 52% | $-709.3 | -8.65% | $-1323.59 | 25 | $9605.11 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9473.44 |
| mm_max | 35 | 16 | 46% | $-698.99 | -19.97% | $-816.38 | 3 | $9297.37 |
| mm_tight | 98 | 51 | 52% | $-449.4 | -4.59% | $-652.43 | 10 | $9211 |
| super | 53 | 24 | 45% | $-349.65 | -4.89% | $-565.5 | 15 | $9023.06 |
| mm_strong | 44 | 21 | 48% | $-779.58 | -17.72% | $-917.68 | 25 | $8961.15 |
| mm_slow | 38 | 16 | 42% | $-1161.49 | -30.57% | $-1278.88 | 25 | $8918.13 |
| momentum | 192 | 134 | 70% | $-316.64 | -1.65% | $-804.88 | 25 | $8587.14 |
| mm_sports | 110 | 53 | 48% | $-1644.35 | -14.95% | $-1847.38 | 14 | $8322.51 |
| whale_fade | 305 | 144 | 47% | $-2116.01 | -6.94% | $-2450.79 | 25 | $6868.41 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9317.84 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $9084.69 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 131 | 31 | 24% | $-1281.38 | -9.78% | $-3309.04 | 16 | $8047.68 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5141.27 |

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
