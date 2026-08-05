# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30938 · Last run: 2026-08-05T06:19:57.224Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11164.99** | $1109.68 | $55.31 | 419 | 56% | $890.55 | 10 |
| mm_tight | **$11059.25** | $975.71 | $83.54 | 362 | 54% | $772.68 | 6 |
| mid_momentum | **$10779.47** | $967.28 | $-187.81 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10500.97** | $887.82 | $-386.85 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10017.13** | $-271.55 | $288.68 | 408 | 52% | $-1600.12 | 25 |
| copy_pro | **$9979.54** | $-578.08 | $557.62 | 388 | 51% | $-1428.08 | 24 |
| fade_longshot | **$9905.53** | $102.17 | $-196.64 | 116 | 96% | $91.43 | 25 |
| super | **$9894.34** | $-425.73 | $320.07 | 73 | 48% | $-641.58 | 11 |
| mm_max | **$9482.2** | $-517.02 | $-0.78 | 160 | 53% | $-684.14 | 1 |
| strong_dip | **$9419.78** | $-528.32 | $-51.9 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9396.97** | $-587.64 | $-15.39 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9372.17** | $-655.39 | $27.56 | 116 | 51% | $-858.42 | 3 |
| mm_slow | **$9124.98** | $-516.83 | $-358.19 | 55 | 53% | $-702.54 | 25 |
| maker_flat | **$8992.86** | $-917.63 | $-89.51 | 68 | 41% | $-1111.75 | 14 |
| random_control | **$8946.8** | $-955.81 | $-97.39 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8776.18** | $-876.62 | $-347.2 | 81 | 48% | $-1080.57 | 25 |
| momentum | **$8211.82** | $-1076.77 | $-711.41 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7187.7** | $-2200.96 | $-611.34 | 409 | 48% | $-2555.51 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.91** | $-931.5 | $-64.59 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.57** | $-4791.55 | $-106.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 82 | 50 | 3 | 62% | 2.96¢ |
| maker_sports | 119 | 74 | 4 | 62% | 1.6¢ |

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
