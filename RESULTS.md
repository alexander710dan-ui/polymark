# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30229 · Last run: 2026-08-04T23:45:31.672Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11167.59** | $1340.09 | $-172.5 | 392 | 56% | $1120.96 | 25 |
| mm_tight | **$10909.35** | $1184.59 | $-275.24 | 342 | 54% | $981.56 | 17 |
| mid_momentum | **$10423.6** | $860.1 | $-436.5 | 202 | 57% | $646.62 | 25 |
| mm_cheap | **$10405.65** | $951.97 | $-546.32 | 32 | 69% | $774.19 | 25 |
| copy_top | **$10173.37** | $-193.36 | $366.73 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10039.92** | $-438.03 | $477.95 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9915.75** | $77.6 | $-161.85 | 112 | 96% | $66.86 | 25 |
| super | **$9773.57** | $-592.35 | $365.92 | 69 | 46% | $-808.2 | 14 |
| strong_dip | **$9702.83** | $-467.86 | $170.69 | 100 | 59% | $-560.17 | 24 |
| mm_max | **$9637.56** | $-324.37 | $-38.07 | 149 | 53% | $-491.49 | 3 |
| ai_judge | **$9397.15** | $-587.64 | $-15.21 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9322.42** | $-643.82 | $-33.76 | 95 | 51% | $-829.53 | 12 |
| maker_flat | **$9210.74** | $-616.54 | $-172.72 | 59 | 42% | $-810.66 | 15 |
| mm_slow | **$9127.15** | $-468.35 | $-404.5 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8851.41** | $-957.37 | $-191.22 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8650.99** | $-927.32 | $-421.69 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8198.61** | $-1044.31 | $-757.08 | 252 | 67% | $-1532.55 | 25 |
| whale_fade | **$6899.49** | $-2370.75 | $-729.76 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9014.29** | $-931.5 | $-54.21 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8432.91** | $-1937.09 | $370 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 74 | 45 | 1 | 62% | 2.97¢ |
| maker_sports | 107 | 67 | 7 | 61% | 1.62¢ |

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
