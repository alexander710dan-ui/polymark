# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89854 · Last run: 2026-11-03T05:23:43.196Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12487.06** | $2363.63 | $123.43 | 515 | 54% | $1513.63 | 20 |
| mid_momentum | **$10760.81** | $623.25 | $137.56 | 309 | 56% | $409.77 | 24 |
| maker_flat | **$10390.25** | $210.93 | $179.32 | 48 | 50% | $16.81 | 19 |
| maker_sports | **$10366.93** | $445.03 | $-78.1 | 174 | 55% | $232.53 | 7 |
| mm_cheap | **$10126.31** | $170.75 | $-44.44 | 141 | 55% | $-20.94 | 24 |
| mm_tight | **$9899.6** | $18.76 | $-119.16 | 617 | 53% | $-190.34 | 6 |
| mm_max | **$9829.15** | $-158.65 | $-12.2 | 251 | 53% | $-367.75 | 1 |
| fade_longshot | **$9780.59** | $-226.09 | $6.68 | 176 | 94% | $-236.83 | 25 |
| conviction | **$9680.71** | $-306.99 | $-12.3 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9535.63** | $-601.93 | $137.56 | 144 | 51% | $-794.48 | 24 |
| mm_strong | **$9513.4** | $-508.03 | $21.43 | 191 | 53% | $-711.98 | 22 |
| mm_slow | **$9429.43** | $-551.93 | $-18.64 | 129 | 52% | $-761.03 | 19 |
| strong_dip | **$9331.8** | $-763.89 | $95.69 | 184 | 59% | $-857.52 | 21 |
| mm_cheap_v2 | **$9276.67** | $-678.89 | $-44.44 | 158 | 51% | $-870.58 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$8660.12** | $-1271.46 | $-68.42 | 546 | 52% | $-2600.03 | 22 |
| super | **$8612.93** | $-1484.7 | $97.63 | 130 | 50% | $-1766.6 | 3 |
| random_control | **$8570.87** | $-1203.06 | $-226.07 | 193 | 54% | $-1817.35 | 25 |
| mm_sports | **$8470.29** | $-1432.6 | $-97.11 | 731 | 54% | $-1651.73 | 7 |
| mm_sports_v2 | **$7240.98** | $-2661.91 | $-97.11 | 300 | 50% | $-2881.04 | 7 |
| momentum | **$6775.33** | $-2991.46 | $-233.21 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6576.94** | $-3217.68 | $-205.38 | 544 | 47% | $-3669.14 | 23 |
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
| maker_flat | 67 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 181 | 1 | 0 | 99% | 1.37¢ |

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
