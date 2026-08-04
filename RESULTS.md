# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29286 · Last run: 2026-08-04T15:00:47.069Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11177.54** | $1242.41 | $-64.87 | 360 | 56% | $1039.38 | 18 |
| mm_tight | **$10693.91** | $773.24 | $-79.33 | 311 | 54% | $570.21 | 11 |
| mm_cheap | **$10615.84** | $1054.47 | $-438.63 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10539.23** | $862.6 | $-323.37 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9909.69** | $-336.57 | $246.26 | 399 | 52% | $-1665.14 | 25 |
| fade_longshot | **$9893.93** | $55.61 | $-161.68 | 108 | 95% | $44.87 | 25 |
| super | **$9798.49** | $-439.2 | $237.69 | 68 | 47% | $-655.05 | 11 |
| copy_pro | **$9730.36** | $-881.58 | $611.94 | 377 | 51% | $-1731.58 | 25 |
| strong_dip | **$9694.93** | $-463.45 | $158.38 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9693.02** | $-214.96 | $-92.02 | 39 | 46% | $-392.74 | 14 |
| mm_max | **$9614.88** | $-303.75 | $-81.37 | 132 | 52% | $-470.87 | 1 |
| ai_judge | **$9416.89** | $-587.64 | $4.53 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9270.97** | $-641.23 | $-87.8 | 68 | 49% | $-826.94 | 8 |
| mm_slow | **$9185.39** | $-468.35 | $-346.26 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9126.08** | $-561.85 | $-312.07 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8671.94** | $-924.82 | $-403.24 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8219.73** | $-1041.81 | $-738.46 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7322.95** | $-2165.05 | $-512 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9008.95** | $-942.24 | $-48.81 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8442.91** | $-1937.09 | $380 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 53 | 34 | 5 | 61% | 3¢ |
| maker_sports | 76 | 45 | 6 | 63% | 1.56¢ |

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
