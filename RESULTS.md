# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80165 · Last run: 2026-11-11T12:59:57.300Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13150.85** | $3232.25 | $-81.4 | 303 | 59% | $2987.42 | 17 |
| mm_tight | **$12444.95** | $2199.61 | $245.34 | 727 | 54% | $1980.48 | 15 |
| copy_pro | **$12384.78** | $2469.41 | $-84.63 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12123.8** | $1815.35 | $308.45 | 201 | 57% | $1595.53 | 25 |
| mid_momentum | **$11592.25** | $1308.03 | $284.22 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11274.16** | $965.71 | $308.45 | 218 | 55% | $745.89 | 25 |
| maker_flat | **$10708.36** | $713.28 | $-4.92 | 96 | 52% | $519.16 | 18 |
| mm_sports | **$10642.62** | $575.61 | $67.01 | 867 | 55% | $356.48 | 18 |
| mm_max | **$10435.36** | $263.29 | $172.07 | 293 | 54% | $54.19 | 2 |
| mid_momentum_v2 | **$10367.07** | $82.85 | $284.22 | 200 | 52% | $-136.97 | 25 |
| fade_longshot | **$9856.91** | $-56.44 | $-86.65 | 226 | 95% | $-67.18 | 25 |
| mm_slow | **$9598.16** | $-454.77 | $52.93 | 177 | 52% | $-673.9 | 19 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9538.22** | $-541.87 | $80.09 | 271 | 53% | $-761 | 25 |
| mm_sports_v2 | **$9413.31** | $-653.7 | $67.01 | 436 | 54% | $-872.83 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8545.93** | $-1344.86 | $-109.21 | 233 | 58% | $-1438.49 | 19 |
| copy_top | **$8376.93** | $-1470.79 | $-152.28 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7565.03** | $-2427.27 | $-7.7 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7395.55** | $-2625.55 | $21.1 | 359 | 66% | $-3113.79 | 25 |
| whale_fade | **$6003.16** | $-4244.08 | $247.24 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 114 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 320 | 1 | 0 | 100% | 1.35¢ |

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
