# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32336 · Last run: 2026-08-05T19:27:58.437Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10924.24** | $1035.41 | $-111.17 | 386 | 54% | $832.38 | 18 |
| mid_momentum | **$10642.38** | $867.28 | $-224.9 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10494.64** | $887.82 | $-393.18 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10273.46** | $634.47 | $-361.01 | 451 | 56% | $415.34 | 24 |
| super | **$9950.47** | $-425.73 | $376.2 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9942.96** | $120.58 | $-177.62 | 120 | 96% | $109.84 | 25 |
| mm_cheap_v2 | **$9828.84** | $-243.01 | $71.85 | 13 | 46% | $-354.93 | 25 |
| mid_momentum_v2 | **$9809.87** | $-249.92 | $59.79 | 15 | 47% | $-361.84 | 25 |
| mm_max | **$9794.35** | $-126.22 | $-79.43 | 168 | 54% | $-293.34 | 5 |
| copy_top | **$9704.73** | $-472.32 | $177.05 | 411 | 52% | $-1800.89 | 25 |
| strong_dip | **$9522.94** | $-482.76 | $5.7 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9363.3** | $-587.64 | $-49.06 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9162.59** | $-1348.73 | $511.32 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8986.58** | $-1012.4 | $-1.02 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8962.17** | $-516.83 | $-521 | 55 | 53% | $-702.54 | 25 |
| mm_sports_v2 | **$8939.47** | $-603.19 | $-457.34 | 18 | 39% | $-729.21 | 24 |
| maker_flat | **$8690.05** | $-1130.82 | $-179.13 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8677.45** | $-876.62 | $-445.93 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8463.67** | $-1109.75 | $-426.58 | 138 | 49% | $-1312.78 | 19 |
| momentum | **$8226.48** | $-1059.12 | $-714.4 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7172.6** | $-2155.23 | $-672.17 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.8** | $-931.5 | $-69.7 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
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
