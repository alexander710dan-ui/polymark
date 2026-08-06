# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34520 · Last run: 2026-08-06T16:06:32.383Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10328.45** | $46.83 | $281.62 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10282.11** | $513.6 | $-231.49 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10252.31** | $640.15 | $-387.84 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10211.45** | $-100 | $311.45 | 1 | 0% | $0 | 13 |
| mm_tight | **$10158.98** | $-63.13 | $222.11 | 456 | 53% | $-272.23 | 20 |
| maker_flat | **$10138.79** | $-100 | $238.79 | 1 | 0% | $0 | 11 |
| copy_top | **$9994.13** | $-219.6 | $213.73 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9880.83** | $25.97 | $-145.14 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9776.53** | $-706.11 | $482.64 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9745.94** | $-117.16 | $-136.9 | 52 | 52% | $-307.98 | 25 |
| mm_max | **$9703.9** | $-175.34 | $-120.76 | 198 | 53% | $-384.44 | 4 |
| mm_cheap_v2 | **$9671.31** | $-426.73 | $98.04 | 57 | 51% | $-617.55 | 25 |
| strong_dip | **$9649.34** | $-517.26 | $166.6 | 108 | 59% | $-609.57 | 25 |
| ai_judge | **$9370.48** | $-587.64 | $-41.88 | 7 | 14% | $-600 | 2 |
| random_control | **$9126.58** | $-979.49 | $106.07 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$9006.84** | $-1014.55 | $21.39 | 537 | 54% | $-1233.68 | 23 |
| mm_slow | **$8604.75** | $-809.59 | $-585.66 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8291.27** | $-1184.03 | $-524.7 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7970.4** | $-1421.89 | $-607.71 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7827.28** | $-2239.27 | $66.55 | 107 | 45% | $-2458.4 | 22 |
| whale_fade | **$6717.02** | $-2758.9 | $-524.08 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.53** | $-931.5 | $-67.97 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8512.91** | $-1937.09 | $450 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8187.71** | $-1490.97 | $-321.32 | 98 | 41% | $-1685.09 | 20 |
| maker_sports_badsim (retired) | **$6800.83** | $-3234.28 | $35.11 | 207 | 45% | $-3437.31 | 10 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 0 | 0 | 100% | 2.85¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 14 | 0 | 0 | 100% | 1.36¢ |
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
