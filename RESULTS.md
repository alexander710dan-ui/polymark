# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23998 · Last run: 2026-08-02T15:05:27.573Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10747.05** | $823.38 | $-76.33 | 215 | 58% | $620.35 | 20 |
| mm_tight | **$10516.27** | $598.14 | $-81.87 | 186 | 55% | $395.11 | 16 |
| mid_momentum | **$10388.22** | $630.98 | $-242.76 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10169.11** | $150.53 | $18.58 | 367 | 52% | $-1178.04 | 21 |
| mm_cheap | **$10113.88** | $704.44 | $-590.56 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$10010.11** | $-393.8 | $403.91 | 94 | 60% | $-486.11 | 25 |
| copy_pro | **$9989.76** | $-192.45 | $182.21 | 352 | 51% | $-1042.45 | 25 |
| fade_longshot | **$9963.84** | $117.48 | $-153.64 | 102 | 96% | $106.74 | 25 |
| super | **$9689.73** | $-245.84 | $-64.43 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9403.9** | $-487.64 | $-108.46 | 6 | 17% | $-500 | 3 |
| mm_max | **$9385.01** | $-613.77 | $-1.22 | 59 | 51% | $-731.16 | 1 |
| random_control | **$9260.53** | $-665.29 | $-74.18 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8874.75** | $-882.32 | $-242.93 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8597.13** | $-933.53 | $-469.34 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8216.51** | $-1139.53 | $-643.96 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7340.72** | $-2553.31 | $-105.97 | 368 | 47% | $-2888.09 | 21 |
| copy_month (retired) | **$9384.77** | $-777.42 | $162.19 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9040.73** | $-1003.53 | $44.26 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8299.83** | $-1837.09 | $136.92 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5101.12** | $-4691.55 | $-207.33 | 81 | 2% | $-6591.55 | 3 |

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
