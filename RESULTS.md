# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32483 · Last run: 2026-08-05T20:49:33.305Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10982.83** | $878.9 | $103.93 | 394 | 54% | $675.87 | 15 |
| mid_momentum | **$10633.25** | $867.28 | $-234.03 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10514.58** | $887.82 | $-373.24 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10261.74** | $-136.55 | $398.29 | 17 | 53% | $-248.47 | 25 |
| mid_momentum_v2 | **$10134.31** | $-221.85 | $356.16 | 18 | 50% | $-333.77 | 25 |
| mm_sports | **$10037.37** | $147.48 | $-110.11 | 462 | 55% | $-71.65 | 19 |
| super | **$10005.93** | $-425.73 | $431.66 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9912.85** | $123.32 | $-210.47 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9829.75** | $-542.13 | $371.88 | 413 | 52% | $-1870.7 | 25 |
| mm_max | **$9731.37** | $-271.43 | $2.8 | 171 | 54% | $-438.55 | 3 |
| copy_pro | **$9510.23** | $-1348.73 | $858.96 | 393 | 51% | $-2198.73 | 25 |
| strong_dip | **$9504.25** | $-482.76 | $-12.99 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$8972.31** | $-1000.59 | $-27.1 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8950.39** | $-444.42 | $-605.19 | 56 | 54% | $-630.13 | 25 |
| maker_flat | **$8801.15** | $-1049 | $-149.85 | 83 | 42% | $-1243.12 | 17 |
| mm_sports_v2 | **$8791.71** | $-1092.76 | $-115.53 | 29 | 38% | $-1218.78 | 19 |
| mm_strong | **$8679.11** | $-804.21 | $-516.68 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8352.24** | $-1465.21 | $-182.55 | 148 | 49% | $-1668.24 | 13 |
| momentum | **$8216.18** | $-1059.12 | $-724.7 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$6989.43** | $-2225.04 | $-785.53 | 414 | 48% | $-2579.59 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.48** | $-931.5 | $-70.02 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 100 | 66 | 3 | 60% | 2.98¢ |
| maker_sports | 161 | 103 | 3 | 61% | 1.6¢ |

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
