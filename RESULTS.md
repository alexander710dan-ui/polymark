# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27293 · Last run: 2026-08-03T20:31:58.623Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11740.75** | $1816.82 | $-76.07 | 294 | 57% | $1613.79 | 24 |
| mm_tight | **$10998.89** | $815 | $183.89 | 254 | 54% | $611.97 | 19 |
| mid_momentum | **$10410.09** | $627.06 | $-216.97 | 190 | 57% | $413.58 | 25 |
| mm_cheap | **$10384.7** | $893.78 | $-509.08 | 25 | 72% | $716 | 25 |
| strong_dip | **$10001.67** | $-337.42 | $339.09 | 96 | 60% | $-429.73 | 25 |
| mm_max | **$9991.89** | $-99.4 | $91.29 | 92 | 52% | $-218.87 | 12 |
| fade_longshot | **$9948.42** | $34.52 | $-86.1 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9890.53** | $129.13 | $-238.6 | 14 | 57% | $1.86 | 12 |
| maker_flat | **$9811.53** | $-3.97 | $-184.5 | 10 | 50% | $-131.24 | 9 |
| super | **$9666.49** | $-353.9 | $20.39 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9612.56** | $-776.02 | $388.58 | 366 | 51% | $-1626.02 | 24 |
| copy_top | **$9469.88** | $-699.78 | $169.66 | 387 | 51% | $-2028.35 | 23 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9273.16** | $-310.74 | $-416.1 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8958.17** | $-762.3 | $-279.53 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8811.41** | $-1021.38 | $-167.21 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8158.35** | $-1365.71 | $-475.94 | 238 | 67% | $-1853.95 | 25 |
| whale_fade | **$7733.96** | $-1605.86 | $-660.18 | 388 | 48% | $-1960.41 | 23 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.19** | $-1003.53 | $33.72 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.28** | $-4691.55 | $-199.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 19 | 18 | 2 | 51% | 2.87¢ |
| maker_sports | 26 | 14 | 4 | 65% | 1.81¢ |

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
