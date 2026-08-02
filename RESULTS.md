# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23808 · Last run: 2026-08-02T13:30:17.965Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10817.06** | $658.65 | $158.41 | 207 | 58% | $455.62 | 22 |
| mm_tight | **$10594.69** | $510.38 | $84.31 | 179 | 55% | $307.35 | 17 |
| mid_momentum | **$10398.53** | $630.98 | $-232.45 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10236.89** | $33.14 | $203.75 | 366 | 52% | $-1295.43 | 19 |
| copy_pro | **$10129.35** | $-141.7 | $271.05 | 350 | 51% | $-991.7 | 25 |
| mm_cheap | **$10104.2** | $704.44 | $-600.24 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9996.93** | $-393.8 | $390.73 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9954.43** | $117.48 | $-163.05 | 102 | 96% | $106.74 | 25 |
| super | **$9704.83** | $-245.84 | $-49.33 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9403.56** | $-487.64 | $-108.8 | 6 | 17% | $-500 | 3 |
| mm_max | **$9384.94** | $-660.83 | $45.77 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9051** | $-665.29 | $-283.71 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8867.3** | $-882.32 | $-250.38 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8582.88** | $-933.53 | $-483.59 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8213.01** | $-1139.53 | $-647.46 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7156.26** | $-2453.31 | $-390.43 | 367 | 47% | $-2788.09 | 19 |
| copy_month (retired) | **$9381.85** | $-777.42 | $159.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9039.98** | $-1003.53 | $43.51 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8303.42** | $-1837.09 | $140.51 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5096.95** | $-4691.55 | $-211.5 | 81 | 2% | $-6591.55 | 3 |

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
