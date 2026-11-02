# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88210 · Last run: 2026-11-02T12:01:55.732Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11708.07** | $1766.37 | $-58.3 | 508 | 54% | $916.37 | 25 |
| maker_sports | **$10919.82** | $1021.45 | $-101.63 | 137 | 58% | $808.95 | 11 |
| mid_momentum | **$10701.27** | $627.56 | $73.71 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10377.52** | $518.58 | $-141.06 | 36 | 56% | $327.03 | 25 |
| mm_tight | **$10307.68** | $356.79 | $-49.11 | 585 | 53% | $147.69 | 9 |
| mm_max | **$10218.48** | $175.01 | $43.47 | 238 | 53% | $-34.09 | 5 |
| fade_longshot | **$10010.16** | $-25.49 | $35.65 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9991.48** | $71.35 | $-79.87 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9685.51** | $-306.99 | $-7.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9476.09** | $-597.62 | $73.71 | 140 | 51% | $-790.17 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9142.23** | $-840.06 | $-17.71 | 171 | 59% | $-933.69 | 24 |
| mm_cheap_v2 | **$9141.84** | $-778.29 | $-79.87 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$9092.82** | $-772.35 | $-134.83 | 694 | 54% | $-991.48 | 11 |
| mm_strong | **$9003.54** | $-782.82 | $-213.64 | 185 | 53% | $-986.77 | 25 |
| random_control | **$8923.44** | $-899.06 | $-177.5 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8693.52** | $-1046.87 | $-259.61 | 122 | 51% | $-1246.55 | 25 |
| copy_top | **$8684.07** | $-1345.07 | $29.14 | 539 | 53% | $-2673.64 | 25 |
| super | **$8605.18** | $-1375.81 | $-19.01 | 128 | 50% | $-1657.71 | 2 |
| mm_sports_v2 | **$7863.51** | $-2001.66 | $-134.83 | 263 | 50% | $-2220.79 | 11 |
| momentum | **$7018.9** | $-2788.51 | $-192.59 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6808.55** | $-3278.38 | $86.93 | 539 | 47% | $-3729.84 | 25 |
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
| maker_flat | 61 | 0 | 0 | 100% | 2.73¢ |
| maker_sports | 148 | 1 | 0 | 99% | 1.39¢ |

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
