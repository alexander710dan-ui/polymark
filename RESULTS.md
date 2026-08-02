# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24704 · Last run: 2026-08-02T21:14:22.495Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10913.11** | $773.99 | $139.12 | 235 | 57% | $570.96 | 25 |
| copy_pro | **$10677.84** | $-592.45 | $1270.29 | 354 | 51% | $-1442.45 | 25 |
| mid_momentum | **$10518.99** | $630.98 | $-111.99 | 181 | 57% | $417.5 | 25 |
| mm_cheap | **$10254.2** | $704.44 | $-450.24 | 21 | 71% | $526.66 | 25 |
| mm_tight | **$10251.55** | $376 | $-124.45 | 202 | 54% | $172.97 | 19 |
| copy_top | **$10228.37** | $111.62 | $116.75 | 371 | 52% | $-1216.95 | 23 |
| strong_dip | **$9960.16** | $-393.8 | $353.96 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9955.07** | $117.48 | $-162.41 | 102 | 96% | $106.74 | 25 |
| super | **$9713.06** | $-245.84 | $-41.1 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9585.38** | $-479.33 | $64.71 | 64 | 53% | $-596.72 | 7 |
| ai_judge | **$9409.37** | $-487.64 | $-102.99 | 6 | 17% | $-500 | 3 |
| random_control | **$9238.71** | $-310.74 | $-450.55 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8926.41** | $-882.32 | $-191.27 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8619.69** | $-933.53 | $-446.78 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8244.86** | $-1139.53 | $-615.61 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7086.76** | $-2290.43 | $-622.81 | 372 | 47% | $-2644.98 | 23 |
| copy_month (retired) | **$9380.61** | $-777.42 | $158.03 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9039.61** | $-1003.53 | $43.14 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.5** | $-1837.09 | $143.59 | 145 | 26% | $-3864.75 | 2 |
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
