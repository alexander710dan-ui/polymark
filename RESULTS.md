# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27936 · Last run: 2026-08-04T02:29:42.534Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11168.14** | $1568.93 | $-400.79 | 326 | 57% | $1365.9 | 22 |
| mm_tight | **$10919.01** | $627.06 | $291.95 | 283 | 53% | $424.03 | 18 |
| mm_cheap | **$10414.32** | $791.63 | $-377.31 | 26 | 69% | $613.85 | 25 |
| mid_momentum | **$10267.52** | $678.29 | $-410.77 | 194 | 58% | $464.81 | 25 |
| fade_longshot | **$9975.91** | $39.78 | $-63.87 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9870.02** | $-588.74 | $458.76 | 392 | 52% | $-1917.31 | 23 |
| mm_max | **$9776.09** | $-350.69 | $126.78 | 112 | 52% | $-470.16 | 11 |
| strong_dip | **$9772.7** | $-463.45 | $236.15 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9756.25** | $120.2 | $-363.95 | 19 | 53% | $-57.58 | 16 |
| copy_pro | **$9578.59** | $-916.05 | $494.64 | 370 | 51% | $-1766.05 | 25 |
| super | **$9556.7** | $-353.9 | $-89.4 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9441.76** | $-587.64 | $29.4 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9137.89** | $-268.25 | $-593.86 | 40 | 50% | $-453.96 | 15 |
| mm_slow | **$9044.56** | $-864.45 | $-90.99 | 49 | 49% | $-986.67 | 25 |
| random_control | **$8986.87** | $-354.2 | $-658.93 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8724.02** | $-1123.53 | $-152.45 | 69 | 46% | $-1327.48 | 25 |
| momentum | **$8191.67** | $-1278.24 | $-530.09 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7335.88** | $-1968.7 | $-695.42 | 393 | 48% | $-2323.25 | 23 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9047.98** | $-942.24 | $-9.78 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8252.91** | $-1937.09 | $190 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 35 | 24 | 2 | 59% | 2.99¢ |
| maker_sports | 55 | 26 | 2 | 68% | 1.6¢ |

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
