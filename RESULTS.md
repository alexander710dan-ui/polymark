# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34072 · Last run: 2026-08-06T11:34:22.920Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10307.86** | $46.83 | $261.03 | 79 | 51% | $-217.5 | 12 |
| mid_momentum | **$10226.29** | $559.07 | $-332.78 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10211.28** | $685.62 | $-474.34 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10037.21** | $-117.05 | $154.26 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9997.29** | $246.52 | $-249.23 | 436 | 53% | $37.42 | 19 |
| fade_longshot | **$9870.35** | $25.97 | $-155.62 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9661.57** | $-344.49 | $6.06 | 193 | 53% | $-553.59 | 2 |
| strong_dip | **$9637.72** | $-517.26 | $154.98 | 108 | 59% | $-609.57 | 25 |
| copy_pro | **$9383.64** | $-919.79 | $303.43 | 404 | 51% | $-1769.79 | 25 |
| mid_momentum_v2 | **$9378.66** | $-188.11 | $-433.23 | 46 | 50% | $-378.93 | 25 |
| ai_judge | **$9373.73** | $-587.64 | $-38.63 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9318.36** | $-335.37 | $-346.27 | 51 | 51% | $-526.19 | 25 |
| mm_sports | **$9255** | $-505.23 | $-239.77 | 513 | 55% | $-724.36 | 23 |
| random_control | **$9134.17** | $-1085.22 | $219.39 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8640.54** | $-809.59 | $-549.87 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8590.01** | $-1090.97 | $-319.02 | 94 | 43% | $-1285.09 | 18 |
| mm_strong | **$8192.18** | $-1227.41 | $-580.41 | 93 | 46% | $-1431.36 | 25 |
| mm_sports_v2 | **$7992.82** | $-1810.73 | $-196.45 | 83 | 45% | $-2029.86 | 21 |
| momentum | **$7889.37** | $-1376.42 | $-734.21 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7051.57** | $-2574.37 | $-374.06 | 190 | 47% | $-2777.4 | 12 |
| whale_fade | **$6680.01** | $-2848.81 | $-471.18 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8995.85** | $-931.5 | $-72.65 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5084.82** | $-4791.55 | $-123.63 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 79 | 2 | 59% | 2.94¢ |
| maker_sports | 202 | 127 | 5 | 61% | 1.55¢ |

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
