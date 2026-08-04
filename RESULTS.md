# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29174 · Last run: 2026-08-04T13:58:32.478Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10863.82** | $807.61 | $56.21 | 351 | 56% | $604.58 | 21 |
| mm_cheap | **$10640.22** | $1054.47 | $-414.25 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10525.13** | $862.6 | $-337.47 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10387.3** | $379.69 | $7.61 | 303 | 53% | $176.66 | 16 |
| copy_top | **$9932.73** | $-129.92 | $62.65 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9886.83** | $55.61 | $-168.78 | 108 | 95% | $44.87 | 25 |
| super | **$9807.65** | $-507.95 | $315.6 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9722.17** | $-725.28 | $447.45 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9669.01** | $-463.45 | $132.46 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9655.15** | $-370.45 | $25.6 | 36 | 44% | $-548.23 | 15 |
| ai_judge | **$9409.28** | $-587.64 | $-3.08 | 7 | 14% | $-600 | 2 |
| mm_max | **$9315.82** | $-789.2 | $105.02 | 127 | 50% | $-908.67 | 4 |
| mm_slow | **$9210.18** | $-468.35 | $-321.47 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9102.65** | $-561.85 | $-335.5 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$9095.68** | $-900.33 | $-3.99 | 61 | 46% | $-1086.04 | 12 |
| mm_strong | **$8692.91** | $-920.12 | $-386.97 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8213.26** | $-1041.81 | $-744.93 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7357.17** | $-2279.45 | $-363.38 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9015.34** | $-942.24 | $-42.42 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8419.58** | $-1937.09 | $356.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 51 | 32 | 4 | 61% | 3.04¢ |
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
