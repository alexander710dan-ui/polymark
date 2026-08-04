# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30003 · Last run: 2026-08-04T21:39:46.815Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11425.06** | $1244.78 | $180.28 | 384 | 56% | $1025.65 | 24 |
| mm_tight | **$11112.57** | $1350.47 | $-237.9 | 334 | 55% | $1147.44 | 17 |
| mm_cheap | **$10389.81** | $954.47 | $-564.66 | 31 | 71% | $776.69 | 25 |
| mid_momentum | **$10378.36** | $862.6 | $-484.24 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10028.08** | $-193.36 | $221.44 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10003.97** | $-588.91 | $592.88 | 381 | 51% | $-1438.91 | 25 |
| fade_longshot | **$9910.61** | $70.07 | $-159.46 | 111 | 95% | $59.33 | 25 |
| strong_dip | **$9712.14** | $-463.45 | $175.59 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9707.63** | $-103.35 | $-189.02 | 145 | 54% | $-270.47 | 4 |
| super | **$9706.8** | $-592.35 | $299.15 | 69 | 46% | $-808.2 | 14 |
| maker_sports | **$9530.43** | $-670.51 | $200.94 | 87 | 49% | $-856.22 | 15 |
| ai_judge | **$9398.17** | $-587.64 | $-14.19 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9132.98** | $-468.35 | $-398.67 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9113.79** | $-814.08 | $-72.13 | 56 | 41% | $-1008.2 | 16 |
| random_control | **$8863.5** | $-857.37 | $-279.13 | 133 | 56% | $-1471.66 | 25 |
| mm_strong | **$8627.56** | $-924.82 | $-447.62 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8209.61** | $-1041.81 | $-748.58 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7055.66** | $-2370.75 | $-573.59 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9009.63** | $-931.5 | $-58.87 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5091.57** | $-4791.55 | $-116.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 72 | 43 | 2 | 63% | 2.96¢ |
| maker_sports | 102 | 61 | 4 | 63% | 1.58¢ |

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
