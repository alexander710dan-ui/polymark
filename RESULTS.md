# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24447 · Last run: 2026-08-02T18:58:08.106Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10670.82** | $731.87 | $-61.05 | 227 | 57% | $528.84 | 23 |
| mid_momentum | **$10387.83** | $630.98 | $-243.15 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10298.28** | $50.53 | $247.75 | 368 | 52% | $-1278.04 | 25 |
| copy_pro | **$10285.98** | $-392.45 | $678.43 | 353 | 51% | $-1242.45 | 25 |
| mm_tight | **$10161.32** | $456.54 | $-295.22 | 196 | 55% | $253.51 | 17 |
| mm_cheap | **$10089.17** | $704.44 | $-615.27 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9979.56** | $-393.8 | $373.36 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9946.3** | $117.48 | $-171.18 | 102 | 96% | $106.74 | 25 |
| super | **$9740.4** | $-245.84 | $-13.76 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9395.01** | $-487.64 | $-117.35 | 6 | 17% | $-500 | 3 |
| mm_max | **$9361.81** | $-613.77 | $-24.42 | 59 | 51% | $-731.16 | 8 |
| random_control | **$9262.53** | $-310.74 | $-426.73 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8891.69** | $-882.32 | $-225.99 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8623.65** | $-933.53 | $-442.82 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8221.9** | $-1139.53 | $-638.57 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7163.5** | $-2198.76 | $-637.74 | 369 | 47% | $-2553.31 | 25 |
| copy_month (retired) | **$9387.55** | $-777.42 | $164.97 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9036.02** | $-1003.53 | $39.55 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8326.5** | $-1837.09 | $163.59 | 145 | 26% | $-3864.75 | 2 |
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
