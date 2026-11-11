# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79535 · Last run: 2026-11-11T05:29:15.968Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13249.33** | $3100.45 | $148.88 | 288 | 59% | $2855.62 | 10 |
| copy_pro | **$12385.18** | $2469.41 | $-84.23 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12203.05** | $2156.64 | $46.41 | 715 | 55% | $1937.51 | 8 |
| mm_cheap | **$12189.04** | $1791.19 | $397.85 | 195 | 57% | $1571.37 | 20 |
| mid_momentum | **$11821.97** | $1347.55 | $474.42 | 361 | 56% | $1127.73 | 23 |
| mm_cheap_v2 | **$11339.4** | $941.55 | $397.85 | 212 | 55% | $721.73 | 20 |
| maker_flat | **$10640.01** | $637.84 | $2.17 | 95 | 52% | $443.72 | 15 |
| mm_sports | **$10625** | $513.5 | $111.5 | 852 | 55% | $294.37 | 10 |
| mid_momentum_v2 | **$10596.79** | $122.37 | $474.42 | 196 | 52% | $-97.45 | 23 |
| mm_max | **$10263.29** | $263.29 | $0 | 293 | 54% | $54.19 | 0 |
| fade_longshot | **$9924.78** | $-95.44 | $20.22 | 219 | 95% | $-106.18 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9536.98** | $-606.81 | $143.79 | 264 | 53% | $-825.94 | 19 |
| mm_slow | **$9412.01** | $-454.77 | $-133.22 | 177 | 52% | $-673.9 | 15 |
| mm_sports_v2 | **$9395.69** | $-715.81 | $111.5 | 421 | 54% | $-934.94 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8801.42** | $-1140.41 | $-58.17 | 231 | 58% | $-1234.04 | 15 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8376.58** | $-1470.79 | $-152.63 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7680.38** | $-2250 | $-69.62 | 237 | 54% | $-2864.29 | 25 |
| momentum | **$7668.06** | $-2519.98 | $188.04 | 351 | 66% | $-3008.22 | 25 |
| whale_fade | **$6008.65** | $-4244.08 | $252.73 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 110 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 298 | 1 | 0 | 100% | 1.31¢ |

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
