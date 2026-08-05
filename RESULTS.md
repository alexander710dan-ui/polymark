# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32344 · Last run: 2026-08-05T19:32:24.597Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10935.4** | $932.41 | $2.99 | 387 | 54% | $729.38 | 17 |
| mid_momentum | **$10645.75** | $867.28 | $-221.53 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10498.28** | $887.82 | $-389.54 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10282.77** | $576.93 | $-294.16 | 453 | 56% | $357.8 | 22 |
| fade_longshot | **$9946.03** | $123.32 | $-177.29 | 121 | 96% | $112.58 | 25 |
| super | **$9941.81** | $-425.73 | $367.54 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9862.31** | $-199.63 | $61.94 | 14 | 50% | $-311.55 | 25 |
| mid_momentum_v2 | **$9814.81** | $-208.56 | $23.37 | 16 | 50% | $-320.48 | 25 |
| mm_max | **$9776.58** | $-229.22 | $5.8 | 169 | 54% | $-396.34 | 4 |
| copy_top | **$9736.97** | $-472.32 | $209.29 | 411 | 52% | $-1800.89 | 25 |
| strong_dip | **$9522.73** | $-482.76 | $5.49 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9368.26** | $-587.64 | $-44.1 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9222.42** | $-1348.73 | $571.15 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8983.51** | $-1012.4 | $-4.09 | 142 | 56% | $-1626.69 | 25 |
| mm_sports_v2 | **$8959.69** | $-662.81 | $-377.5 | 20 | 40% | $-788.83 | 22 |
| mm_slow | **$8957.51** | $-516.83 | $-525.66 | 55 | 53% | $-702.54 | 25 |
| maker_flat | **$8694.91** | $-1130.82 | $-174.27 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8678.36** | $-876.62 | $-445.02 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8484.56** | $-1164.82 | $-350.62 | 140 | 49% | $-1367.85 | 17 |
| momentum | **$8233.41** | $-1059.12 | $-707.47 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7134.28** | $-2155.23 | $-710.49 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.82** | $-931.5 | $-69.68 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 65 | 2 | 60% | 2.99¢ |
| maker_sports | 157 | 102 | 2 | 61% | 1.61¢ |

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
