# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90944 · Last run: 2026-11-03T23:11:11.395Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12387.7** | $2431.07 | $-43.37 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11282.76** | $729.23 | $553.53 | 215 | 55% | $495.9 | 14 |
| mm_tight | **$10950.29** | $686.59 | $263.7 | 653 | 53% | $467.46 | 11 |
| mid_momentum | **$10817.24** | $948.83 | $-131.59 | 315 | 56% | $735.35 | 25 |
| maker_flat | **$10762.74** | $188.72 | $574.02 | 56 | 50% | $-5.4 | 25 |
| mm_cheap | **$10364.06** | $438.8 | $-74.74 | 143 | 55% | $247.11 | 25 |
| mm_max | **$10134.48** | $-120.47 | $254.95 | 270 | 53% | $-329.57 | 7 |
| mm_slow | **$9918.29** | $-435.17 | $353.46 | 138 | 52% | $-644.27 | 24 |
| fade_longshot | **$9817.03** | $-197.58 | $14.61 | 180 | 94% | $-208.32 | 25 |
| conviction | **$9689.37** | $-306.99 | $-3.64 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9592.06** | $-276.35 | $-131.59 | 150 | 51% | $-468.9 | 25 |
| mm_cheap_v2 | **$9514.42** | $-410.84 | $-74.74 | 160 | 52% | $-602.53 | 25 |
| mm_strong | **$9343.5** | $-400.51 | $-255.99 | 210 | 54% | $-604.46 | 25 |
| mm_sports | **$9236.21** | $-1243.19 | $479.4 | 774 | 54% | $-1462.32 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8970.18** | $-903.65 | $-126.17 | 199 | 59% | $-997.28 | 23 |
| copy_top | **$8747.56** | $-1201.39 | $-51.05 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8649.72** | $-1203.06 | $-147.22 | 193 | 54% | $-1817.35 | 25 |
| super | **$8624.08** | $-1370.14 | $-5.78 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8006.9** | $-2472.5 | $479.4 | 343 | 51% | $-2691.63 | 16 |
| momentum | **$6832.14** | $-2991.46 | $-176.4 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6546.63** | $-3425.44 | $-27.93 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 229 | 1 | 0 | 100% | 1.32¢ |

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
