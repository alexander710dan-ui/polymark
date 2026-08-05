# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31637 · Last run: 2026-08-05T12:48:50.323Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10984.98** | $925.41 | $59.57 | 364 | 54% | $722.38 | 17 |
| mm_sports | **$10973.55** | $1146.5 | $-172.95 | 423 | 56% | $927.37 | 25 |
| mid_momentum | **$10699.97** | $967.28 | $-267.31 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10484.38** | $887.82 | $-403.44 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9933.47** | $109.23 | $-175.76 | 117 | 96% | $98.49 | 25 |
| mm_cheap_v2 | **$9887.57** | $0 | $-112.43 | 0 | — | $0 | 19 |
| super | **$9874.8** | $-425.73 | $300.53 | 73 | 48% | $-641.58 | 11 |
| mm_sports_v2 | **$9826.71** | $-102.1 | $-71.19 | 1 | 0% | $0 | 10 |
| copy_top | **$9794.79** | $-374.75 | $169.54 | 409 | 52% | $-1703.32 | 25 |
| mid_momentum_v2 | **$9770.59** | $-102.1 | $-127.31 | 1 | 0% | $0 | 22 |
| copy_pro | **$9587.94** | $-732.88 | $320.82 | 389 | 51% | $-1582.88 | 25 |
| mm_max | **$9507.39** | $-517.02 | $24.41 | 160 | 53% | $-684.14 | 3 |
| strong_dip | **$9475.27** | $-528.32 | $3.59 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9377.15** | $-587.64 | $-35.21 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9093.78** | $-643.79 | $-262.43 | 119 | 51% | $-846.82 | 12 |
| mm_slow | **$9070.04** | $-516.83 | $-413.13 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8856.95** | $-955.81 | $-187.24 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8707.25** | $-876.62 | $-416.13 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8414.76** | $-1358.9 | $-226.34 | 74 | 39% | $-1553.02 | 17 |
| momentum | **$8216.6** | $-1076.77 | $-706.63 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7289.68** | $-2148.86 | $-561.46 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.59** | $-931.5 | $-64.91 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 0 | 60% | 3.02¢ |
| maker_sports | 131 | 86 | 5 | 60% | 1.61¢ |

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
