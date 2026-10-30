# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 75127 · Last run: 2026-10-30T08:59:47.771Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11969.56** | $1750.5 | $219.06 | 464 | 53% | $900.5 | 25 |
| maker_sports | **$11304.67** | $1377.21 | $-72.54 | 40 | 70% | $1164.71 | 9 |
| mm_tight | **$11213.27** | $1237.21 | $-23.94 | 501 | 54% | $1028.11 | 9 |
| mid_momentum | **$11082.14** | $766.55 | $315.59 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10724.99** | $519.74 | $205.25 | 97 | 58% | $337.28 | 25 |
| mm_max | **$10421.24** | $369.26 | $51.98 | 216 | 54% | $160.16 | 3 |
| copy_top | **$10297.85** | $212.62 | $85.23 | 480 | 54% | $-1115.95 | 23 |
| super | **$10252.88** | $87.83 | $165.05 | 95 | 53% | $-194.07 | 4 |
| mm_sports | **$10223.36** | $321.81 | $-98.45 | 594 | 55% | $102.68 | 10 |
| fade_longshot | **$10093.69** | $93.52 | $0.17 | 153 | 95% | $82.78 | 25 |
| conviction | **$10051.12** | $0 | $51.12 | 0 | — | $0 | 2 |
| maker_flat | **$10037.13** | $-204.96 | $242.09 | 15 | 47% | $-396.51 | 25 |
| mm_cheap_v2 | **$9875.35** | $-329.9 | $205.25 | 114 | 53% | $-520.72 | 25 |
| mid_momentum_v2 | **$9856.96** | $-458.63 | $315.59 | 109 | 51% | $-649.45 | 25 |
| mm_strong | **$9432.22** | $-602.98 | $35.2 | 153 | 54% | $-806.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9062.2** | $-708.69 | $-229.11 | 149 | 60% | $-801 | 20 |
| mm_sports_v2 | **$8994.05** | $-907.5 | $-98.45 | 163 | 52% | $-1126.63 | 10 |
| mm_slow | **$8868.02** | $-1329.39 | $197.41 | 108 | 50% | $-1515.1 | 25 |
| random_control | **$8669.24** | $-1304.86 | $-25.9 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7450.12** | $-2529.78 | $-20.1 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5394.2** | $-4245.59 | $-360.21 | 481 | 46% | $-4600.14 | 23 |
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
| maker_sports | 49 | 1 | 0 | 98% | 1.46¢ |

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
