# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26394 · Last run: 2026-08-03T12:12:54.589Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11236.66** | $1164.93 | $71.73 | 269 | 57% | $961.9 | 21 |
| mm_tight | **$10485.32** | $443.32 | $42 | 230 | 53% | $240.29 | 15 |
| mid_momentum | **$10394.06** | $708.28 | $-314.22 | 186 | 58% | $494.8 | 25 |
| mm_cheap | **$10263.55** | $832.49 | $-568.94 | 24 | 71% | $654.71 | 25 |
| copy_pro | **$10177.77** | $-334.75 | $512.52 | 362 | 51% | $-1184.75 | 25 |
| strong_dip | **$9999.91** | $-337.42 | $337.33 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9959.19** | $34.52 | $-75.33 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9811.22** | $-266.45 | $77.67 | 381 | 52% | $-1595.02 | 25 |
| super | **$9550.31** | $-445.84 | $-3.85 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9457.55** | $-475.72 | $-66.73 | 77 | 49% | $-593.11 | 8 |
| ai_judge | **$9406.59** | $-487.64 | $-105.77 | 6 | 17% | $-500 | 3 |
| random_control | **$9270.42** | $-310.74 | $-418.84 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8855.94** | $-821.03 | $-323.03 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8590.39** | $-1233.53 | $-176.08 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8227.83** | $-1339.53 | $-432.64 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7115.53** | $-2301.81 | $-582.66 | 382 | 48% | $-2656.36 | 25 |
| copy_month (retired) | **$9393.18** | $-777.42 | $170.6 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9028.54** | $-1003.53 | $32.07 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8359.71** | $-1837.09 | $196.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5100.07** | $-4691.55 | $-208.38 | 81 | 2% | $-6591.55 | 3 |

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
