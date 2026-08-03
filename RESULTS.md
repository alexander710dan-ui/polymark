# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27571 · Last run: 2026-08-03T23:06:04.869Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11668** | $1600.03 | $67.97 | 306 | 57% | $1397 | 25 |
| mm_tight | **$10919.29** | $900.76 | $18.53 | 265 | 54% | $697.73 | 20 |
| mid_momentum | **$10445.29** | $665.95 | $-220.66 | 191 | 58% | $452.47 | 25 |
| mm_cheap | **$10357.65** | $893.78 | $-536.13 | 25 | 72% | $716 | 25 |
| strong_dip | **$10020.11** | $-258.85 | $278.96 | 97 | 61% | $-351.16 | 25 |
| fade_longshot | **$9962.29** | $39.78 | $-77.49 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9865.42** | $-122.26 | $-12.32 | 100 | 53% | $-241.73 | 11 |
| maker_flat | **$9782.63** | $-103.97 | $-113.4 | 11 | 45% | $-231.24 | 11 |
| maker_sports | **$9742.18** | $-340.23 | $82.41 | 23 | 43% | $-525.94 | 12 |
| super | **$9640** | $-353.9 | $-6.1 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9483.1** | $-882.82 | $365.92 | 368 | 51% | $-1732.82 | 25 |
| ai_judge | **$9416.29** | $-587.64 | $3.93 | 7 | 14% | $-600 | 2 |
| copy_top | **$9411.09** | $-645.89 | $56.98 | 389 | 51% | $-1974.46 | 25 |
| random_control | **$9160.88** | $-249.45 | $-589.67 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8945.74** | $-762.3 | $-291.96 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8771.34** | $-1021.38 | $-207.28 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8141.95** | $-1304.42 | $-553.63 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7759.04** | $-1810.06 | $-430.9 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9389.09** | $-730.36 | $119.45 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9039.59** | $-942.24 | $-18.17 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.25** | $-1937.09 | $243.34 | 146 | 25% | $-3964.75 | 1 |
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
