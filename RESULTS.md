# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32231 · Last run: 2026-08-05T18:28:45.767Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10970.59** | $1080.68 | $-110.09 | 384 | 54% | $877.65 | 19 |
| mid_momentum | **$10662.46** | $867.28 | $-204.82 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10489.91** | $887.82 | $-397.91 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10479.1** | $941.67 | $-462.57 | 448 | 56% | $722.54 | 25 |
| fade_longshot | **$9939.17** | $118.35 | $-179.18 | 119 | 96% | $107.61 | 25 |
| super | **$9884.72** | $-425.73 | $310.45 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9845.51** | $-265.99 | $111.5 | 166 | 54% | $-433.11 | 6 |
| copy_top | **$9682.78** | $-472.32 | $155.1 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9599.76** | $-140.86 | $-259.38 | 12 | 50% | $-252.78 | 25 |
| mid_momentum_v2 | **$9579.84** | $-351.45 | $-68.71 | 14 | 43% | $-463.37 | 25 |
| strong_dip | **$9496.92** | $-482.76 | $-20.32 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mm_sports_v2 | **$9252.84** | $-295.99 | $-451.17 | 15 | 47% | $-422.01 | 25 |
| copy_pro | **$9159.63** | $-1348.73 | $508.36 | 393 | 51% | $-2198.73 | 25 |
| mm_slow | **$9027.48** | $-516.83 | $-455.69 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8963.73** | $-1012.4 | $-23.87 | 142 | 56% | $-1626.69 | 25 |
| mm_strong | **$8702.88** | $-876.62 | $-420.5 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8650.77** | $-1134.9 | $-214.33 | 80 | 41% | $-1329.02 | 19 |
| maker_sports | **$8642.83** | $-1113.83 | $-243.34 | 136 | 49% | $-1316.86 | 15 |
| momentum | **$8208.58** | $-1059.12 | $-732.3 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7232.66** | $-2155.23 | $-612.11 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9426.59** | $-730.36 | $156.95 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.12** | $-931.5 | $-70.38 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 63 | 3 | 61% | 2.99¢ |
| maker_sports | 151 | 98 | 8 | 61% | 1.62¢ |

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
