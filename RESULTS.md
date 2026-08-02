# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23060 · Last run: 2026-08-02T07:15:15.928Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10558.47** | $630.98 | $-72.51 | 181 | 57% | $417.5 | 25 |
| mm_sports | **$10509.1** | $515.79 | $-6.69 | 205 | 58% | $312.76 | 5 |
| mm_tight | **$10360.07** | $367.52 | $-7.45 | 177 | 55% | $164.49 | 4 |
| mm_cheap | **$10227.11** | $704.44 | $-477.33 | 21 | 71% | $526.66 | 25 |
| copy_top | **$10163.23** | $33.14 | $130.09 | 366 | 52% | $-1295.43 | 14 |
| copy_pro | **$10073.09** | $-406.82 | $479.91 | 349 | 51% | $-1256.82 | 21 |
| fade_longshot | **$9954.56** | $117.48 | $-162.92 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9886.23** | $-393.8 | $280.03 | 94 | 60% | $-486.11 | 25 |
| super | **$9793.01** | $-245.84 | $38.85 | 62 | 47% | $-461.69 | 9 |
| ai_judge | **$9400.48** | $-487.64 | $-111.88 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.95** | $-660.83 | $-1.22 | 58 | 50% | $-778.22 | 1 |
| random_control | **$8946.01** | $-665.29 | $-388.7 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8926.64** | $-882.32 | $-191.04 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8647.46** | $-933.53 | $-419.01 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8221.69** | $-1139.53 | $-638.78 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7204.3** | $-2453.31 | $-342.39 | 367 | 47% | $-2788.09 | 14 |
| copy_month (retired) | **$9393.11** | $-777.42 | $170.53 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.12** | $-1003.53 | $36.65 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.17** | $-1837.09 | $170.26 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5108.49** | $-4691.55 | $-199.96 | 81 | 2% | $-6591.55 | 3 |

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
