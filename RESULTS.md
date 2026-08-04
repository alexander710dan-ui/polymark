# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28429 · Last run: 2026-08-04T07:04:01.720Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11143.22** | $1115.92 | $27.3 | 344 | 56% | $912.89 | 8 |
| mm_tight | **$10849.87** | $789.14 | $60.73 | 299 | 54% | $586.11 | 5 |
| mm_cheap | **$10572.08** | $1054.47 | $-482.39 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10426.48** | $862.6 | $-436.12 | 201 | 58% | $649.12 | 25 |
| fade_longshot | **$9975.08** | $55.61 | $-80.53 | 108 | 95% | $44.87 | 25 |
| copy_top | **$9957.06** | $-129.92 | $86.98 | 397 | 52% | $-1458.49 | 25 |
| maker_flat | **$9944.55** | $-12.95 | $-42.5 | 29 | 48% | $-190.73 | 9 |
| strong_dip | **$9767.85** | $-463.45 | $231.3 | 99 | 60% | $-555.76 | 25 |
| super | **$9624.95** | $-353.9 | $-21.15 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9609.46** | $-725.28 | $334.74 | 376 | 51% | $-1575.28 | 25 |
| mm_max | **$9517.4** | $-482.6 | $0 | 124 | 52% | $-602.07 | 0 |
| maker_sports | **$9455.93** | $-538.86 | $-5.21 | 55 | 49% | $-724.57 | 1 |
| ai_judge | **$9423.98** | $-587.64 | $11.62 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9184.43** | $-468.35 | $-347.22 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8910.67** | $-561.85 | $-527.48 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8616.68** | $-920.12 | $-463.2 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8307.76** | $-1041.81 | $-650.43 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7231.92** | $-2279.45 | $-488.63 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9387.7** | $-730.36 | $118.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9038.03** | $-942.24 | $-19.73 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.25** | $-1937.09 | $243.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5086.53** | $-4691.55 | $-221.92 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 28 | 1 | 58% | 2.96¢ |
| maker_sports | 56 | 32 | 4 | 64% | 1.61¢ |

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
