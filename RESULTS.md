# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34505 · Last run: 2026-08-06T15:59:00.200Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10294.64** | $46.83 | $247.81 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10244.43** | $513.6 | $-269.17 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10229** | $640.15 | $-411.15 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10159.72** | $0 | $159.72 | 0 | — | $0 | 12 |
| mm_tight | **$10096.92** | $39.37 | $57.55 | 455 | 53% | $-169.73 | 19 |
| maker_flat | **$10082.03** | $0 | $82.03 | 0 | — | $0 | 11 |
| copy_top | **$9970.73** | $-219.6 | $190.33 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9883.03** | $25.97 | $-142.94 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9798.5** | $-706.11 | $504.61 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9719.56** | $-117.16 | $-163.28 | 52 | 52% | $-307.98 | 25 |
| strong_dip | **$9645.33** | $-517.26 | $162.59 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9643.6** | $-72.84 | $-283.56 | 197 | 53% | $-281.94 | 5 |
| mm_cheap_v2 | **$9642.76** | $-324.33 | $-32.91 | 56 | 52% | $-515.15 | 25 |
| ai_judge | **$9375.95** | $-587.64 | $-36.41 | 7 | 14% | $-600 | 2 |
| random_control | **$9128.53** | $-979.49 | $108.02 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8943.08** | $-912.05 | $-144.87 | 536 | 54% | $-1131.18 | 22 |
| mm_slow | **$8580.64** | $-809.59 | $-609.77 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8272.15** | $-1184.03 | $-543.82 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7935.9** | $-1421.89 | $-642.21 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7763.52** | $-2136.77 | $-99.71 | 106 | 45% | $-2355.9 | 21 |
| whale_fade | **$6714.62** | $-2758.9 | $-526.48 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9419.64** | $-730.36 | $150 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.22** | $-931.5 | $-70.28 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8134.24** | $-1390.97 | $-474.79 | 97 | 41% | $-1585.09 | 21 |
| maker_sports_badsim (retired) | **$6754.19** | $-3134.28 | $-111.53 | 206 | 46% | $-3337.31 | 11 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 11 | 0 | 0 | 100% | 2.84¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 12 | 0 | 0 | 100% | 1.42¢ |
| maker_sports_badsim | 217 | 137 | 1 | 61% | 1.59¢ |

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
