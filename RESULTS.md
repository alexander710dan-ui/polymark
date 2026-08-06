# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33151 · Last run: 2026-08-06T03:01:14.751Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10543.79** | $764.47 | $-220.68 | 213 | 57% | $550.99 | 25 |
| mm_tight | **$10483.75** | $445.48 | $38.27 | 422 | 53% | $236.38 | 11 |
| mm_cheap | **$10378.55** | $787.82 | $-409.27 | 36 | 64% | $610.04 | 25 |
| super | **$10276.21** | $-110 | $386.21 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10002.46** | $-185.69 | $188.15 | 421 | 52% | $-1514.26 | 22 |
| fade_longshot | **$9865.8** | $25.97 | $-160.17 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9801.67** | $192.14 | $-390.47 | 35 | 54% | $1.32 | 22 |
| mm_cheap_v2 | **$9801.31** | $62.04 | $-260.73 | 38 | 55% | $-128.78 | 22 |
| copy_pro | **$9738.83** | $-929.24 | $668.07 | 399 | 51% | $-1779.24 | 24 |
| mm_sports | **$9717.53** | $-144.88 | $-137.59 | 496 | 55% | $-364.01 | 14 |
| mm_max | **$9673.91** | $-417.06 | $90.97 | 188 | 53% | $-626.16 | 4 |
| strong_dip | **$9611.37** | $-394.63 | $6 | 105 | 60% | $-486.94 | 25 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$8996.11** | $-981.12 | $-22.77 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8748.18** | $-707.39 | $-544.43 | 61 | 51% | $-893.1 | 25 |
| maker_flat | **$8546.09** | $-1381.4 | $-72.51 | 92 | 41% | $-1575.52 | 17 |
| mm_sports_v2 | **$8457.67** | $-1347.98 | $-194.35 | 65 | 45% | $-1567.11 | 13 |
| mm_strong | **$8454.53** | $-1009.77 | $-535.7 | 89 | 47% | $-1213.72 | 25 |
| momentum | **$7965.03** | $-1302.09 | $-732.88 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7668.94** | $-2143.71 | $-187.35 | 178 | 48% | $-2346.74 | 7 |
| whale_fade | **$6809.15** | $-2762.63 | $-428.22 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.2** | $-931.5 | $-68.3 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 74 | 0 | 60% | 2.95¢ |
| maker_sports | 185 | 120 | 1 | 61% | 1.54¢ |

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
