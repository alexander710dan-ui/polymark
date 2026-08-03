# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25156 · Last run: 2026-08-03T01:01:18.354Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10949.07** | $1050.3 | $-101.23 | 253 | 58% | $847.27 | 16 |
| mid_momentum | **$10521.11** | $716.17 | $-195.06 | 182 | 58% | $502.69 | 25 |
| copy_pro | **$10431.87** | $265.25 | $166.62 | 359 | 52% | $-584.75 | 25 |
| mm_cheap | **$10266.51** | $789.63 | $-523.12 | 22 | 73% | $611.85 | 25 |
| mm_tight | **$10245.5** | $282.54 | $-37.04 | 216 | 54% | $79.51 | 12 |
| strong_dip | **$9969.55** | $-378.86 | $348.41 | 95 | 60% | $-471.17 | 25 |
| fade_longshot | **$9945.89** | $134.52 | $-188.63 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9898.22** | $47.78 | $-149.56 | 375 | 52% | $-1280.79 | 24 |
| super | **$9557.32** | $-245.84 | $-196.84 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9419.41** | $-533.77 | $-46.82 | 69 | 54% | $-651.16 | 4 |
| ai_judge | **$9407.79** | $-487.64 | $-104.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9246.97** | $-310.74 | $-442.29 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8887.07** | $-882.32 | $-230.61 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8630.42** | $-933.53 | $-436.05 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8229.84** | $-1139.53 | $-630.63 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7166.85** | $-2326.79 | $-506.36 | 376 | 47% | $-2681.34 | 24 |
| copy_month (retired) | **$9384.85** | $-777.42 | $162.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.79** | $-1003.53 | $37.32 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.04** | $-1837.09 | $170.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5105.03** | $-4691.55 | $-203.42 | 81 | 2% | $-6591.55 | 3 |

**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.

**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

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
