# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28977 · Last run: 2026-08-04T12:08:56.056Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10628.54** | $1012.01 | $-383.47 | 349 | 56% | $808.98 | 16 |
| mm_cheap | **$10616.73** | $1054.47 | $-437.74 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10483.9** | $862.6 | $-378.7 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10451.96** | $584.09 | $-132.13 | 301 | 53% | $381.06 | 11 |
| copy_top | **$10045.62** | $-129.92 | $175.54 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9930.42** | $55.61 | $-125.19 | 108 | 95% | $44.87 | 25 |
| copy_pro | **$9711.33** | $-725.28 | $436.61 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9705.58** | $-463.45 | $169.03 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9666.24** | $-149.02 | $-184.74 | 32 | 47% | $-326.8 | 14 |
| super | **$9478.77** | $-353.9 | $-167.33 | 64 | 47% | $-569.75 | 15 |
| ai_judge | **$9423.73** | $-587.64 | $11.37 | 7 | 14% | $-600 | 2 |
| mm_max | **$9315** | $-585.1 | $-99.9 | 125 | 51% | $-704.57 | 1 |
| mm_slow | **$9158.61** | $-468.35 | $-373.04 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8997.76** | $-561.85 | $-440.39 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$8884.48** | $-700.33 | $-415.19 | 59 | 47% | $-886.04 | 10 |
| mm_strong | **$8597.95** | $-920.12 | $-481.93 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8285.69** | $-1041.81 | $-672.5 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7159.69** | $-2279.45 | $-560.86 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9398.81** | $-730.36 | $129.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9022.51** | $-942.24 | $-35.25 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8376.25** | $-1937.09 | $313.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.12** | $-4691.55 | $-207.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 46 | 30 | 2 | 61% | 3.03¢ |
| maker_sports | 69 | 40 | 2 | 63% | 1.61¢ |

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
