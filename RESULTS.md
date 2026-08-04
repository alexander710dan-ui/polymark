# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27845 · Last run: 2026-08-04T01:39:05.473Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11298.72** | $1638.49 | $-339.77 | 322 | 57% | $1435.46 | 21 |
| mm_tight | **$10796.99** | $749.22 | $47.77 | 280 | 54% | $546.19 | 17 |
| mm_cheap | **$10313.1** | $791.63 | $-478.53 | 26 | 69% | $613.85 | 25 |
| mid_momentum | **$10240.19** | $678.29 | $-438.1 | 194 | 58% | $464.81 | 25 |
| fade_longshot | **$9969.25** | $39.78 | $-70.53 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9779.64** | $-463.45 | $243.09 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9761.32** | $120.2 | $-358.88 | 19 | 53% | $-57.58 | 15 |
| copy_top | **$9731.39** | $-588.74 | $320.13 | 392 | 52% | $-1917.31 | 23 |
| mm_max | **$9694.77** | $-248.29 | $-56.94 | 111 | 52% | $-367.76 | 10 |
| super | **$9603.44** | $-353.9 | $-42.66 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9502.21** | $-916.05 | $418.26 | 370 | 51% | $-1766.05 | 25 |
| ai_judge | **$9431.76** | $-587.64 | $19.4 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9185.2** | $-156.93 | $-657.87 | 37 | 51% | $-342.64 | 14 |
| random_control | **$9025.9** | $-354.2 | $-619.9 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8920.93** | $-864.45 | $-214.62 | 49 | 49% | $-986.67 | 25 |
| mm_strong | **$8712.83** | $-1123.53 | $-163.64 | 69 | 46% | $-1327.48 | 25 |
| momentum | **$8179.28** | $-1278.24 | $-542.48 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7413.65** | $-1968.7 | $-617.65 | 393 | 48% | $-2323.25 | 23 |
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
