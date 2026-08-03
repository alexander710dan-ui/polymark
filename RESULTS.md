# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26454 · Last run: 2026-08-03T12:44:37.586Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11301.25** | $1164.93 | $136.32 | 269 | 57% | $961.9 | 22 |
| mm_tight | **$10527.51** | $443.32 | $84.19 | 230 | 53% | $240.29 | 16 |
| mid_momentum | **$10408.24** | $708.28 | $-300.04 | 186 | 58% | $494.8 | 25 |
| mm_cheap | **$10259.94** | $832.49 | $-572.55 | 24 | 71% | $654.71 | 25 |
| copy_pro | **$10180.09** | $-334.75 | $514.84 | 362 | 51% | $-1184.75 | 25 |
| strong_dip | **$9997.45** | $-337.42 | $334.87 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9954.59** | $34.52 | $-79.93 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9776.18** | $-266.45 | $42.63 | 381 | 52% | $-1595.02 | 25 |
| super | **$9555.96** | $-445.84 | $1.8 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9455.91** | $-475.72 | $-68.37 | 77 | 49% | $-593.11 | 8 |
| ai_judge | **$9397.79** | $-487.64 | $-114.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9264.26** | $-310.74 | $-425 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8862.44** | $-821.03 | $-316.53 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8593.46** | $-1233.53 | $-173.01 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8208.54** | $-1339.53 | $-451.93 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7132.08** | $-2301.81 | $-566.11 | 382 | 48% | $-2656.36 | 25 |
| copy_month (retired) | **$9393.18** | $-777.42 | $170.6 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.09** | $-1003.53 | $32.62 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8363.04** | $-1837.09 | $200.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |

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
