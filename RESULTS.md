# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29226 · Last run: 2026-08-04T14:27:28.089Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11292.91** | $850.99 | $441.92 | 352 | 56% | $647.96 | 21 |
| mm_tight | **$10827.87** | $423.07 | $404.8 | 304 | 53% | $220.04 | 16 |
| mm_cheap | **$10633.41** | $1054.47 | $-421.06 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10538.3** | $862.6 | $-324.3 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9938.08** | $-129.92 | $68 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9884.63** | $55.61 | $-170.98 | 108 | 95% | $44.87 | 25 |
| super | **$9830.25** | $-507.95 | $338.2 | 65 | 46% | $-723.8 | 14 |
| maker_flat | **$9826.48** | $-370.45 | $196.93 | 36 | 44% | $-548.23 | 16 |
| mm_max | **$9733.53** | $-745.82 | $479.35 | 128 | 51% | $-865.29 | 5 |
| copy_pro | **$9724.99** | $-725.28 | $450.27 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9681.4** | $-463.45 | $144.85 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9409.28** | $-587.64 | $-3.08 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9362.39** | $-900.33 | $262.72 | 61 | 46% | $-1086.04 | 13 |
| mm_slow | **$9199.63** | $-468.35 | $-332.02 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9100.92** | $-561.85 | $-337.23 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8689.07** | $-920.12 | $-390.81 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8199.32** | $-1041.81 | $-758.87 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7329.62** | $-2279.45 | $-390.93 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9015.34** | $-942.24 | $-42.42 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8419.58** | $-1937.09 | $356.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 52 | 34 | 4 | 60% | 3.02¢ |
| maker_sports | 74 | 44 | 4 | 63% | 1.57¢ |

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
