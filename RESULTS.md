# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33910 · Last run: 2026-08-06T10:04:15.771Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10302.45** | $46.83 | $255.62 | 79 | 51% | $-217.5 | 11 |
| mm_cheap | **$10224.99** | $685.62 | $-460.63 | 37 | 62% | $507.84 | 25 |
| mid_momentum | **$10217.32** | $559.07 | $-341.75 | 215 | 56% | $345.59 | 25 |
| mm_tight | **$10203.62** | $504.85 | $-301.23 | 432 | 53% | $295.75 | 16 |
| copy_top | **$10084.34** | $-117.05 | $201.39 | 424 | 52% | $-1445.62 | 22 |
| fade_longshot | **$9872.81** | $25.97 | $-153.16 | 123 | 95% | $15.23 | 25 |
| strong_dip | **$9642.06** | $-596.83 | $238.89 | 107 | 59% | $-689.14 | 25 |
| copy_pro | **$9597.09** | $-816.24 | $413.33 | 403 | 51% | $-1666.24 | 25 |
| mm_max | **$9572.86** | $-344.49 | $-82.65 | 193 | 53% | $-553.59 | 2 |
| mm_sports | **$9466.03** | $-143.5 | $-390.47 | 508 | 55% | $-362.63 | 19 |
| mm_cheap_v2 | **$9423.42** | $26.36 | $-602.94 | 46 | 54% | $-164.46 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mid_momentum_v2 | **$9355.5** | $121.09 | $-765.59 | 43 | 53% | $-69.73 | 25 |
| random_control | **$9138.91** | $-1085.22 | $224.13 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8660.97** | $-1090.97 | $-248.06 | 94 | 43% | $-1285.09 | 18 |
| mm_slow | **$8653.36** | $-809.59 | $-537.05 | 62 | 50% | $-995.3 | 25 |
| mm_sports_v2 | **$8203.76** | $-1449 | $-347.24 | 78 | 46% | $-1668.13 | 17 |
| mm_strong | **$8185.51** | $-1125.11 | $-689.38 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7896.3** | $-1376.42 | $-727.28 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7230.63** | $-2174.37 | $-595 | 186 | 48% | $-2377.4 | 8 |
| whale_fade | **$6611.71** | $-2848.81 | $-539.48 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.11** | $-931.5 | $-71.39 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5088.99** | $-4791.55 | $-119.46 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 77 | 2 | 59% | 2.94¢ |
| maker_sports | 194 | 123 | 6 | 61% | 1.55¢ |

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
