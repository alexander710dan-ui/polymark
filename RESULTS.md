# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30072 · Last run: 2026-08-04T22:18:11.589Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11408.03** | $1322.21 | $85.82 | 388 | 56% | $1103.08 | 23 |
| mm_tight | **$11100.18** | $1282.02 | $-181.84 | 338 | 55% | $1078.99 | 15 |
| mm_cheap | **$10382.71** | $954.47 | $-571.76 | 31 | 71% | $776.69 | 25 |
| mid_momentum | **$10381.46** | $862.6 | $-481.14 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10016.24** | $-193.36 | $209.6 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10006.5** | $-438.03 | $444.53 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9911.81** | $70.07 | $-158.26 | 111 | 95% | $59.33 | 25 |
| strong_dip | **$9719.88** | $-463.45 | $183.33 | 99 | 60% | $-555.76 | 25 |
| super | **$9693.27** | $-592.35 | $285.62 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9654.29** | $-119.32 | $-226.39 | 147 | 54% | $-286.44 | 3 |
| maker_sports | **$9534.16** | $-574.89 | $109.05 | 91 | 51% | $-760.6 | 12 |
| ai_judge | **$9388.26** | $-587.64 | $-24.1 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9171.03** | $-643.81 | $-185.16 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9116.5** | $-468.35 | $-415.15 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8862.08** | $-857.37 | $-280.55 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8605.55** | $-924.82 | $-469.63 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8207.9** | $-1041.81 | $-750.29 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7049.95** | $-2370.75 | $-579.3 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9009.59** | $-931.5 | $-58.91 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8459.58** | $-1937.09 | $396.67 | 146 | 25% | $-3964.75 | 1 |
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
