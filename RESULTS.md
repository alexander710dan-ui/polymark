# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87726 · Last run: 2026-11-02T08:21:34.799Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11546.77** | $1489.91 | $56.86 | 506 | 54% | $639.91 | 25 |
| maker_sports | **$11346.87** | $1404.34 | $-57.47 | 127 | 58% | $1191.84 | 5 |
| mm_tight | **$10945.53** | $896.81 | $48.72 | 573 | 54% | $687.71 | 5 |
| mid_momentum | **$10714.6** | $627.56 | $87.04 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10496.94** | $433.39 | $63.55 | 35 | 54% | $241.84 | 22 |
| mm_max | **$10291.99** | $289.41 | $2.58 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10136.69** | $275.8 | $-139.11 | 136 | 55% | $84.11 | 25 |
| fade_longshot | **$10011.67** | $-25.49 | $37.16 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9684.71** | $-306.99 | $-8.3 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9573.22** | $-400.79 | $-25.99 | 681 | 55% | $-619.92 | 7 |
| mid_momentum_v2 | **$9489.42** | $-597.62 | $87.04 | 140 | 51% | $-790.17 | 25 |
| mm_cheap_v2 | **$9287.05** | $-573.84 | $-139.11 | 153 | 52% | $-765.53 | 25 |
| mm_strong | **$9245.54** | $-476.62 | $-277.84 | 182 | 54% | $-680.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8932.84** | $-899.06 | $-168.1 | 190 | 55% | $-1513.35 | 25 |
| strong_dip | **$8924.48** | $-1092.17 | $16.65 | 168 | 58% | $-1185.8 | 23 |
| mm_slow | **$8722.28** | $-1096.69 | $-181.03 | 121 | 50% | $-1296.37 | 24 |
| super | **$8606.26** | $-1375.81 | $-17.93 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8516.56** | $-1352.19 | $-131.25 | 537 | 53% | $-2680.76 | 25 |
| mm_sports_v2 | **$8343.91** | $-1630.1 | $-25.99 | 250 | 52% | $-1849.23 | 7 |
| momentum | **$7146.5** | $-2584.86 | $-268.64 | 311 | 66% | $-3073.1 | 25 |
| whale_fade | **$6707.66** | $-3176.08 | $-116.26 | 538 | 47% | $-3627.54 | 25 |
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
| maker_sports | 132 | 1 | 1 | 99% | 1.39¢ |

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
