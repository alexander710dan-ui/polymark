# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29167 · Last run: 2026-08-04T13:54:39.339Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10864.17** | $909.31 | $-45.14 | 350 | 56% | $706.28 | 22 |
| mm_cheap | **$10634.52** | $1054.47 | $-419.95 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10517.48** | $862.6 | $-345.12 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10406.03** | $481.39 | $-75.36 | 302 | 53% | $278.36 | 16 |
| copy_top | **$9936.27** | $-129.92 | $66.19 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9886.77** | $55.61 | $-168.84 | 108 | 95% | $44.87 | 25 |
| super | **$9812.5** | $-507.95 | $320.45 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9723.41** | $-725.28 | $448.69 | 376 | 51% | $-1575.28 | 25 |
| maker_flat | **$9673.72** | $-370.45 | $44.17 | 36 | 44% | $-548.23 | 14 |
| strong_dip | **$9670.74** | $-463.45 | $134.19 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9416.97** | $-587.64 | $4.61 | 7 | 14% | $-600 | 2 |
| mm_max | **$9321.28** | $-687.5 | $8.78 | 126 | 51% | $-806.97 | 4 |
| mm_slow | **$9202.81** | $-468.35 | $-328.84 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9094.29** | $-800.33 | $-105.38 | 60 | 47% | $-986.04 | 13 |
| random_control | **$9092.96** | $-561.85 | $-345.19 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8684.81** | $-920.12 | $-395.07 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8220.09** | $-1041.81 | $-738.1 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7342.79** | $-2279.45 | $-377.76 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9014.2** | $-942.24 | $-43.56 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8419.58** | $-1937.09 | $356.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 50 | 32 | 4 | 61% | 3.04¢ |
| maker_sports | 73 | 42 | 5 | 63% | 1.58¢ |

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
