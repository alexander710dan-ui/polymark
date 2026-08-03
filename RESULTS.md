# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27155 · Last run: 2026-08-03T19:15:13.784Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11641.52** | $1699.01 | $-57.49 | 290 | 57% | $1495.98 | 22 |
| mm_tight | **$10774.82** | $697.19 | $77.63 | 250 | 53% | $494.16 | 17 |
| mm_cheap | **$10379.76** | $832.49 | $-452.73 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10361.58** | $506.38 | $-144.8 | 188 | 57% | $292.9 | 25 |
| maker_flat | **$10013.45** | $3.72 | $9.73 | 8 | 50% | $-123.55 | 7 |
| strong_dip | **$9981.81** | $-337.42 | $319.23 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9959.47** | $34.52 | $-75.05 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9877.66** | $-217.21 | $94.87 | 88 | 51% | $-334.6 | 11 |
| maker_sports | **$9847.42** | $128.22 | $-280.8 | 11 | 55% | $0.95 | 8 |
| super | **$9628.05** | $-445.84 | $73.89 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9597.13** | $-834.75 | $431.88 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9420.78** | $-666.45 | $87.23 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9301.01** | $-310.74 | $-388.25 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8997.52** | $-821.03 | $-181.45 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8801.66** | $-1140.85 | $-57.49 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8164.18** | $-1389.71 | $-446.11 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7896.32** | $-1683.64 | $-420.04 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9393.18** | $-777.42 | $170.6 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.66** | $-1003.53 | $33.19 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.28** | $-4691.55 | $-207.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 15 | 15 | 4 | 50% | 2.67¢ |
| maker_sports | 19 | 10 | 4 | 66% | 1.95¢ |

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
