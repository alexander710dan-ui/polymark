# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28898 · Last run: 2026-08-04T11:25:05.609Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10798.79** | $1083.73 | $-284.94 | 346 | 56% | $880.7 | 17 |
| mm_cheap | **$10612.26** | $1054.47 | $-442.21 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10464.32** | $862.6 | $-398.28 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10410.62** | $686.64 | $-276.02 | 300 | 54% | $483.61 | 9 |
| copy_top | **$10067.89** | $-129.92 | $197.81 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9955.95** | $55.61 | $-99.66 | 108 | 95% | $44.87 | 25 |
| copy_pro | **$9779.48** | $-725.28 | $504.76 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9734.76** | $-463.45 | $198.21 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9703.62** | $-112.95 | $-183.43 | 30 | 47% | $-290.73 | 14 |
| super | **$9430.78** | $-353.9 | $-215.32 | 64 | 47% | $-569.75 | 15 |
| ai_judge | **$9413.9** | $-587.64 | $1.54 | 7 | 14% | $-600 | 2 |
| mm_max | **$9333.17** | $-585.1 | $-81.73 | 125 | 51% | $-704.57 | 1 |
| mm_slow | **$9157.01** | $-468.35 | $-374.64 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9048.3** | $-638.86 | $-312.84 | 56 | 48% | $-824.57 | 10 |
| random_control | **$8958.47** | $-561.85 | $-479.68 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8580.13** | $-920.12 | $-499.75 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8296.6** | $-1041.81 | $-661.59 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7142.5** | $-2279.45 | $-578.05 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9396.03** | $-730.36 | $126.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9027.6** | $-942.24 | $-30.16 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8359.58** | $-1937.09 | $296.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5100.07** | $-4691.55 | $-208.38 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 44 | 30 | 0 | 59% | 3.04¢ |
| maker_sports | 66 | 40 | 2 | 62% | 1.61¢ |

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
