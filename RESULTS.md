# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27385 · Last run: 2026-08-03T21:23:08.804Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11574.18** | $1777.05 | $-202.87 | 299 | 58% | $1574.02 | 24 |
| mm_tight | **$10805.71** | $791.89 | $13.82 | 259 | 54% | $588.86 | 18 |
| mid_momentum | **$10406.19** | $627.06 | $-220.87 | 190 | 57% | $413.58 | 25 |
| mm_cheap | **$10383.43** | $893.78 | $-510.35 | 25 | 72% | $716 | 25 |
| strong_dip | **$10008.87** | $-337.42 | $346.29 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9950.66** | $34.52 | $-83.86 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9819.36** | $-84.13 | $-96.51 | 95 | 53% | $-203.6 | 11 |
| maker_flat | **$9737** | $-103.97 | $-159.03 | 11 | 45% | $-231.24 | 9 |
| maker_sports | **$9689.37** | $-270.87 | $-39.76 | 18 | 44% | $-398.14 | 12 |
| super | **$9670.94** | $-353.9 | $24.84 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9609.74** | $-982.82 | $592.56 | 367 | 51% | $-1832.82 | 24 |
| copy_top | **$9457.35** | $-699.78 | $157.13 | 387 | 51% | $-2028.35 | 25 |
| ai_judge | **$9406.59** | $-487.64 | $-105.77 | 6 | 17% | $-500 | 3 |
| random_control | **$9266.22** | $-310.74 | $-423.04 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8952.76** | $-762.3 | $-284.94 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8797.49** | $-1021.38 | $-181.13 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8172.42** | $-1365.71 | $-461.87 | 238 | 67% | $-1853.95 | 25 |
| whale_fade | **$7692.45** | $-1605.86 | $-701.69 | 388 | 48% | $-1960.41 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.02** | $-1003.53 | $32.55 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8359.71** | $-1837.09 | $196.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.16** | $-4691.55 | $-202.29 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 20 | 18 | 2 | 53% | 3.02¢ |
| maker_sports | 30 | 16 | 3 | 65% | 1.77¢ |

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
