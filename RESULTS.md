# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73885 · Last run: 2026-10-30T04:14:20.148Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11652.59** | $648.17 | $1004.42 | 459 | 53% | $-201.83 | 19 |
| maker_sports | **$11062.44** | $1190.06 | $-127.62 | 35 | 71% | $998.51 | 8 |
| mm_tight | **$10875.11** | $844.51 | $30.6 | 496 | 54% | $635.41 | 7 |
| mid_momentum | **$10857.94** | $613.53 | $244.41 | 272 | 56% | $400.05 | 25 |
| mm_cheap | **$10417.5** | $255.75 | $161.75 | 94 | 56% | $73.29 | 25 |
| copy_top | **$10131.88** | $-116.24 | $248.12 | 476 | 53% | $-1444.81 | 15 |
| super | **$10128.22** | $87.83 | $40.39 | 95 | 53% | $-194.07 | 1 |
| mm_max | **$10083.31** | $53.68 | $29.63 | 213 | 54% | $-155.42 | 3 |
| fade_longshot | **$10082.44** | $89.44 | $-7 | 152 | 95% | $78.7 | 25 |
| mm_sports | **$10022.03** | $163.23 | $-141.2 | 589 | 55% | $-55.9 | 8 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9953.73** | $-204.96 | $158.69 | 15 | 47% | $-396.51 | 25 |
| mid_momentum_v2 | **$9632.76** | $-611.65 | $244.41 | 107 | 50% | $-802.47 | 25 |
| mm_cheap_v2 | **$9567.86** | $-593.89 | $161.75 | 111 | 51% | $-784.71 | 25 |
| strong_dip | **$9294.38** | $-504.54 | $-201.08 | 147 | 61% | $-596.85 | 21 |
| mm_strong | **$9232.02** | $-847.37 | $79.39 | 150 | 53% | $-1051.32 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8792.72** | $-1066.08 | $-141.2 | 158 | 52% | $-1285.21 | 8 |
| random_control | **$8631.28** | $-1101.01 | $-267.71 | 185 | 56% | $-1715.3 | 25 |
| mm_slow | **$8630.99** | $-1439.51 | $70.5 | 107 | 50% | $-1625.22 | 25 |
| momentum | **$7393.73** | $-2533.86 | $-72.41 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5634.9** | $-4116.4 | $-248.7 | 477 | 46% | $-4470.95 | 15 |
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
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 43 | 1 | 0 | 98% | 1.5¢ |

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
