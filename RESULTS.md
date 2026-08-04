# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29361 · Last run: 2026-08-04T15:42:34.506Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11251.18** | $1242.41 | $8.77 | 360 | 56% | $1039.38 | 20 |
| mm_tight | **$10736.46** | $773.24 | $-36.78 | 311 | 54% | $570.21 | 13 |
| mm_cheap | **$10634.14** | $1054.47 | $-420.33 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10537.85** | $862.6 | $-324.75 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9946.19** | $-336.57 | $282.76 | 399 | 52% | $-1665.14 | 25 |
| fade_longshot | **$9888.09** | $55.61 | $-167.52 | 108 | 95% | $44.87 | 25 |
| super | **$9824.84** | $-439.2 | $264.04 | 68 | 47% | $-655.05 | 11 |
| copy_pro | **$9771.95** | $-881.58 | $653.53 | 377 | 51% | $-1731.58 | 25 |
| strong_dip | **$9682.05** | $-463.45 | $145.5 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9602.18** | $-303.75 | $-94.07 | 132 | 52% | $-470.87 | 2 |
| maker_flat | **$9555.42** | $-214.96 | $-229.62 | 39 | 46% | $-392.74 | 16 |
| ai_judge | **$9405.86** | $-587.64 | $-6.5 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9270.03** | $-641.23 | $-88.74 | 68 | 49% | $-826.94 | 9 |
| mm_slow | **$9196.74** | $-468.35 | $-334.91 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9155.96** | $-561.85 | $-282.19 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8693.59** | $-924.82 | $-381.59 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8199.35** | $-1041.81 | $-758.84 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7320.21** | $-2165.05 | $-514.74 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9008.32** | $-942.24 | $-49.44 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 55 | 37 | 3 | 60% | 2.96¢ |
| maker_sports | 77 | 46 | 6 | 63% | 1.55¢ |

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
