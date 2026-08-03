# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27570 · Last run: 2026-08-03T23:05:31.773Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11644.88** | $1600.03 | $44.85 | 306 | 57% | $1397 | 25 |
| mm_tight | **$10915.09** | $900.76 | $14.33 | 265 | 54% | $697.73 | 19 |
| mid_momentum | **$10442.13** | $665.95 | $-223.82 | 191 | 58% | $452.47 | 25 |
| mm_cheap | **$10350.41** | $893.78 | $-543.37 | 25 | 72% | $716 | 25 |
| strong_dip | **$10019.79** | $-258.85 | $278.64 | 97 | 61% | $-351.16 | 24 |
| fade_longshot | **$9962.19** | $39.78 | $-77.59 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9862.08** | $-122.26 | $-15.66 | 100 | 53% | $-241.73 | 10 |
| maker_flat | **$9763.19** | $-103.97 | $-132.84 | 11 | 45% | $-231.24 | 11 |
| maker_sports | **$9722.73** | $-340.23 | $62.96 | 23 | 43% | $-525.94 | 12 |
| super | **$9646.11** | $-353.9 | $0.01 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9487.1** | $-882.82 | $369.92 | 368 | 51% | $-1732.82 | 25 |
| copy_top | **$9417.49** | $-645.89 | $63.38 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9416.29** | $-587.64 | $3.93 | 7 | 14% | $-600 | 2 |
| random_control | **$9154.48** | $-249.45 | $-596.07 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8942.42** | $-762.3 | $-295.28 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8772.86** | $-1021.38 | $-205.76 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8129.62** | $-1304.42 | $-565.96 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7754.91** | $-1810.06 | $-435.03 | 390 | 48% | $-2164.61 | 25 |
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
