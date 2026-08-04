# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30199 · Last run: 2026-08-04T23:28:48.410Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11217.97** | $1342.59 | $-124.62 | 391 | 57% | $1123.46 | 25 |
| mm_tight | **$10894.93** | $1187.09 | $-292.16 | 341 | 55% | $984.06 | 16 |
| mid_momentum | **$10408.1** | $862.6 | $-454.5 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10376.45** | $954.47 | $-578.02 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10093.76** | $-193.36 | $287.12 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9992.49** | $-438.03 | $430.52 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9911.57** | $77.6 | $-166.03 | 112 | 96% | $66.86 | 25 |
| super | **$9745.47** | $-592.35 | $337.82 | 69 | 46% | $-808.2 | 14 |
| strong_dip | **$9716.39** | $-463.45 | $179.84 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9561.91** | $-324.37 | $-113.72 | 149 | 53% | $-491.49 | 2 |
| maker_sports | **$9419.25** | $-643.82 | $63.07 | 95 | 51% | $-829.53 | 9 |
| ai_judge | **$9394.92** | $-587.64 | $-17.44 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9228.17** | $-616.54 | $-155.29 | 59 | 42% | $-810.66 | 14 |
| mm_slow | **$9121.28** | $-468.35 | $-410.37 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8852.83** | $-957.37 | $-189.8 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8624.92** | $-924.82 | $-450.26 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8206.87** | $-1041.81 | $-751.32 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$6965.42** | $-2370.75 | $-663.83 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9013.12** | $-931.5 | $-55.38 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5094.53** | $-4791.55 | $-113.92 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 45 | 1 | 62% | 2.94¢ |
| maker_sports | 104 | 66 | 8 | 61% | 1.59¢ |

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
