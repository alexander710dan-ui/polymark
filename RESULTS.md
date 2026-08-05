# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31595 · Last run: 2026-08-05T12:25:31.770Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11089.3** | $1146.5 | $-57.2 | 423 | 56% | $927.37 | 20 |
| mm_tight | **$11053.39** | $925.41 | $127.98 | 364 | 54% | $722.38 | 13 |
| mid_momentum | **$10747.66** | $967.28 | $-219.62 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10500.22** | $887.82 | $-387.6 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10043.09** | $0 | $43.09 | 0 | — | $0 | 15 |
| mm_sports_v2 | **$9938.52** | $-102.1 | $40.62 | 1 | 0% | $0 | 5 |
| mid_momentum_v2 | **$9925.96** | $-102.1 | $28.06 | 1 | 0% | $0 | 17 |
| fade_longshot | **$9919.33** | $109.23 | $-189.9 | 117 | 96% | $98.49 | 25 |
| super | **$9888.42** | $-425.73 | $314.15 | 73 | 48% | $-641.58 | 11 |
| copy_top | **$9805.17** | $-374.75 | $179.92 | 409 | 52% | $-1703.32 | 24 |
| copy_pro | **$9587.14** | $-732.88 | $320.02 | 389 | 51% | $-1582.88 | 25 |
| mm_max | **$9479.86** | $-517.02 | $-3.12 | 160 | 53% | $-684.14 | 2 |
| strong_dip | **$9447.71** | $-528.32 | $-23.97 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9374.92** | $-587.64 | $-37.44 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9180.25** | $-643.79 | $-175.96 | 119 | 51% | $-846.82 | 10 |
| mm_slow | **$9115.19** | $-516.83 | $-367.98 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8865.59** | $-955.81 | $-178.6 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8753.73** | $-876.62 | $-369.65 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8533.89** | $-1358.9 | $-107.21 | 74 | 39% | $-1553.02 | 15 |
| momentum | **$8217.67** | $-1076.77 | $-705.56 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7297.42** | $-2148.86 | $-553.72 | 410 | 48% | $-2503.41 | 24 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.47** | $-931.5 | $-66.03 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8499.58** | $-1937.09 | $436.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 89 | 61 | 2 | 59% | 2.97¢ |
| maker_sports | 129 | 86 | 2 | 60% | 1.6¢ |

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
