# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23651 · Last run: 2026-08-02T12:11:17.196Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10885.57** | $558.65 | $326.92 | 206 | 58% | $355.62 | 20 |
| mm_tight | **$10562.71** | $410.38 | $152.33 | 178 | 55% | $207.35 | 15 |
| mid_momentum | **$10398.73** | $630.98 | $-232.25 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10225.52** | $33.14 | $192.38 | 366 | 52% | $-1295.43 | 19 |
| mm_cheap | **$10087.32** | $704.44 | $-617.12 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10082.11** | $-406.82 | $488.93 | 349 | 51% | $-1256.82 | 25 |
| strong_dip | **$10004.21** | $-393.8 | $398.01 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9959.14** | $117.48 | $-158.34 | 102 | 96% | $106.74 | 25 |
| super | **$9704.72** | $-245.84 | $-49.44 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9410.95** | $-487.64 | $-101.41 | 6 | 17% | $-500 | 3 |
| mm_max | **$9329.86** | $-660.83 | $-9.31 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9063.05** | $-665.29 | $-271.66 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8864.92** | $-882.32 | $-252.76 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8560.76** | $-933.53 | $-505.71 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8207.99** | $-1139.53 | $-652.48 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7243.47** | $-2453.31 | $-303.22 | 367 | 47% | $-2788.09 | 19 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9043.58** | $-1003.53 | $47.11 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8279.96** | $-1837.09 | $117.05 | 145 | 26% | $-3864.75 | 2 |
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
