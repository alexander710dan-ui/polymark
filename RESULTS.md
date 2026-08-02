# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24644 · Last run: 2026-08-02T20:43:49.666Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10935.14** | $743.21 | $191.93 | 232 | 57% | $540.18 | 24 |
| mid_momentum | **$10516.17** | $630.98 | $-114.81 | 181 | 57% | $417.5 | 25 |
| copy_pro | **$10482.55** | $-592.45 | $1075 | 354 | 51% | $-1442.45 | 24 |
| copy_top | **$10334.77** | $111.62 | $223.15 | 371 | 52% | $-1216.95 | 23 |
| mm_tight | **$10243.76** | $245.22 | $-1.46 | 200 | 54% | $42.19 | 17 |
| mm_cheap | **$10235.01** | $704.44 | $-469.43 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9967.92** | $-393.8 | $361.72 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9951.57** | $117.48 | $-165.91 | 102 | 96% | $106.74 | 25 |
| super | **$9710.04** | $-245.84 | $-44.12 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9521.97** | $-585.55 | $107.52 | 62 | 52% | $-702.94 | 8 |
| ai_judge | **$9407.91** | $-487.64 | $-104.45 | 6 | 17% | $-500 | 3 |
| random_control | **$9241.45** | $-310.74 | $-447.81 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8913.41** | $-882.32 | $-204.27 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8623.12** | $-933.53 | $-443.35 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8249.15** | $-1139.53 | $-611.32 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$6983.04** | $-2290.43 | $-726.53 | 372 | 47% | $-2644.98 | 23 |
| copy_month (retired) | **$9380.46** | $-777.42 | $157.88 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9038.27** | $-1003.53 | $41.8 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8313.42** | $-1837.09 | $150.51 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5111.2** | $-4691.55 | $-197.25 | 81 | 2% | $-6591.55 | 3 |

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
