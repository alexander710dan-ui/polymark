# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90901 · Last run: 2026-11-03T22:33:47.988Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12523.17** | $2431.07 | $92.1 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11110.38** | $729.23 | $381.15 | 215 | 55% | $495.9 | 11 |
| mm_tight | **$10941.78** | $686.59 | $255.19 | 653 | 53% | $467.46 | 9 |
| mid_momentum | **$10789.9** | $765.72 | $24.18 | 314 | 56% | $552.24 | 25 |
| maker_flat | **$10787.75** | $188.72 | $599.03 | 56 | 50% | $-5.4 | 25 |
| mm_cheap | **$10369.84** | $438.8 | $-68.96 | 143 | 55% | $247.11 | 25 |
| mm_max | **$10139.34** | $-120.47 | $259.81 | 270 | 53% | $-329.57 | 7 |
| mm_slow | **$9955.98** | $-618.28 | $574.26 | 137 | 52% | $-827.38 | 25 |
| fade_longshot | **$9809.85** | $-203.07 | $12.92 | 179 | 94% | $-213.81 | 25 |
| conviction | **$9686.1** | $-306.99 | $-6.91 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9564.72** | $-459.46 | $24.18 | 149 | 51% | $-652.01 | 25 |
| mm_cheap_v2 | **$9520.2** | $-410.84 | $-68.96 | 160 | 52% | $-602.53 | 25 |
| mm_strong | **$9386.2** | $-583.62 | $-30.18 | 209 | 54% | $-787.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9078.8** | $-1243.19 | $321.99 | 774 | 54% | $-1462.32 | 13 |
| strong_dip | **$9015.86** | $-802.58 | $-181.56 | 198 | 59% | $-896.21 | 24 |
| copy_top | **$8735.67** | $-1201.39 | $-62.94 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8654.2** | $-1203.06 | $-142.74 | 193 | 54% | $-1817.35 | 25 |
| super | **$8617.53** | $-1370.14 | $-12.33 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$7849.49** | $-2472.5 | $321.99 | 343 | 51% | $-2691.63 | 13 |
| momentum | **$6813.88** | $-2991.46 | $-194.66 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6522.04** | $-3425.44 | $-52.52 | 546 | 47% | $-3876.9 | 21 |
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
| maker_sports | 226 | 1 | 1 | 100% | 1.32¢ |

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
