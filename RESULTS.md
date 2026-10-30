# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 75345 · Last run: 2026-10-30T09:49:52.781Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11935.43** | $1750.5 | $184.93 | 464 | 53% | $900.5 | 25 |
| maker_sports | **$11254.06** | $1377.21 | $-123.15 | 40 | 70% | $1164.71 | 10 |
| mm_tight | **$11253.88** | $1237.21 | $16.67 | 501 | 54% | $1028.11 | 9 |
| mid_momentum | **$11034.44** | $766.55 | $267.89 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10665.74** | $519.74 | $146 | 97 | 58% | $337.28 | 25 |
| mm_max | **$10465.72** | $369.26 | $96.46 | 216 | 54% | $160.16 | 3 |
| copy_top | **$10289.39** | $212.62 | $76.77 | 480 | 54% | $-1115.95 | 23 |
| super | **$10230.7** | $87.83 | $142.87 | 95 | 53% | $-194.07 | 4 |
| mm_sports | **$10168.94** | $321.81 | $-152.87 | 594 | 55% | $102.68 | 11 |
| fade_longshot | **$10093.89** | $93.52 | $0.37 | 153 | 95% | $82.78 | 25 |
| conviction | **$10038.87** | $0 | $38.87 | 0 | — | $0 | 2 |
| maker_flat | **$9983.2** | $-204.96 | $188.16 | 15 | 47% | $-396.51 | 25 |
| mm_cheap_v2 | **$9816.1** | $-329.9 | $146 | 114 | 53% | $-520.72 | 25 |
| mid_momentum_v2 | **$9809.26** | $-458.63 | $267.89 | 109 | 51% | $-649.45 | 25 |
| mm_strong | **$9369.81** | $-602.98 | $-27.21 | 153 | 54% | $-806.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9093.06** | $-708.69 | $-198.25 | 149 | 60% | $-801 | 20 |
| mm_sports_v2 | **$8939.63** | $-907.5 | $-152.87 | 163 | 52% | $-1126.63 | 11 |
| mm_slow | **$8771.11** | $-1329.39 | $100.5 | 108 | 50% | $-1515.1 | 25 |
| random_control | **$8664.97** | $-1304.86 | $-30.17 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7412.1** | $-2529.78 | $-58.12 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5384.11** | $-4245.59 | $-370.3 | 481 | 46% | $-4600.14 | 23 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 50 | 1 | 0 | 98% | 1.47¢ |

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
