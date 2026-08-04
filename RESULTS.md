# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30161 · Last run: 2026-08-04T23:07:37.934Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11296.07** | $1342.59 | $-46.52 | 391 | 57% | $1123.46 | 21 |
| mm_tight | **$11023.12** | $1187.09 | $-163.97 | 341 | 55% | $984.06 | 13 |
| mid_momentum | **$10395.81** | $862.6 | $-466.79 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10375.18** | $954.47 | $-579.29 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10027.11** | $-193.36 | $220.47 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9953.4** | $-438.03 | $391.43 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9917.76** | $77.6 | $-159.84 | 112 | 96% | $66.86 | 25 |
| super | **$9722.04** | $-592.35 | $314.39 | 69 | 46% | $-808.2 | 14 |
| strong_dip | **$9717.83** | $-463.45 | $181.28 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9637.33** | $-324.37 | $-38.3 | 149 | 53% | $-491.49 | 2 |
| maker_sports | **$9429.98** | $-643.82 | $73.8 | 95 | 51% | $-829.53 | 9 |
| ai_judge | **$9396.03** | $-587.64 | $-16.33 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9232.37** | $-616.54 | $-151.09 | 59 | 42% | $-810.66 | 14 |
| mm_slow | **$9121.6** | $-468.35 | $-410.05 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8848.05** | $-957.37 | $-194.58 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8613.47** | $-924.82 | $-461.71 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8202.49** | $-1041.81 | $-755.7 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7060.22** | $-2370.75 | $-569.03 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9013.71** | $-931.5 | $-54.79 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8436.25** | $-1937.09 | $373.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5094.53** | $-4791.55 | $-113.92 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 45 | 0 | 62% | 2.94¢ |
| maker_sports | 104 | 65 | 3 | 62% | 1.59¢ |

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
