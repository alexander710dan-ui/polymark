# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32192 · Last run: 2026-08-05T18:07:13.296Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11045.38** | $1039.32 | $6.06 | 383 | 54% | $836.29 | 16 |
| mid_momentum | **$10615.38** | $867.28 | $-251.9 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10487.85** | $887.82 | $-399.97 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10474.27** | $900.31 | $-426.04 | 447 | 56% | $681.18 | 24 |
| fade_longshot | **$9936.26** | $118.35 | $-182.09 | 119 | 96% | $107.61 | 25 |
| super | **$9895.49** | $-425.73 | $321.22 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9855.24** | $-265.99 | $121.23 | 166 | 54% | $-433.11 | 5 |
| copy_top | **$9685.23** | $-472.32 | $157.55 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9563.01** | $-140.86 | $-296.13 | 12 | 50% | $-252.78 | 25 |
| strong_dip | **$9524.08** | $-482.76 | $6.84 | 103 | 59% | $-575.07 | 25 |
| mid_momentum_v2 | **$9518.17** | $-351.45 | $-130.38 | 14 | 43% | $-463.37 | 25 |
| ai_judge | **$9373.73** | $-587.64 | $-38.63 | 7 | 14% | $-600 | 2 |
| mm_sports_v2 | **$9271.15** | $-337.35 | $-391.5 | 14 | 43% | $-463.37 | 22 |
| copy_pro | **$9209.98** | $-1348.73 | $558.71 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8985.43** | $-1012.4 | $-2.17 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8971.86** | $-516.83 | $-511.31 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8729.45** | $-1113.83 | $-156.72 | 136 | 49% | $-1316.86 | 13 |
| maker_flat | **$8662.3** | $-1134.9 | $-202.8 | 80 | 41% | $-1329.02 | 18 |
| mm_strong | **$8657.23** | $-876.62 | $-466.15 | 81 | 48% | $-1080.57 | 25 |
| momentum | **$8194.56** | $-1059.12 | $-746.32 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7274.34** | $-2155.23 | $-570.43 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.4** | $-931.5 | $-71.1 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 63 | 2 | 61% | 2.97¢ |
| maker_sports | 149 | 98 | 5 | 60% | 1.59¢ |

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
