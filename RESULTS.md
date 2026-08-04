# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29154 · Last run: 2026-08-04T13:47:22.688Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10849.36** | $909.31 | $-59.95 | 350 | 56% | $706.28 | 21 |
| mm_cheap | **$10611.53** | $1054.47 | $-442.94 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10497.15** | $862.6 | $-365.45 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10372.32** | $481.39 | $-109.07 | 302 | 53% | $278.36 | 14 |
| copy_top | **$9906.09** | $-129.92 | $36.01 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9902.37** | $55.61 | $-153.24 | 108 | 95% | $44.87 | 25 |
| super | **$9778.13** | $-507.95 | $286.08 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9695.27** | $-725.28 | $420.55 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9689.68** | $-463.45 | $153.13 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9634.22** | $-370.45 | $4.67 | 36 | 44% | $-548.23 | 12 |
| ai_judge | **$9416.97** | $-587.64 | $4.61 | 7 | 14% | $-600 | 2 |
| mm_max | **$9290.09** | $-687.5 | $-22.41 | 126 | 51% | $-806.97 | 3 |
| mm_slow | **$9184.28** | $-468.35 | $-347.37 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9127.38** | $-800.33 | $-72.29 | 60 | 47% | $-986.04 | 11 |
| random_control | **$9112.86** | $-561.85 | $-325.29 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8671.25** | $-920.12 | $-408.63 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8235.88** | $-1041.81 | $-722.31 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7342.15** | $-2279.45 | $-378.4 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9014.14** | $-942.24 | $-43.62 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8419.58** | $-1937.09 | $356.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 48 | 32 | 4 | 60% | 3.06¢ |
| maker_sports | 71 | 42 | 6 | 63% | 1.6¢ |

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
