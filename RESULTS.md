# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27562 · Last run: 2026-08-03T23:01:07.814Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11665.02** | $1700.03 | $-35.01 | 305 | 57% | $1497 | 25 |
| mm_tight | **$10881** | $817.87 | $63.13 | 264 | 54% | $614.84 | 20 |
| mid_momentum | **$10438.11** | $665.95 | $-227.84 | 191 | 58% | $452.47 | 25 |
| mm_cheap | **$10355.05** | $893.78 | $-538.73 | 25 | 72% | $716 | 25 |
| strong_dip | **$10011.17** | $-258.85 | $270.02 | 97 | 61% | $-351.16 | 24 |
| fade_longshot | **$9955.98** | $39.78 | $-83.8 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9826.91** | $-205.15 | $32.06 | 99 | 53% | $-324.62 | 11 |
| maker_flat | **$9746.81** | $-103.97 | $-149.22 | 11 | 45% | $-231.24 | 11 |
| maker_sports | **$9728.43** | $-340.23 | $68.66 | 23 | 43% | $-525.94 | 12 |
| super | **$9671.13** | $-353.9 | $25.03 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9569.34** | $-882.82 | $452.16 | 368 | 51% | $-1732.82 | 25 |
| copy_top | **$9443.61** | $-645.89 | $89.5 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9412.87** | $-587.64 | $0.51 | 7 | 14% | $-600 | 2 |
| random_control | **$9208.1** | $-249.45 | $-542.45 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8933.03** | $-762.3 | $-304.67 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8786.18** | $-1021.38 | $-192.44 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8145.47** | $-1304.42 | $-550.11 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7705.71** | $-1810.06 | $-484.23 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9390.48** | $-730.36 | $120.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9032.57** | $-942.24 | $-25.19 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8339.58** | $-1937.09 | $276.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 22 | 19 | 3 | 54% | 3.11¢ |
| maker_sports | 35 | 18 | 6 | 66% | 1.8¢ |

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
