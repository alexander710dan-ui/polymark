# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33617 · Last run: 2026-08-06T07:21:02.684Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10422.28** | $431.69 | $-9.41 | 430 | 53% | $222.59 | 8 |
| mm_cheap | **$10358.89** | $685.62 | $-326.73 | 37 | 62% | $507.84 | 25 |
| mid_momentum | **$10344.54** | $559.07 | $-214.53 | 215 | 56% | $345.59 | 25 |
| super | **$10338.13** | $46.83 | $291.3 | 79 | 51% | $-217.5 | 11 |
| copy_top | **$10119.67** | $-117.05 | $236.72 | 424 | 52% | $-1445.62 | 22 |
| fade_longshot | **$9861.55** | $25.97 | $-164.42 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9721.26** | $50.78 | $-329.52 | 42 | 52% | $-140.04 | 25 |
| mm_sports | **$9671.03** | $-218.44 | $-110.53 | 506 | 55% | $-437.57 | 10 |
| copy_pro | **$9659.39** | $-816.24 | $475.63 | 403 | 51% | $-1666.24 | 25 |
| mm_max | **$9655.51** | $-344.49 | $0 | 193 | 53% | $-553.59 | 0 |
| mm_cheap_v2 | **$9647.52** | $26.36 | $-378.84 | 46 | 54% | $-164.46 | 22 |
| strong_dip | **$9573.11** | $-596.83 | $169.94 | 107 | 59% | $-689.14 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9011.32** | $-1085.22 | $96.54 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8649.31** | $-1090.97 | $-259.72 | 94 | 43% | $-1285.09 | 17 |
| mm_slow | **$8640.29** | $-809.59 | $-550.12 | 62 | 50% | $-995.3 | 25 |
| mm_sports_v2 | **$8407.39** | $-1523.94 | $-68.67 | 76 | 45% | $-1743.07 | 8 |
| mm_strong | **$8288.9** | $-1125.11 | $-585.99 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$8000.09** | $-1376.42 | $-623.49 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7684.5** | $-2266.68 | $-48.82 | 185 | 48% | $-2469.71 | 6 |
| whale_fade | **$6604.32** | $-2848.81 | $-546.87 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.35** | $-931.5 | $-71.15 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.24** | $-4791.55 | $-109.21 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 111 | 76 | 1 | 59% | 2.95¢ |
| maker_sports | 191 | 121 | 1 | 61% | 1.55¢ |

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
