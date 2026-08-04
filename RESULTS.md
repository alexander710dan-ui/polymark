# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29684 · Last run: 2026-08-04T18:42:15.618Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11283.77** | $1648.86 | $-365.09 | 374 | 57% | $1429.73 | 23 |
| mm_tight | **$10773.77** | $840.59 | $-66.82 | 324 | 54% | $637.56 | 17 |
| mm_cheap | **$10575.49** | $1054.47 | $-478.98 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10500.83** | $862.6 | $-361.77 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10025.87** | $-193.36 | $219.23 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10016.48** | $-592.99 | $609.47 | 380 | 51% | $-1442.99 | 25 |
| fade_longshot | **$9895.99** | $55.61 | $-159.62 | 108 | 95% | $44.87 | 25 |
| super | **$9717.71** | $-439.2 | $156.91 | 68 | 47% | $-655.05 | 14 |
| strong_dip | **$9697.14** | $-463.45 | $160.59 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9614.04** | $-289.94 | $-96.02 | 140 | 53% | $-457.06 | 4 |
| maker_flat | **$9516.7** | $-208.2 | $-275.1 | 47 | 47% | $-385.98 | 19 |
| ai_judge | **$9406.89** | $-587.64 | $-5.47 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9128.39** | $-468.35 | $-403.26 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9116.28** | $-661.85 | $-221.87 | 129 | 57% | $-1276.14 | 25 |
| maker_sports | **$9034.9** | $-653.19 | $-311.91 | 80 | 50% | $-838.9 | 10 |
| mm_strong | **$8704.67** | $-924.82 | $-370.51 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8210.37** | $-1041.81 | $-747.82 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7104.63** | $-2370.75 | $-524.62 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9405.75** | $-730.36 | $136.11 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.37** | $-942.24 | $-53.39 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8472.91** | $-1937.09 | $410 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5100.24** | $-4691.55 | $-208.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 66 | 41 | 1 | 62% | 2.97¢ |
| maker_sports | 90 | 55 | 5 | 62% | 1.57¢ |

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
