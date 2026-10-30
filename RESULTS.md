# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73454 · Last run: 2026-10-30T02:34:12.119Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11083.75** | $1259.94 | $-176.19 | 31 | 74% | $1068.39 | 11 |
| mid_momentum | **$10837.25** | $776.07 | $61.18 | 269 | 57% | $562.59 | 25 |
| mm_tight | **$10815.81** | $969.84 | $-154.03 | 493 | 54% | $760.74 | 10 |
| copy_pro | **$10353.56** | $503.45 | $-149.89 | 450 | 53% | $-346.55 | 23 |
| mm_cheap | **$10329.46** | $229.69 | $99.77 | 89 | 56% | $47.23 | 25 |
| super | **$10147.88** | $-424.16 | $572.04 | 92 | 51% | $-688.49 | 4 |
| fade_longshot | **$10073.47** | $89.44 | $-15.97 | 152 | 95% | $78.7 | 25 |
| mm_sports | **$10052.57** | $246.2 | $-193.63 | 585 | 55% | $27.07 | 12 |
| mm_max | **$10044.81** | $156.38 | $-111.57 | 212 | 54% | $-52.72 | 4 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9976.22** | $-104.96 | $81.18 | 14 | 50% | $-296.51 | 24 |
| copy_top | **$9782.84** | $-582.35 | $365.19 | 466 | 53% | $-1910.92 | 21 |
| mid_momentum_v2 | **$9612.07** | $-449.11 | $61.18 | 104 | 51% | $-639.93 | 25 |
| mm_cheap_v2 | **$9479.82** | $-619.95 | $99.77 | 106 | 51% | $-810.77 | 25 |
| strong_dip | **$9270.6** | $-584.11 | $-145.29 | 146 | 60% | $-676.42 | 21 |
| mm_strong | **$9218.82** | $-927.98 | $146.8 | 147 | 52% | $-1131.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9000.28** | $-998.71 | $-1.01 | 184 | 56% | $-1613 | 25 |
| mm_sports_v2 | **$8823.26** | $-983.11 | $-193.63 | 154 | 52% | $-1202.24 | 12 |
| mm_slow | **$8686.01** | $-1337.81 | $23.82 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7377.46** | $-2533.86 | $-88.68 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5934.05** | $-3548.44 | $-517.51 | 467 | 46% | $-3902.99 | 21 |
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
| maker_flat | 38 | 0 | 1 | 100% | 2.63¢ |
| maker_sports | 42 | 1 | 1 | 98% | 1.52¢ |

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
