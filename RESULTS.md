# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25926 · Last run: 2026-08-03T07:39:59.191Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11012.35** | $1111.08 | $-98.73 | 264 | 57% | $908.05 | 16 |
| mid_momentum | **$10472.42** | $708.28 | $-235.86 | 186 | 58% | $494.8 | 25 |
| mm_tight | **$10316.61** | $443.32 | $-126.71 | 226 | 54% | $240.29 | 11 |
| mm_cheap | **$10314.49** | $832.49 | $-518 | 24 | 71% | $654.71 | 25 |
| copy_pro | **$10267.11** | $-334.75 | $601.86 | 362 | 51% | $-1184.75 | 25 |
| strong_dip | **$9972.81** | $-337.42 | $310.23 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9943.84** | $34.52 | $-90.68 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9796.12** | $-335.94 | $132.06 | 380 | 52% | $-1664.51 | 24 |
| super | **$9546.29** | $-445.84 | $-7.87 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9457.93** | $-475.72 | $-66.35 | 73 | 52% | $-593.11 | 8 |
| ai_judge | **$9392.83** | $-487.64 | $-119.53 | 6 | 17% | $-500 | 3 |
| random_control | **$9270.76** | $-310.74 | $-418.5 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8907.11** | $-821.03 | $-271.86 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8609.11** | $-1233.53 | $-157.36 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8206.89** | $-1339.53 | $-453.58 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7143.91** | $-2201.81 | $-654.28 | 381 | 48% | $-2556.36 | 24 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9028.23** | $-1003.53 | $31.76 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8366.37** | $-1837.09 | $203.46 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.07** | $-4691.55 | $-204.38 | 81 | 2% | $-6591.55 | 3 |

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
