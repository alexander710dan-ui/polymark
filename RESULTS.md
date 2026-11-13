# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83125 · Last run: 2026-11-13T02:36:03.379Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12540.46** | $2770.27 | $-229.81 | 391 | 57% | $2525.44 | 17 |
| copy_pro | **$12384.54** | $2469.41 | $-84.87 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11560.18** | $1577.55 | $-17.37 | 813 | 54% | $1358.42 | 9 |
| maker_flat | **$11091.21** | $1007.19 | $84.02 | 128 | 52% | $813.07 | 19 |
| mm_cheap | **$11063.69** | $1062.37 | $1.32 | 245 | 55% | $842.55 | 25 |
| mid_momentum | **$10916.38** | $937.69 | $-21.31 | 394 | 55% | $717.87 | 25 |
| mm_max | **$10821.83** | $822.83 | $-1 | 323 | 55% | $613.73 | 1 |
| mm_cheap_v2 | **$10214.05** | $212.73 | $1.32 | 262 | 53% | $-7.09 | 25 |
| fade_longshot | **$9874.03** | $-140.38 | $14.41 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9691.2** | $-287.49 | $-21.31 | 229 | 51% | $-507.31 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9279.16** | $-528.18 | $-192.66 | 210 | 52% | $-747.31 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9148.75** | $-589.89 | $-261.36 | 962 | 54% | $-809.02 | 17 |
| mm_strong | **$8761.28** | $-1256.05 | $17.33 | 324 | 52% | $-1475.18 | 24 |
| strong_dip | **$8697.54** | $-1333.05 | $30.59 | 267 | 58% | $-1426.68 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.42** | $-1470.79 | $-154.79 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7919.44** | $-1819.2 | $-261.36 | 531 | 52% | $-2038.33 | 17 |
| random_control | **$7594.7** | $-2353.98 | $-51.32 | 242 | 54% | $-2968.27 | 25 |
| momentum | **$7248.23** | $-2734.16 | $-17.61 | 376 | 65% | $-3222.4 | 25 |
| whale_fade | **$5977.25** | $-4244.08 | $221.33 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 147 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 408 | 2 | 0 | 100% | 1.39¢ |

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
