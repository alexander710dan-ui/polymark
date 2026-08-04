# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30064 · Last run: 2026-08-04T22:13:41.827Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11417.57** | $1278.83 | $138.74 | 387 | 56% | $1059.7 | 24 |
| mm_tight | **$11140.72** | $1384.52 | $-243.8 | 337 | 55% | $1181.49 | 16 |
| mm_cheap | **$10377.25** | $954.47 | $-577.22 | 31 | 71% | $776.69 | 25 |
| mid_momentum | **$10376.61** | $862.6 | $-485.99 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10014.6** | $-193.36 | $207.96 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9998.3** | $-438.03 | $436.33 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9912.94** | $70.07 | $-157.13 | 111 | 95% | $59.33 | 25 |
| strong_dip | **$9721.19** | $-463.45 | $184.64 | 99 | 60% | $-555.76 | 25 |
| super | **$9689.22** | $-592.35 | $281.57 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9657.6** | $-17.02 | $-325.38 | 146 | 54% | $-184.14 | 4 |
| maker_sports | **$9523.15** | $-621.95 | $145.1 | 90 | 50% | $-807.66 | 13 |
| ai_judge | **$9390.48** | $-587.64 | $-21.88 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9192.4** | $-643.81 | $-163.79 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9115.67** | $-468.35 | $-415.98 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8856.64** | $-857.37 | $-285.99 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8604.34** | $-924.82 | $-470.84 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8205.57** | $-1041.81 | $-752.62 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7051.14** | $-2370.75 | $-578.11 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9010.76** | $-931.5 | $-57.74 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 44 | 1 | 62% | 2.94¢ |
| maker_sports | 103 | 64 | 4 | 62% | 1.58¢ |

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
