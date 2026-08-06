# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34044 · Last run: 2026-08-06T11:18:45.671Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10311.1** | $46.83 | $264.27 | 79 | 51% | $-217.5 | 11 |
| mid_momentum | **$10215.67** | $559.07 | $-343.4 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10207.17** | $685.62 | $-478.45 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10031.87** | $-117.05 | $148.92 | 424 | 52% | $-1445.62 | 22 |
| fade_longshot | **$9871.45** | $25.97 | $-154.52 | 123 | 95% | $15.23 | 25 |
| mm_tight | **$9869.15** | $348.87 | $-479.72 | 435 | 53% | $139.77 | 19 |
| strong_dip | **$9646.74** | $-517.26 | $164 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9584.02** | $-344.49 | $-71.49 | 193 | 53% | $-553.59 | 2 |
| copy_pro | **$9384.79** | $-919.79 | $304.58 | 404 | 51% | $-1769.79 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9317.19** | $-233.02 | $-449.79 | 50 | 52% | $-423.84 | 25 |
| mid_momentum_v2 | **$9283.83** | $-188.11 | $-528.06 | 46 | 50% | $-378.93 | 25 |
| random_control | **$9130.85** | $-1085.22 | $216.07 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$9122.23** | $-402.88 | $-474.89 | 512 | 55% | $-622.01 | 23 |
| maker_flat | **$8644** | $-1090.97 | $-265.03 | 94 | 43% | $-1285.09 | 18 |
| mm_slow | **$8629.84** | $-809.59 | $-560.57 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8191.12** | $-1227.41 | $-581.47 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7879.39** | $-1376.42 | $-744.19 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7860.05** | $-1708.38 | $-431.57 | 82 | 45% | $-1927.51 | 21 |
| maker_sports | **$6948.61** | $-2474.37 | $-577.02 | 189 | 47% | $-2677.4 | 13 |
| whale_fade | **$6681.96** | $-2848.81 | $-469.23 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.99** | $-931.5 | $-71.51 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 79 | 2 | 59% | 2.94¢ |
| maker_sports | 202 | 126 | 3 | 62% | 1.55¢ |

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
