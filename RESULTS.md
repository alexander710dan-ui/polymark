# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32369 · Last run: 2026-08-05T19:46:19.166Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10961.85** | $932.41 | $29.44 | 387 | 54% | $729.38 | 18 |
| mid_momentum | **$10655.59** | $867.28 | $-211.69 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10491.71** | $887.82 | $-396.11 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10244.44** | $576.93 | $-332.49 | 453 | 56% | $357.8 | 23 |
| mm_cheap_v2 | **$10049.43** | $-199.63 | $249.06 | 14 | 50% | $-311.55 | 25 |
| mid_momentum_v2 | **$9979.58** | $-208.56 | $188.14 | 16 | 50% | $-320.48 | 25 |
| super | **$9978.39** | $-425.73 | $404.12 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9945.98** | $123.32 | $-177.34 | 121 | 96% | $112.58 | 25 |
| mm_max | **$9763.16** | $-229.22 | $-7.62 | 169 | 54% | $-396.34 | 4 |
| copy_top | **$9758.65** | $-472.32 | $230.97 | 411 | 52% | $-1800.89 | 25 |
| strong_dip | **$9516.21** | $-482.76 | $-1.03 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9360.56** | $-587.64 | $-51.8 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9285.09** | $-1348.73 | $633.82 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8977.65** | $-1012.4 | $-9.95 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8967.16** | $-516.83 | $-516.01 | 55 | 53% | $-702.54 | 25 |
| mm_sports_v2 | **$8939.59** | $-662.81 | $-397.6 | 20 | 40% | $-788.83 | 23 |
| maker_flat | **$8719.59** | $-1130.82 | $-149.59 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8686.32** | $-876.62 | $-437.06 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8491.89** | $-1164.82 | $-343.29 | 140 | 49% | $-1367.85 | 17 |
| momentum | **$8232.35** | $-1059.12 | $-708.53 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7101.9** | $-2155.23 | $-742.87 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.78** | $-931.5 | $-68.72 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 66 | 1 | 60% | 2.99¢ |
| maker_sports | 157 | 102 | 3 | 61% | 1.61¢ |

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
