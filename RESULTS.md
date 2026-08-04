# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28840 · Last run: 2026-08-04T10:52:42.809Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10974.47** | $1083.73 | $-109.26 | 346 | 56% | $880.7 | 16 |
| mm_cheap | **$10594.04** | $1054.47 | $-460.43 | 30 | 73% | $876.69 | 25 |
| mm_tight | **$10534.56** | $686.64 | $-152.08 | 300 | 54% | $483.61 | 9 |
| mid_momentum | **$10470.8** | $862.6 | $-391.8 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9997.62** | $-129.92 | $127.54 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9964.7** | $55.61 | $-90.91 | 108 | 95% | $44.87 | 25 |
| maker_flat | **$9816.19** | $-112.95 | $-70.86 | 30 | 47% | $-290.73 | 14 |
| strong_dip | **$9748.2** | $-463.45 | $211.65 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9710.67** | $-725.28 | $435.95 | 376 | 51% | $-1575.28 | 25 |
| super | **$9621.03** | $-353.9 | $-25.07 | 64 | 47% | $-569.75 | 15 |
| mm_max | **$9413.94** | $-585.1 | $-0.96 | 125 | 51% | $-704.57 | 1 |
| ai_judge | **$9408.43** | $-587.64 | $-3.93 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9230.47** | $-638.86 | $-130.67 | 56 | 48% | $-824.57 | 10 |
| mm_slow | **$9173.21** | $-468.35 | $-358.44 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8948.61** | $-561.85 | $-489.54 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8605.05** | $-920.12 | $-474.83 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8304.46** | $-1041.81 | $-653.73 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7169.98** | $-2279.45 | $-550.57 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9396.03** | $-730.36 | $126.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9029.92** | $-942.24 | $-27.84 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8352.91** | $-1937.09 | $290 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.91** | $-4691.55 | $-212.54 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 44 | 30 | 0 | 59% | 3.04¢ |
| maker_sports | 66 | 38 | 2 | 63% | 1.61¢ |

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
