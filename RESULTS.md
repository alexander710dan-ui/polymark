# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25536 · Last run: 2026-08-03T04:14:25.525Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11086.66** | $1059.56 | $27.1 | 263 | 57% | $856.53 | 10 |
| mid_momentum | **$10534.62** | $665.42 | $-130.8 | 185 | 57% | $451.94 | 25 |
| copy_pro | **$10376.65** | $-334.75 | $711.4 | 362 | 51% | $-1184.75 | 25 |
| mm_tight | **$10353.69** | $391.8 | $-38.11 | 225 | 53% | $188.77 | 7 |
| mm_cheap | **$10266.69** | $789.63 | $-522.94 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9977.86** | $-337.42 | $315.28 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9932.34** | $34.52 | $-102.18 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9880.02** | $-352.22 | $232.24 | 379 | 51% | $-1680.79 | 23 |
| super | **$9588.66** | $-445.84 | $34.5 | 63 | 46% | $-661.69 | 11 |
| mm_max | **$9463.79** | $-475.72 | $-60.49 | 73 | 52% | $-593.11 | 3 |
| ai_judge | **$9396.68** | $-487.64 | $-115.68 | 6 | 17% | $-500 | 3 |
| random_control | **$9275.83** | $-310.74 | $-413.43 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8870.72** | $-882.32 | $-246.96 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8612.68** | $-1133.53 | $-253.79 | 64 | 45% | $-1337.48 | 25 |
| momentum | **$8204.62** | $-1339.53 | $-455.85 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7115.41** | $-2101.81 | $-782.78 | 380 | 48% | $-2456.36 | 23 |
| copy_month (retired) | **$9389.01** | $-777.42 | $166.43 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.78** | $-1003.53 | $31.31 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8366.37** | $-1837.09 | $203.46 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.03** | $-4691.55 | $-205.42 | 81 | 2% | $-6591.55 | 3 |

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
