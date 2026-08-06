# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34621 · Last run: 2026-08-06T16:56:37.845Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10298.32** | $-63.35 | $361.67 | 458 | 53% | $-272.45 | 21 |
| maker_flat | **$10266.52** | $-11.32 | $277.84 | 2 | 50% | $-100 | 12 |
| maker_sports | **$10256.84** | $-7.69 | $264.53 | 2 | 50% | $-100 | 17 |
| mid_momentum | **$10129.44** | $513.6 | $-384.16 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10123.65** | $640.15 | $-516.5 | 39 | 62% | $462.37 | 25 |
| super | **$10117.29** | $46.83 | $70.46 | 79 | 51% | $-217.5 | 14 |
| fade_longshot | **$9888.42** | $25.97 | $-137.55 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9856.81** | $-219.6 | $76.41 | 425 | 52% | $-1548.17 | 25 |
| copy_pro | **$9711.58** | $-706.11 | $417.69 | 406 | 51% | $-1556.11 | 25 |
| strong_dip | **$9671.63** | $-517.26 | $188.89 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9617.9** | $-276.89 | $-105.21 | 199 | 53% | $-485.99 | 3 |
| mid_momentum_v2 | **$9576.69** | $-2.47 | $-420.84 | 53 | 53% | $-193.29 | 25 |
| mm_cheap_v2 | **$9487.87** | $-312.04 | $-200.09 | 58 | 52% | $-502.86 | 25 |
| ai_judge | **$9371.68** | $-587.64 | $-40.68 | 7 | 14% | $-600 | 2 |
| random_control | **$9090.61** | $-979.49 | $70.1 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8994.05** | $-1217.9 | $211.95 | 539 | 54% | $-1437.03 | 24 |
| mm_slow | **$8570.26** | $-809.59 | $-620.15 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8219.44** | $-1184.03 | $-596.53 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7852.45** | $-1421.89 | $-725.66 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7815.8** | $-2442.82 | $258.62 | 109 | 44% | $-2661.95 | 23 |
| whale_fade | **$6830.97** | $-2758.9 | $-410.13 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.38** | $-931.5 | $-62.12 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8185.91** | $-1590.97 | $-223.12 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6655.71** | $-3434.28 | $89.99 | 209 | 45% | $-3637.31 | 8 |
| longshot (retired) | **$5073.53** | $-4791.55 | $-134.92 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 14 | 0 | 0 | 100% | 3.09¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 19 | 0 | 0 | 100% | 1.37¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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
