# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29284 · Last run: 2026-08-04T14:59:48.086Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11182.29** | $1195.01 | $-12.72 | 357 | 56% | $991.98 | 21 |
| mm_tight | **$10696.99** | $777.94 | $-80.95 | 309 | 54% | $574.91 | 13 |
| mm_cheap | **$10614.2** | $1054.47 | $-440.27 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10539.33** | $862.6 | $-323.27 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9913.12** | $-234.12 | $147.24 | 398 | 52% | $-1562.69 | 25 |
| fade_longshot | **$9894.48** | $55.61 | $-161.13 | 108 | 95% | $44.87 | 25 |
| super | **$9810.37** | $-507.95 | $318.32 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9730.36** | $-881.58 | $611.94 | 377 | 51% | $-1731.58 | 25 |
| strong_dip | **$9695.33** | $-463.45 | $158.78 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9692.36** | $-214.96 | $-92.68 | 39 | 46% | $-392.74 | 14 |
| mm_max | **$9614.88** | $-303.75 | $-81.37 | 132 | 52% | $-470.87 | 1 |
| ai_judge | **$9416.89** | $-587.64 | $4.53 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9270.88** | $-701.56 | $-27.56 | 65 | 48% | $-887.27 | 11 |
| mm_slow | **$9184.42** | $-468.35 | $-347.23 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9126.08** | $-561.85 | $-312.07 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8681.16** | $-920.12 | $-398.72 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8219.95** | $-1041.81 | $-738.24 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7326.49** | $-2262.55 | $-410.96 | 399 | 48% | $-2617.1 | 25 |
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
