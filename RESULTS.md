# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24681 · Last run: 2026-08-02T21:02:43.332Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10875.04** | $873.99 | $1.05 | 234 | 58% | $670.96 | 25 |
| copy_pro | **$10557.13** | $-592.45 | $1149.58 | 354 | 51% | $-1442.45 | 25 |
| mid_momentum | **$10498.4** | $630.98 | $-132.58 | 181 | 57% | $417.5 | 25 |
| mm_cheap | **$10237.69** | $704.44 | $-466.75 | 21 | 71% | $526.66 | 25 |
| copy_top | **$10231.22** | $111.62 | $119.6 | 371 | 52% | $-1216.95 | 23 |
| mm_tight | **$10220.13** | $376 | $-155.87 | 202 | 54% | $172.97 | 17 |
| strong_dip | **$9972.82** | $-393.8 | $366.62 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9953.9** | $117.48 | $-163.58 | 102 | 96% | $106.74 | 25 |
| super | **$9715.75** | $-245.84 | $-38.41 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9537.97** | $-479.33 | $17.3 | 64 | 53% | $-596.72 | 7 |
| ai_judge | **$9406.8** | $-487.64 | $-105.56 | 6 | 17% | $-500 | 3 |
| random_control | **$9245.42** | $-310.74 | $-443.84 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8924.72** | $-882.32 | $-192.96 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8620.82** | $-933.53 | $-445.65 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8248.59** | $-1139.53 | $-611.88 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7089.17** | $-2290.43 | $-620.4 | 372 | 47% | $-2644.98 | 23 |
| copy_month (retired) | **$9380.46** | $-777.42 | $157.88 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9037.68** | $-1003.53 | $41.21 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8316.76** | $-1837.09 | $153.85 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5108.07** | $-4691.55 | $-200.38 | 81 | 2% | $-6591.55 | 3 |

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
