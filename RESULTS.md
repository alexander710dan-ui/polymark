# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30087 · Last run: 2026-08-04T22:26:25.430Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11367.99** | $1398.58 | $-30.59 | 389 | 57% | $1179.45 | 22 |
| mm_tight | **$11096.6** | $1282.02 | $-185.42 | 338 | 55% | $1078.99 | 15 |
| mid_momentum | **$10386.86** | $862.6 | $-475.74 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10376.14** | $954.47 | $-578.33 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10015.41** | $-193.36 | $208.77 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10004.06** | $-438.03 | $442.09 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9914.06** | $70.07 | $-156.01 | 111 | 95% | $59.33 | 25 |
| strong_dip | **$9716.3** | $-463.45 | $179.75 | 99 | 60% | $-555.76 | 25 |
| super | **$9690.07** | $-592.35 | $282.42 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9625.56** | $-119.32 | $-255.12 | 147 | 54% | $-286.44 | 3 |
| maker_sports | **$9477.99** | $-493.07 | $-28.94 | 92 | 51% | $-678.78 | 12 |
| ai_judge | **$9395.95** | $-587.64 | $-16.41 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9232.17** | $-643.81 | $-124.02 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9127.01** | $-468.35 | $-404.64 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8866.3** | $-857.37 | $-276.33 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8615.05** | $-924.82 | $-460.13 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8210.48** | $-1041.81 | $-747.71 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7056.81** | $-2370.75 | $-572.44 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9008.45** | $-931.5 | $-60.05 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8459.58** | $-1937.09 | $396.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 44 | 1 | 62% | 2.94¢ |
| maker_sports | 104 | 64 | 3 | 62% | 1.59¢ |

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
