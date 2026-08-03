# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27565 · Last run: 2026-08-03T23:02:48.241Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11639.45** | $1600.03 | $39.42 | 306 | 57% | $1397 | 25 |
| mm_tight | **$10909.66** | $900.76 | $8.9 | 265 | 54% | $697.73 | 19 |
| mid_momentum | **$10448.75** | $665.95 | $-217.2 | 191 | 58% | $452.47 | 25 |
| mm_cheap | **$10357.25** | $893.78 | $-536.53 | 25 | 72% | $716 | 25 |
| strong_dip | **$10009.52** | $-258.85 | $268.37 | 97 | 61% | $-351.16 | 24 |
| fade_longshot | **$9956.53** | $39.78 | $-83.25 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9856.53** | $-122.26 | $-21.21 | 100 | 53% | $-241.73 | 10 |
| maker_flat | **$9760.83** | $-103.97 | $-135.2 | 11 | 45% | $-231.24 | 11 |
| maker_sports | **$9724.65** | $-340.23 | $64.88 | 23 | 43% | $-525.94 | 12 |
| super | **$9670.42** | $-353.9 | $24.32 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9525.24** | $-882.82 | $408.06 | 368 | 51% | $-1732.82 | 25 |
| copy_top | **$9422** | $-645.89 | $67.89 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9405.18** | $-587.64 | $-7.18 | 7 | 14% | $-600 | 2 |
| random_control | **$9202.43** | $-249.45 | $-548.12 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8933.6** | $-762.3 | $-304.1 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8786.56** | $-1021.38 | $-192.06 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8130.21** | $-1304.42 | $-565.37 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7756.64** | $-1810.06 | $-433.3 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9389.09** | $-730.36 | $119.45 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9033.7** | $-942.24 | $-24.06 | 132 | 69% | $-1006.17 | 4 |
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
