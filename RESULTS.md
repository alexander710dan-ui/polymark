# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87478 · Last run: 2026-11-02T06:30:02.513Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11469.14** | $1346.76 | $122.38 | 124 | 58% | $1134.26 | 5 |
| copy_pro | **$11294.08** | $1489.91 | $-195.83 | 506 | 54% | $639.91 | 25 |
| mm_tight | **$10725.66** | $721.99 | $3.67 | 571 | 54% | $512.89 | 3 |
| mid_momentum | **$10725.37** | $627.56 | $97.81 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10504.05** | $451.57 | $52.48 | 33 | 55% | $260.02 | 22 |
| mm_max | **$10293.98** | $289.41 | $4.57 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10227.42** | $275.8 | $-48.38 | 136 | 55% | $84.11 | 25 |
| fade_longshot | **$10005.67** | $-25.49 | $31.16 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9686.39** | $-306.99 | $-6.62 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9500.19** | $-597.62 | $97.81 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9476.79** | $-621.07 | $97.86 | 678 | 54% | $-840.2 | 6 |
| mm_cheap_v2 | **$9377.78** | $-573.84 | $-48.38 | 153 | 52% | $-765.53 | 25 |
| mm_strong | **$9342.38** | $-476.62 | $-181 | 182 | 54% | $-680.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8935.13** | $-899.06 | $-165.81 | 190 | 55% | $-1513.35 | 25 |
| strong_dip | **$8922.06** | $-1092.17 | $14.23 | 168 | 58% | $-1185.8 | 22 |
| mm_slow | **$8683.34** | $-1096.69 | $-219.97 | 121 | 50% | $-1296.37 | 23 |
| super | **$8610.94** | $-1375.81 | $-13.25 | 128 | 50% | $-1657.71 | 1 |
| copy_top | **$8489.58** | $-1352.19 | $-158.23 | 537 | 53% | $-2680.76 | 25 |
| mm_sports_v2 | **$8247.48** | $-1850.38 | $97.86 | 247 | 51% | $-2069.51 | 6 |
| momentum | **$7220.44** | $-2584.86 | $-194.7 | 311 | 66% | $-3073.1 | 25 |
| whale_fade | **$6841.36** | $-3176.08 | $17.44 | 538 | 47% | $-3627.54 | 25 |
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
| maker_sports | 129 | 1 | 0 | 99% | 1.4¢ |

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
