# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77158 · Last run: 2026-10-30T17:02:25.425Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11958.28** | $1807.48 | $150.8 | 467 | 53% | $957.48 | 25 |
| maker_sports | **$11552.19** | $1477.91 | $74.28 | 49 | 67% | $1265.41 | 14 |
| mid_momentum | **$11430.2** | $664 | $766.2 | 275 | 56% | $450.52 | 25 |
| mm_tight | **$11277.71** | $1241.35 | $36.36 | 507 | 54% | $1032.25 | 11 |
| mm_cheap | **$10958.67** | $384.85 | $573.82 | 100 | 57% | $202.39 | 25 |
| maker_flat | **$10618.51** | $-143.67 | $762.18 | 16 | 50% | $-335.22 | 25 |
| mm_max | **$10523.57** | $463.71 | $59.86 | 219 | 54% | $254.61 | 3 |
| mm_sports | **$10309.9** | $277.69 | $32.21 | 604 | 55% | $58.56 | 14 |
| mid_momentum_v2 | **$10205.02** | $-561.18 | $766.2 | 110 | 51% | $-752 | 25 |
| mm_strong | **$10146.6** | $-447.93 | $594.53 | 156 | 54% | $-651.88 | 25 |
| mm_cheap_v2 | **$10109.03** | $-464.79 | $573.82 | 117 | 52% | $-655.61 | 25 |
| copy_top | **$10067.19** | $58.98 | $8.21 | 484 | 53% | $-1269.59 | 25 |
| fade_longshot | **$10017.13** | $119.56 | $-102.43 | 156 | 96% | $108.82 | 25 |
| super | **$9954.56** | $-117.27 | $71.83 | 96 | 52% | $-399.17 | 5 |
| conviction | **$9897.32** | $-102.55 | $-0.13 | 1 | 0% | $0 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9080.59** | $-951.62 | $32.21 | 173 | 52% | $-1170.75 | 14 |
| mm_slow | **$9042.15** | $-1464.18 | $506.33 | 111 | 50% | $-1649.89 | 25 |
| strong_dip | **$8686.64** | $-810.94 | $-502.42 | 150 | 59% | $-903.25 | 22 |
| random_control | **$8573.37** | $-1304.86 | $-121.77 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7524.02** | $-2520.34 | $44.36 | 299 | 66% | $-3008.58 | 25 |
| whale_fade | **$5911.31** | $-3770.48 | $-318.21 | 485 | 46% | $-4221.94 | 25 |
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
| maker_flat | 41 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 63 | 1 | 0 | 98% | 1.47¢ |

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
