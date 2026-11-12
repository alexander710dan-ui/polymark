# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82232 · Last run: 2026-11-12T14:47:19.075Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.14** | $2469.41 | $-84.27 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12286.82** | $2539.53 | $-252.71 | 370 | 57% | $2294.7 | 9 |
| mm_tight | **$11548.25** | $1750.81 | $-202.56 | 791 | 54% | $1531.68 | 6 |
| mm_cheap | **$11530.41** | $1193.57 | $336.84 | 228 | 55% | $973.75 | 24 |
| mid_momentum | **$11516.35** | $1074.14 | $442.21 | 382 | 55% | $854.32 | 25 |
| mm_max | **$10714.92** | $794.71 | $-79.79 | 310 | 55% | $585.61 | 4 |
| mm_cheap_v2 | **$10680.77** | $343.93 | $336.84 | 245 | 53% | $124.11 | 24 |
| maker_flat | **$10531.34** | $412.71 | $118.63 | 115 | 50% | $218.59 | 22 |
| mid_momentum_v2 | **$10291.17** | $-151.04 | $442.21 | 217 | 52% | $-370.86 | 25 |
| fade_longshot | **$9883.76** | $-140.38 | $24.14 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9421.45** | $-462.01 | $-116.54 | 200 | 52% | $-681.14 | 24 |
| mm_sports | **$9291.56** | $-440.17 | $-268.27 | 937 | 54% | $-659.3 | 9 |
| mm_strong | **$9243.28** | $-766.34 | $9.62 | 309 | 53% | $-985.47 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8759.83** | $-1301.47 | $61.3 | 259 | 58% | $-1395.1 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8375.36** | $-1470.79 | $-153.85 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8062.25** | $-1669.48 | $-268.27 | 506 | 52% | $-1888.61 | 9 |
| random_control | **$7388.8** | $-2427.27 | $-183.93 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7257.61** | $-2770.21 | $27.82 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5981.96** | $-4244.08 | $226.04 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 137 | 0 | 1 | 100% | 2.69¢ |
| maker_sports | 379 | 2 | 0 | 99% | 1.39¢ |

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
