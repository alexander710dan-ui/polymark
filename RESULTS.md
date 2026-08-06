# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34408 · Last run: 2026-08-06T15:11:21.899Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10313.73** | $46.83 | $266.9 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10288.62** | $456.72 | $-168.1 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10261.73** | $583.27 | $-321.54 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10127.75** | $77.03 | $50.72 | 450 | 53% | $-132.07 | 20 |
| maker_sports | **$10000** | $0 | $0 | 0 | — | $0 | 5 |
| maker_flat | **$10000** | $0 | $0 | 0 | — | $0 | 3 |
| copy_top | **$9986.05** | $-219.6 | $205.65 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9903.39** | $-153.05 | $56.44 | 195 | 53% | $-362.15 | 5 |
| fade_longshot | **$9864.3** | $25.97 | $-161.67 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9797.52** | $-1073.61 | $871.13 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9745.94** | $-174.04 | $-80.02 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9635.34** | $-517.26 | $152.6 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9518.54** | $-381.21 | $-100.25 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9141.07** | $-979.49 | $120.56 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8943.24** | $-792.86 | $-263.9 | 531 | 54% | $-1011.99 | 22 |
| mm_slow | **$8637.74** | $-809.59 | $-552.67 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8309.69** | $-1184.03 | $-506.28 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7929.24** | $-1478.77 | $-591.99 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7768.82** | $-2098.26 | $-132.92 | 101 | 46% | $-2317.39 | 21 |
| whale_fade | **$6727.77** | $-2758.9 | $-513.33 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8312.09** | $-1290.97 | $-396.94 | 96 | 42% | $-1485.09 | 22 |
| maker_sports_badsim (retired) | **$6744.24** | $-3120.71 | $-135.05 | 201 | 46% | $-3323.74 | 16 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 3 | 0 | 0 | 100% | 2.73¢ |
| maker_flat_badsim | 118 | 84 | 1 | 58% | 2.9¢ |
| maker_sports | 5 | 0 | 1 | 100% | 1.6¢ |
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
