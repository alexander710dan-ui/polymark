# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28097 · Last run: 2026-08-04T03:59:16.349Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11138.67** | $1130.23 | $8.44 | 337 | 56% | $927.2 | 13 |
| mm_tight | **$10828.93** | $660.68 | $168.25 | 293 | 54% | $457.65 | 9 |
| mm_cheap | **$10550.73** | $904.81 | $-354.08 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10363.25** | $679.34 | $-316.09 | 198 | 58% | $465.86 | 25 |
| fade_longshot | **$9971.25** | $47.31 | $-76.06 | 107 | 95% | $36.57 | 25 |
| copy_top | **$9964.34** | $-27.47 | $-8.19 | 396 | 52% | $-1356.04 | 20 |
| maker_flat | **$9941.7** | $-139.82 | $81.52 | 26 | 46% | $-317.6 | 12 |
| strong_dip | **$9776.98** | $-463.45 | $240.43 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9647.89** | $-469.16 | $117.05 | 375 | 51% | $-1319.16 | 22 |
| super | **$9607.39** | $-353.9 | $-38.71 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9501.05** | $-393.14 | $-105.81 | 121 | 52% | $-512.61 | 3 |
| maker_sports | **$9433.65** | $-592.88 | $26.53 | 50 | 48% | $-778.59 | 6 |
| ai_judge | **$9423.98** | $-587.64 | $11.62 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9130.93** | $-624.29 | $-244.78 | 51 | 51% | $-810 | 25 |
| random_control | **$9015.79** | $-457.3 | $-526.91 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8584.94** | $-891.06 | $-524 | 73 | 48% | $-1095.01 | 24 |
| momentum | **$8293.82** | $-1136.32 | $-569.86 | 248 | 67% | $-1624.56 | 25 |
| whale_fade | **$7247.61** | $-2376.95 | $-375.44 | 397 | 47% | $-2731.5 | 20 |
| copy_month (retired) | **$9382.14** | $-730.36 | $112.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.97** | $-942.24 | $-19.79 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.25** | $-1937.09 | $243.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5090.7** | $-4691.55 | $-217.75 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 1 | 60% | 2.96¢ |
| maker_sports | 56 | 28 | 2 | 67% | 1.61¢ |

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
