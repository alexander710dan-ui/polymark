# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 92748 · Last run: 2026-11-04T16:26:16.398Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12438.62** | $2625.78 | $-187.16 | 527 | 55% | $1775.78 | 8 |
| mm_cheap | **$11742.17** | $1452.24 | $289.93 | 157 | 57% | $1232.42 | 19 |
| mid_momentum | **$11599.67** | $1234.92 | $364.75 | 331 | 56% | $1015.1 | 21 |
| maker_flat | **$11526.62** | $762.88 | $763.74 | 69 | 54% | $568.76 | 16 |
| maker_sports | **$11490.43** | $874.11 | $616.32 | 230 | 56% | $640.78 | 8 |
| mm_tight | **$11363.7** | $1000.21 | $363.49 | 664 | 54% | $781.08 | 8 |
| mm_cheap_v2 | **$10892.53** | $602.6 | $289.93 | 174 | 53% | $382.78 | 19 |
| mid_momentum_v2 | **$10374.49** | $9.74 | $364.75 | 166 | 51% | $-210.08 | 21 |
| mm_max | **$10237.75** | $-132.24 | $369.99 | 276 | 53% | $-341.34 | 6 |
| mm_slow | **$9949.64** | $-278.03 | $227.67 | 150 | 53% | $-487.13 | 21 |
| mm_strong | **$9923.17** | $-436.33 | $359.5 | 227 | 53% | $-640.28 | 17 |
| fade_longshot | **$9902.65** | $-142.77 | $45.42 | 189 | 94% | $-153.51 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9296.95** | $-1261.77 | $558.72 | 790 | 54% | $-1480.9 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8698.68** | $-960.09 | $-341.23 | 207 | 58% | $-1053.72 | 21 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8364.9** | $-1396.72 | $-238.38 | 560 | 53% | $-2725.29 | 8 |
| mm_sports_v2 | **$8067.64** | $-2491.08 | $558.72 | 359 | 51% | $-2710.21 | 9 |
| random_control | **$7651.22** | $-1973.81 | $-374.97 | 207 | 53% | $-2588.1 | 25 |
| momentum | **$7529.37** | $-2267.52 | $-203.11 | 330 | 66% | $-2755.76 | 25 |
| whale_fade | **$6334.61** | $-3723.04 | $57.65 | 557 | 47% | $-4174.5 | 10 |
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
| maker_flat | 85 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 238 | 1 | 0 | 100% | 1.32¢ |

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
