# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34423 · Last run: 2026-08-06T15:18:27.202Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10327.36** | $46.83 | $280.53 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10287.96** | $456.72 | $-168.76 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10263.3** | $583.27 | $-319.97 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10122.92** | $259.49 | $-136.57 | 451 | 53% | $50.39 | 20 |
| maker_flat | **$10045.18** | $0 | $45.18 | 0 | — | $0 | 6 |
| maker_sports | **$10038.38** | $0 | $38.38 | 0 | — | $0 | 8 |
| copy_top | **$9996.67** | $-219.6 | $216.27 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9918.3** | $29.41 | $-111.11 | 196 | 54% | $-179.69 | 4 |
| fade_longshot | **$9865.19** | $25.97 | $-160.78 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9799.44** | $-1073.61 | $873.05 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9757.98** | $-174.04 | $-67.98 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9636.32** | $-517.26 | $153.58 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9537.3** | $-381.21 | $-81.49 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9371.5** | $-587.64 | $-40.86 | 7 | 14% | $-600 | 2 |
| random_control | **$9132.56** | $-979.49 | $112.05 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8937.51** | $-691.33 | $-371.16 | 532 | 55% | $-910.46 | 22 |
| mm_slow | **$8640.43** | $-809.59 | $-549.98 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8319.74** | $-1184.03 | $-496.23 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7925.08** | $-1478.77 | $-596.15 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7761.81** | $-1915.8 | $-322.39 | 102 | 46% | $-2134.93 | 21 |
| whale_fade | **$6725.64** | $-2758.9 | $-515.46 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8995.87** | $-931.5 | $-72.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8333.12** | $-1290.97 | $-375.91 | 96 | 42% | $-1485.09 | 22 |
| maker_sports_badsim (retired) | **$6750.4** | $-2926.59 | $-323.01 | 202 | 46% | $-3129.62 | 15 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 6 | 0 | 0 | 100% | 2.7¢ |
| maker_flat_badsim | 118 | 84 | 1 | 58% | 2.9¢ |
| maker_sports | 8 | 0 | 0 | 100% | 1.63¢ |
| maker_sports_badsim | 217 | 135 | 3 | 62% | 1.59¢ |

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
