# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88244 · Last run: 2026-11-02T12:16:57.168Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11767.13** | $1766.37 | $0.76 | 508 | 54% | $916.37 | 25 |
| maker_sports | **$11027.02** | $1059.55 | $-32.53 | 139 | 58% | $847.05 | 9 |
| mid_momentum | **$10702.69** | $627.56 | $75.13 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10387.69** | $518.58 | $-130.89 | 36 | 56% | $327.03 | 25 |
| mm_tight | **$10349.33** | $333.11 | $16.22 | 587 | 53% | $124.01 | 7 |
| mm_max | **$10216.32** | $254.58 | $-38.26 | 239 | 53% | $45.48 | 4 |
| fade_longshot | **$10011.24** | $-25.49 | $36.73 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9991.92** | $71.35 | $-79.43 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9685.37** | $-306.99 | $-7.64 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9477.51** | $-597.62 | $75.13 | 140 | 51% | $-790.17 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9190.83** | $-745.89 | $-63.28 | 696 | 54% | $-965.02 | 9 |
| mm_cheap_v2 | **$9142.28** | $-778.29 | $-79.43 | 155 | 51% | $-969.98 | 25 |
| strong_dip | **$9139.96** | $-892.34 | $32.3 | 173 | 59% | $-985.97 | 22 |
| mm_strong | **$9060.82** | $-782.82 | $-156.36 | 185 | 53% | $-986.77 | 25 |
| random_control | **$8917.14** | $-899.06 | $-183.8 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8690.83** | $-1046.87 | $-262.3 | 122 | 51% | $-1246.55 | 25 |
| copy_top | **$8632.7** | $-1091.53 | $-275.77 | 540 | 53% | $-2420.1 | 25 |
| super | **$8604.89** | $-1375.81 | $-19.3 | 128 | 50% | $-1657.71 | 2 |
| mm_sports_v2 | **$7961.52** | $-1975.2 | $-63.28 | 265 | 50% | $-2194.33 | 9 |
| momentum | **$7019.95** | $-2788.51 | $-191.54 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6827.25** | $-3278.38 | $105.63 | 539 | 47% | $-3729.84 | 25 |
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
