# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27849 · Last run: 2026-08-04T01:41:19.239Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11282.42** | $1638.49 | $-356.07 | 322 | 57% | $1435.46 | 21 |
| mm_tight | **$10814.26** | $749.22 | $65.04 | 280 | 54% | $546.19 | 17 |
| mm_cheap | **$10310.57** | $791.63 | $-481.06 | 26 | 69% | $613.85 | 25 |
| mid_momentum | **$10230.11** | $678.29 | $-448.18 | 194 | 58% | $464.81 | 25 |
| fade_longshot | **$9969.31** | $39.78 | $-70.47 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9778.69** | $-463.45 | $242.14 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9753.59** | $120.2 | $-366.61 | 19 | 53% | $-57.58 | 15 |
| copy_top | **$9750.76** | $-588.74 | $339.5 | 392 | 52% | $-1917.31 | 23 |
| mm_max | **$9712.03** | $-248.29 | $-39.68 | 111 | 52% | $-367.76 | 10 |
| super | **$9599.78** | $-353.9 | $-46.32 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9544.15** | $-916.05 | $460.2 | 370 | 51% | $-1766.05 | 25 |
| ai_judge | **$9431.76** | $-587.64 | $19.4 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9168.63** | $-156.93 | $-674.44 | 37 | 51% | $-342.64 | 14 |
| random_control | **$9026.85** | $-354.2 | $-618.95 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8923.65** | $-864.45 | $-211.9 | 49 | 49% | $-986.67 | 25 |
| mm_strong | **$8713.63** | $-1123.53 | $-162.84 | 69 | 46% | $-1327.48 | 25 |
| momentum | **$8188.75** | $-1278.24 | $-533.01 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7397.1** | $-1968.7 | $-634.2 | 393 | 48% | $-2323.25 | 23 |
| copy_month (retired) | **$9377.97** | $-730.36 | $108.33 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9042.69** | $-942.24 | $-15.07 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8282.91** | $-1937.09 | $220 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 34 | 24 | 1 | 59% | 3.01¢ |
| maker_sports | 51 | 25 | 2 | 67% | 1.57¢ |

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
