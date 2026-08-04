# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28673 · Last run: 2026-08-04T09:19:49.352Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11076.91** | $1115.92 | $-39.01 | 344 | 56% | $912.89 | 13 |
| mm_tight | **$10766.48** | $789.14 | $-22.66 | 299 | 54% | $586.11 | 8 |
| mm_cheap | **$10565.47** | $1054.47 | $-489 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10426.8** | $862.6 | $-435.8 | 201 | 58% | $649.12 | 25 |
| fade_longshot | **$9972.37** | $55.61 | $-83.24 | 108 | 95% | $44.87 | 25 |
| copy_top | **$9972.24** | $-129.92 | $102.16 | 397 | 52% | $-1458.49 | 25 |
| maker_flat | **$9848.54** | $-12.95 | $-138.51 | 29 | 48% | $-190.73 | 11 |
| strong_dip | **$9773.55** | $-463.45 | $237 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9648.72** | $-725.28 | $374 | 376 | 51% | $-1575.28 | 25 |
| super | **$9640.63** | $-353.9 | $-5.47 | 64 | 47% | $-569.75 | 14 |
| mm_max | **$9450.4** | $-482.6 | $-67 | 124 | 52% | $-602.07 | 1 |
| ai_judge | **$9417.32** | $-587.64 | $4.96 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9382.1** | $-538.86 | $-79.04 | 55 | 49% | $-724.57 | 5 |
| mm_slow | **$9149.04** | $-468.35 | $-382.61 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8913.81** | $-561.85 | $-524.34 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8590.8** | $-920.12 | $-489.08 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8286.69** | $-1041.81 | $-671.5 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7174.48** | $-2279.45 | $-546.07 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9390.48** | $-730.36 | $120.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9034.5** | $-942.24 | $-23.26 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8326.25** | $-1937.09 | $263.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5095.91** | $-4691.55 | $-212.54 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 40 | 29 | 2 | 58% | 3.02¢ |
| maker_sports | 60 | 37 | 4 | 62% | 1.57¢ |

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
