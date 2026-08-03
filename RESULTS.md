# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26103 · Last run: 2026-08-03T09:45:28.070Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11170.25** | $1111.08 | $59.17 | 267 | 57% | $908.05 | 21 |
| mm_tight | **$10450.53** | $443.32 | $7.21 | 229 | 53% | $240.29 | 13 |
| mid_momentum | **$10407.88** | $708.28 | $-300.4 | 186 | 58% | $494.8 | 25 |
| mm_cheap | **$10275.66** | $832.49 | $-556.83 | 24 | 71% | $654.71 | 25 |
| copy_pro | **$10200.52** | $-334.75 | $535.27 | 362 | 51% | $-1184.75 | 25 |
| strong_dip | **$9987.72** | $-337.42 | $325.14 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9948.75** | $34.52 | $-85.77 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9785.65** | $-335.94 | $121.59 | 380 | 52% | $-1664.51 | 25 |
| super | **$9551.29** | $-445.84 | $-2.87 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9449.05** | $-475.72 | $-75.23 | 76 | 50% | $-593.11 | 9 |
| ai_judge | **$9388.98** | $-487.64 | $-123.38 | 6 | 17% | $-500 | 3 |
| random_control | **$9260.27** | $-310.74 | $-428.99 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8873.69** | $-821.03 | $-305.28 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8600.61** | $-1233.53 | $-165.86 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8198.48** | $-1339.53 | $-461.99 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7121.31** | $-2201.81 | $-676.88 | 381 | 48% | $-2556.36 | 25 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.4** | $-1003.53 | $32.93 | 131 | 69% | $-1067.46 | 5 |
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
