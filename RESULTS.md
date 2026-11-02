# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87825 · Last run: 2026-11-02T09:06:39.584Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11655.64** | $1710.14 | $-54.5 | 507 | 54% | $860.14 | 25 |
| maker_sports | **$11248.77** | $1304.34 | $-55.57 | 128 | 58% | $1091.84 | 8 |
| mm_tight | **$10879.69** | $983.14 | $-103.45 | 574 | 54% | $774.04 | 7 |
| mid_momentum | **$10713.5** | $627.56 | $85.94 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10493.73** | $433.39 | $60.34 | 35 | 54% | $241.84 | 22 |
| mm_max | **$10316.62** | $289.41 | $27.21 | 232 | 54% | $80.31 | 3 |
| mm_cheap | **$10078.54** | $174 | $-95.46 | 137 | 55% | $-17.69 | 25 |
| fade_longshot | **$10012.85** | $-25.49 | $38.34 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9687.04** | $-306.99 | $-5.97 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9488.32** | $-597.62 | $85.94 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9466.27** | $-452.97 | $-80.76 | 683 | 55% | $-672.1 | 8 |
| mm_cheap_v2 | **$9228.9** | $-675.64 | $-95.46 | 154 | 51% | $-867.33 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9190.41** | $-578.42 | $-231.17 | 183 | 54% | $-782.37 | 25 |
| strong_dip | **$9029.03** | $-1092.17 | $121.2 | 168 | 58% | $-1185.8 | 25 |
| random_control | **$8931.68** | $-899.06 | $-169.26 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8718.57** | $-1046.87 | $-234.56 | 122 | 51% | $-1246.55 | 25 |
| super | **$8610.92** | $-1375.81 | $-13.27 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8548.09** | $-1345.07 | $-106.84 | 539 | 53% | $-2673.64 | 25 |
| mm_sports_v2 | **$8236.96** | $-1682.28 | $-80.76 | 252 | 52% | $-1901.41 | 8 |
| momentum | **$7097.6** | $-2685.86 | $-216.54 | 312 | 65% | $-3174.1 | 25 |
| whale_fade | **$6702.55** | $-3278.38 | $-19.07 | 539 | 47% | $-3729.84 | 25 |
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
| maker_flat | 57 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 136 | 1 | 0 | 99% | 1.38¢ |

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
