# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87458 · Last run: 2026-11-02T06:21:23.921Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11436.36** | $1161.05 | $275.31 | 123 | 58% | $948.55 | 5 |
| copy_pro | **$11374.85** | $1489.91 | $-115.06 | 506 | 54% | $639.91 | 25 |
| mid_momentum | **$10734.81** | $562.89 | $171.92 | 304 | 56% | $349.41 | 25 |
| mm_tight | **$10729.63** | $547.41 | $182.22 | 570 | 54% | $338.31 | 3 |
| maker_flat | **$10513.23** | $451.57 | $61.66 | 33 | 55% | $260.02 | 22 |
| mm_max | **$10293.98** | $289.41 | $4.57 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10213.86** | $182.17 | $31.69 | 135 | 55% | $-9.52 | 25 |
| fade_longshot | **$10005.62** | $-25.49 | $31.11 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9686.68** | $-306.99 | $-6.33 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9509.63** | $-662.29 | $171.92 | 139 | 50% | $-854.84 | 25 |
| mm_sports | **$9450.1** | $-795.65 | $245.75 | 677 | 54% | $-1014.78 | 5 |
| mm_cheap_v2 | **$9364.22** | $-667.47 | $31.69 | 152 | 51% | $-859.16 | 25 |
| mm_strong | **$9326.57** | $-541.29 | $-132.14 | 181 | 54% | $-745.24 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8932.1** | $-899.06 | $-168.84 | 190 | 55% | $-1513.35 | 25 |
| strong_dip | **$8924.35** | $-989.97 | $-85.68 | 167 | 59% | $-1083.6 | 23 |
| mm_slow | **$8689.72** | $-1096.69 | $-213.59 | 121 | 50% | $-1296.37 | 22 |
| super | **$8616.12** | $-1637.68 | $253.8 | 127 | 50% | $-1919.58 | 2 |
| copy_top | **$8528.34** | $-1352.19 | $-119.47 | 537 | 53% | $-2680.76 | 25 |
| mm_sports_v2 | **$8220.79** | $-2024.96 | $245.75 | 246 | 51% | $-2244.09 | 5 |
| momentum | **$7220** | $-2649.53 | $-130.47 | 310 | 65% | $-3137.77 | 25 |
| whale_fade | **$6811.5** | $-3176.08 | $-12.42 | 538 | 47% | $-3627.54 | 25 |
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
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 128 | 1 | 0 | 99% | 1.4¢ |

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
