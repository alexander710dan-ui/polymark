# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 76124 · Last run: 2026-10-30T12:55:11.093Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11847.2** | $1750.04 | $97.16 | 466 | 53% | $900.04 | 25 |
| maker_sports | **$11420.22** | $1309.77 | $110.45 | 43 | 67% | $1097.27 | 12 |
| mm_tight | **$11197.85** | $1142.48 | $55.37 | 504 | 54% | $933.38 | 10 |
| mid_momentum | **$11015.46** | $766.55 | $248.91 | 274 | 57% | $553.07 | 25 |
| mm_cheap | **$10565.1** | $487.5 | $77.6 | 99 | 58% | $305.04 | 25 |
| mm_max | **$10538.01** | $377.38 | $160.63 | 218 | 54% | $168.28 | 4 |
| copy_top | **$10290.01** | $263.43 | $26.58 | 482 | 54% | $-1065.14 | 25 |
| mm_sports | **$10212.51** | $241.43 | $-28.92 | 597 | 55% | $22.3 | 13 |
| fade_longshot | **$10096.14** | $93.52 | $2.62 | 153 | 95% | $82.78 | 25 |
| maker_flat | **$9987.63** | $-204.96 | $192.59 | 15 | 47% | $-396.51 | 25 |
| super | **$9950.52** | $-117.27 | $67.79 | 96 | 52% | $-399.17 | 3 |
| conviction | **$9896.53** | $-102.55 | $-0.92 | 1 | 0% | $0 | 1 |
| mid_momentum_v2 | **$9790.28** | $-458.63 | $248.91 | 109 | 51% | $-649.45 | 25 |
| mm_cheap_v2 | **$9715.46** | $-362.14 | $77.6 | 116 | 53% | $-552.96 | 25 |
| mm_strong | **$9520.09** | $-489.29 | $9.38 | 155 | 54% | $-693.24 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9084.09** | $-708.69 | $-207.22 | 149 | 60% | $-801 | 21 |
| mm_sports_v2 | **$8983.2** | $-987.88 | $-28.92 | 166 | 52% | $-1207.01 | 13 |
| random_control | **$8659.65** | $-1304.86 | $-35.49 | 187 | 55% | $-1919.15 | 25 |
| mm_slow | **$8648.99** | $-1361.63 | $10.62 | 110 | 50% | $-1547.34 | 25 |
| momentum | **$7387.01** | $-2529.78 | $-83.21 | 298 | 65% | $-3018.02 | 25 |
| whale_fade | **$5528.24** | $-4257.58 | $-214.18 | 483 | 46% | $-4612.13 | 25 |
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
| maker_sports | 55 | 1 | 0 | 98% | 1.52¢ |

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
