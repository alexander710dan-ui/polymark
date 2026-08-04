# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28930 · Last run: 2026-08-04T11:42:44.462Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10787.37** | $1012.01 | $-224.64 | 349 | 56% | $808.98 | 15 |
| mm_cheap | **$10601.73** | $1054.47 | $-452.74 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10470.83** | $862.6 | $-391.77 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10384.41** | $584.09 | $-199.68 | 301 | 53% | $381.06 | 8 |
| copy_top | **$10053.32** | $-129.92 | $183.24 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9955.07** | $55.61 | $-100.54 | 108 | 95% | $44.87 | 25 |
| copy_pro | **$9785.69** | $-725.28 | $510.97 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9733.27** | $-463.45 | $196.72 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9655.96** | $-149.02 | $-195.02 | 32 | 47% | $-326.8 | 12 |
| super | **$9424.77** | $-353.9 | $-221.33 | 64 | 47% | $-569.75 | 15 |
| ai_judge | **$9413.9** | $-587.64 | $1.54 | 7 | 14% | $-600 | 2 |
| mm_max | **$9319.03** | $-585.1 | $-95.87 | 125 | 51% | $-704.57 | 1 |
| mm_slow | **$9162.35** | $-468.35 | $-369.3 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9028.53** | $-700.33 | $-271.14 | 59 | 47% | $-886.04 | 8 |
| random_control | **$8965.92** | $-561.85 | $-472.23 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8574.23** | $-920.12 | $-505.65 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8293.02** | $-1041.81 | $-665.17 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7163.97** | $-2279.45 | $-556.58 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9398.81** | $-730.36 | $129.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9027.72** | $-942.24 | $-30.04 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8359.58** | $-1937.09 | $296.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.03** | $-4691.55 | $-209.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 44 | 30 | 1 | 59% | 3.04¢ |
| maker_sports | 67 | 40 | 3 | 63% | 1.61¢ |

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
