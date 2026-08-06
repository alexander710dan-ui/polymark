# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34402 · Last run: 2026-08-06T14:38:32.495Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10334.42** | $46.83 | $287.59 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10314.12** | $456.72 | $-142.6 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10289.11** | $583.27 | $-294.16 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10059.84** | $191.42 | $-131.58 | 447 | 53% | $-17.68 | 22 |
| copy_top | **$10001.82** | $-219.6 | $221.42 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9970.38** | $-242.96 | $213.33 | 194 | 53% | $-452.06 | 6 |
| fade_longshot | **$9857.27** | $25.97 | $-168.7 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9822.05** | $-1073.61 | $895.66 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9760.83** | $-174.04 | $-65.13 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9620.91** | $-517.26 | $138.17 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9579.62** | $-381.21 | $-39.17 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9143.49** | $-979.49 | $122.98 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8894.08** | $-678.47 | $-427.45 | 528 | 55% | $-897.6 | 24 |
| mm_slow | **$8664.43** | $-809.59 | $-525.98 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8439.06** | $-1290.97 | $-269.97 | 96 | 42% | $-1485.09 | 22 |
| mm_strong | **$8307.82** | $-1184.03 | $-508.15 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7933.82** | $-1478.77 | $-587.41 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7708.21** | $-1983.87 | $-307.92 | 98 | 46% | $-2203 | 23 |
| whale_fade | **$6725.46** | $-2758.9 | $-515.64 | 426 | 47% | $-3113.45 | 25 |
| maker_sports | **$6649.09** | $-2920.71 | $-430.2 | 199 | 46% | $-3123.74 | 16 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 118 | 83 | 2 | 59% | 2.9¢ |
| maker_sports | 215 | 135 | 5 | 61% | 1.59¢ |

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
