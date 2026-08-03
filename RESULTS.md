# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25266 · Last run: 2026-08-03T01:56:22.837Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11069.67** | $950.3 | $119.37 | 256 | 57% | $747.27 | 13 |
| mid_momentum | **$10524.68** | $716.17 | $-191.49 | 183 | 57% | $502.69 | 25 |
| copy_pro | **$10353.79** | $265.25 | $88.54 | 359 | 52% | $-584.75 | 25 |
| mm_tight | **$10334.61** | $282.54 | $52.07 | 218 | 54% | $79.51 | 10 |
| mm_cheap | **$10258.12** | $789.63 | $-531.51 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9979.43** | $-378.86 | $358.29 | 95 | 60% | $-471.17 | 25 |
| fade_longshot | **$9944.81** | $134.52 | $-189.71 | 104 | 96% | $123.78 | 25 |
| copy_top | **$9864.75** | $47.78 | $-183.03 | 375 | 52% | $-1280.79 | 25 |
| super | **$9562.33** | $-245.84 | $-191.83 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9461.18** | $-533.77 | $-5.05 | 69 | 54% | $-651.16 | 4 |
| ai_judge | **$9407.79** | $-487.64 | $-104.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9246.07** | $-310.74 | $-443.19 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8874.02** | $-882.32 | $-243.66 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8618.61** | $-933.53 | $-447.86 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8224.52** | $-1139.53 | $-635.95 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7219.76** | $-2326.79 | $-453.45 | 376 | 47% | $-2681.34 | 25 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.79** | $-1003.53 | $37.32 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.04** | $-1837.09 | $170.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5105.12** | $-4691.55 | $-203.33 | 81 | 2% | $-6591.55 | 3 |

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
