# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24618 · Last run: 2026-08-02T20:30:24.900Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10822.24** | $754.53 | $67.71 | 230 | 57% | $551.5 | 25 |
| mid_momentum | **$10513.18** | $630.98 | $-117.8 | 181 | 57% | $417.5 | 25 |
| copy_pro | **$10412.71** | $-592.45 | $1005.16 | 354 | 51% | $-1442.45 | 24 |
| copy_top | **$10373.71** | $211.62 | $162.09 | 370 | 52% | $-1116.95 | 24 |
| mm_cheap | **$10255.52** | $704.44 | $-448.92 | 21 | 71% | $526.66 | 25 |
| mm_tight | **$10205.83** | $256.54 | $-50.71 | 198 | 54% | $53.51 | 18 |
| strong_dip | **$9966.55** | $-393.8 | $360.35 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9950.12** | $117.48 | $-167.36 | 102 | 96% | $106.74 | 25 |
| super | **$9712.27** | $-245.84 | $-41.89 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9526.99** | $-713.77 | $240.76 | 60 | 50% | $-831.16 | 9 |
| ai_judge | **$9408.73** | $-487.64 | $-103.63 | 6 | 17% | $-500 | 3 |
| random_control | **$9218.17** | $-310.74 | $-471.09 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8923.08** | $-882.32 | $-194.6 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8636.21** | $-933.53 | $-430.26 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8222.19** | $-1139.53 | $-638.28 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$6962.92** | $-2398.76 | $-638.32 | 371 | 47% | $-2753.31 | 24 |
| copy_month (retired) | **$9380.53** | $-777.42 | $157.95 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9044.19** | $-1003.53 | $47.72 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8286.63** | $-1837.09 | $123.72 | 145 | 26% | $-3864.75 | 2 |
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
