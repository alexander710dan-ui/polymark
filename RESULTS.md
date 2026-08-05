# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30698 · Last run: 2026-08-05T04:06:30.070Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11086.6** | $795.9 | $290.7 | 415 | 56% | $576.77 | 9 |
| mm_tight | **$11057.09** | $838.02 | $219.07 | 358 | 54% | $634.99 | 7 |
| mid_momentum | **$10801.35** | $915.76 | $-114.41 | 205 | 58% | $702.28 | 25 |
| mm_cheap | **$10460.43** | $887.82 | $-427.39 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10044.4** | $-169.55 | $213.95 | 407 | 52% | $-1498.12 | 25 |
| copy_pro | **$10018.93** | $-167.38 | $186.31 | 386 | 52% | $-1017.38 | 25 |
| super | **$9916.79** | $-591.5 | $508.29 | 72 | 47% | $-807.35 | 12 |
| fade_longshot | **$9901.57** | $92.73 | $-191.16 | 115 | 96% | $81.99 | 25 |
| mm_max | **$9487.43** | $-488.01 | $-24.56 | 158 | 53% | $-655.13 | 2 |
| strong_dip | **$9471.67** | $-528.32 | $-0.01 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9394.75** | $-587.64 | $-17.61 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9348.73** | $-648.91 | $-2.36 | 112 | 51% | $-851.94 | 6 |
| mm_slow | **$9155.86** | $-468.35 | $-375.79 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9013.04** | $-717.63 | $-269.33 | 66 | 42% | $-911.75 | 15 |
| random_control | **$8976.74** | $-955.81 | $-67.45 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8793.73** | $-928.14 | $-278.13 | 80 | 48% | $-1132.09 | 25 |
| momentum | **$8229.93** | $-998.83 | $-771.24 | 258 | 68% | $-1487.07 | 25 |
| whale_fade | **$7249.26** | $-2341.91 | $-408.83 | 408 | 48% | $-2696.46 | 25 |
| copy_month (retired) | **$9426.59** | $-730.36 | $156.95 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.61** | $-931.5 | $-65.89 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 47 | 2 | 63% | 2.94¢ |
| maker_sports | 118 | 72 | 0 | 62% | 1.57¢ |

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
