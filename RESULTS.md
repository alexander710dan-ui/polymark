# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21300 · Last run: 2026-08-01T16:33:26.394Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 318 | 167 | 53% | $872.38 | 1.76% | $22.38 | 25 | $10579.7 |
| copy_top | 341 | 181 | 53% | $638.97 | 1.87% | $-689.6 | 15 | $10513.59 |
| strong_dip | 87 | 54 | 62% | $-136.87 | -1.57% | $-229.18 | 24 | $10151.85 |
| mid_momentum | 172 | 96 | 56% | $60.13 | 0.35% | $-153.35 | 25 | $10072.35 |
| fade_longshot | 101 | 97 | 96% | $115.44 | 1.14% | $104.7 | 24 | $10028.34 |
| mm_tight | 132 | 70 | 53% | $-358.5 | -2.72% | $-561.53 | 12 | $9785.11 |
| random_control | 107 | 63 | 59% | $-271.43 | -2.54% | $-885.72 | 25 | $9487.92 |
| mm_sports | 152 | 82 | 54% | $-757.01 | -4.98% | $-960.04 | 14 | $9483.55 |
| ai_judge | 6 | 1 | 17% | $-487.64 | -81.27% | $-500 | 3 | $9466.85 |
| super | 58 | 25 | 43% | $-649.65 | -8.44% | $-865.5 | 11 | $9188.63 |
| mm_max | 46 | 21 | 46% | $-839.48 | -18.25% | $-956.87 | 1 | $9180.33 |
| mm_slow | 42 | 19 | 45% | $-1029.17 | -24.5% | $-1151.39 | 25 | $8894.83 |
| mm_strong | 57 | 26 | 46% | $-885.1 | -15.53% | $-1089.05 | 25 | $8647.18 |
| momentum | 220 | 147 | 67% | $-1391.83 | -6.33% | $-1880.07 | 25 | $8516.81 |
| whale_fade | 342 | 158 | 46% | $-3256.02 | -9.52% | $-3590.8 | 15 | $6799.89 |
| copy_month (retired) | 163 | 77 | 47% | $-777.42 | -4.77% | $-1586.51 | 2 | $9320.81 |
| favorite (retired) | 131 | 90 | 69% | $-1003.53 | -7.66% | $-1067.46 | 5 | $9092.23 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| mean_revert (retired) | 145 | 37 | 26% | $-1837.09 | -12.67% | $-3864.75 | 2 | $8019.96 |
| longshot (retired) | 81 | 2 | 2% | $-4691.55 | -57.92% | $-6591.55 | 3 | $5079.24 |

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
