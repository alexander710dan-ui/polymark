# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27052 · Last run: 2026-08-03T18:17:52.946Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11463.97** | $1666.07 | $-202.1 | 286 | 57% | $1463.04 | 24 |
| mm_tight | **$10587.24** | $678.6 | $-91.36 | 246 | 53% | $475.57 | 19 |
| mid_momentum | **$10286.77** | $608.28 | $-321.51 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10284.5** | $832.49 | $-547.99 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$9995.08** | $-337.42 | $332.5 | 96 | 60% | $-429.73 | 25 |
| maker_flat | **$9981.85** | $-18.5 | $0.35 | 6 | 50% | $-145.77 | 6 |
| fade_longshot | **$9955.19** | $34.52 | $-79.33 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9856.41** | $210.83 | $-354.42 | 8 | 63% | $83.56 | 8 |
| mm_max | **$9637.1** | $-335.8 | $-27.1 | 85 | 51% | $-453.19 | 13 |
| copy_pro | **$9567.96** | $-834.75 | $402.71 | 365 | 51% | $-1684.75 | 25 |
| super | **$9564.68** | $-445.84 | $10.52 | 63 | 46% | $-661.69 | 12 |
| copy_top | **$9481.65** | $-666.45 | $148.1 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9403.26** | $-487.64 | $-109.1 | 6 | 17% | $-500 | 3 |
| random_control | **$9299.09** | $-310.74 | $-390.17 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8927.23** | $-821.03 | $-251.74 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8695.89** | $-1190.67 | $-113.44 | 66 | 45% | $-1394.62 | 25 |
| momentum | **$8146.72** | $-1439.53 | $-413.75 | 236 | 67% | $-1927.77 | 25 |
| whale_fade | **$7704.51** | $-1683.64 | $-611.85 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.13** | $-1003.53 | $30.66 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8369.71** | $-1837.09 | $206.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.32** | $-4691.55 | $-202.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 12 | 6 | 50% | 2.58¢ |
| maker_sports | 16 | 9 | 6 | 64% | 1.69¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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
