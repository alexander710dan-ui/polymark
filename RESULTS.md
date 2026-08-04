# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30050 · Last run: 2026-08-04T22:05:56.614Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11440.59** | $1380.93 | $59.66 | 386 | 56% | $1161.8 | 24 |
| mm_tight | **$11141.15** | $1486.62 | $-345.47 | 336 | 55% | $1283.59 | 15 |
| mm_cheap | **$10377.14** | $954.47 | $-577.33 | 31 | 71% | $776.69 | 25 |
| mid_momentum | **$10375.38** | $862.6 | $-487.22 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10017.1** | $-193.36 | $210.46 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9998.11** | $-438.03 | $436.14 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9913.68** | $70.07 | $-156.39 | 111 | 95% | $59.33 | 25 |
| strong_dip | **$9719.52** | $-463.45 | $182.97 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9707.66** | $-17.02 | $-275.32 | 146 | 54% | $-184.14 | 3 |
| super | **$9693.42** | $-592.35 | $285.77 | 69 | 46% | $-808.2 | 14 |
| maker_sports | **$9544.99** | $-521.95 | $66.94 | 89 | 51% | $-707.66 | 13 |
| ai_judge | **$9390.48** | $-587.64 | $-21.88 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9137.68** | $-643.81 | $-218.51 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9111.35** | $-468.35 | $-420.3 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8859.47** | $-857.37 | $-283.16 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8603.24** | $-924.82 | $-471.94 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8204.62** | $-1041.81 | $-753.57 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7048.82** | $-2370.75 | $-580.43 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9010.76** | $-931.5 | $-57.74 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 44 | 1 | 62% | 2.94¢ |
| maker_sports | 102 | 63 | 4 | 62% | 1.58¢ |

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
