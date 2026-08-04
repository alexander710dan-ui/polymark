# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29522 · Last run: 2026-08-04T17:12:08.030Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11300.74** | $1108.57 | $192.17 | 363 | 56% | $905.54 | 24 |
| mm_tight | **$10836.11** | $638.7 | $197.41 | 314 | 54% | $435.67 | 19 |
| mm_cheap | **$10620.28** | $1054.47 | $-434.19 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10551.86** | $862.6 | $-310.74 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10031.28** | $-250.24 | $281.52 | 400 | 52% | $-1578.81 | 25 |
| copy_pro | **$10013.94** | $-752.09 | $766.03 | 378 | 51% | $-1602.09 | 25 |
| mm_max | **$9908.75** | $-362.82 | $271.57 | 134 | 52% | $-529.94 | 6 |
| fade_longshot | **$9893.95** | $55.61 | $-161.66 | 108 | 95% | $44.87 | 25 |
| super | **$9811.68** | $-439.2 | $250.88 | 68 | 47% | $-655.05 | 12 |
| strong_dip | **$9702.88** | $-463.45 | $166.33 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9394.75** | $-587.64 | $-17.61 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9355.18** | $-520.62 | $-124.2 | 43 | 42% | $-698.4 | 18 |
| random_control | **$9168.36** | $-561.85 | $-269.79 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9161.7** | $-468.35 | $-369.95 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9027.24** | $-765.79 | $-206.97 | 71 | 48% | $-951.5 | 15 |
| mm_strong | **$8707.28** | $-924.82 | $-367.9 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8206.82** | $-1041.81 | $-751.37 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7103.76** | $-2267.65 | $-628.59 | 401 | 48% | $-2622.2 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.15** | $-942.24 | $-54.61 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 61 | 39 | 2 | 61% | 2.95¢ |
| maker_sports | 86 | 52 | 3 | 62% | 1.54¢ |

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
