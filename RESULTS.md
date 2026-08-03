# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26676 · Last run: 2026-08-03T14:48:41.998Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11392.38** | $1236.17 | $156.21 | 272 | 57% | $1033.14 | 22 |
| mm_tight | **$10622.56** | $460.71 | $161.85 | 232 | 53% | $257.68 | 17 |
| mid_momentum | **$10319.42** | $608.28 | $-288.86 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10227.33** | $832.49 | $-605.16 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10030.98** | $-337.42 | $368.4 | 96 | 60% | $-429.73 | 25 |
| copy_pro | **$9984.29** | $-484.75 | $469.04 | 363 | 51% | $-1334.75 | 25 |
| fade_longshot | **$9964.43** | $34.52 | $-70.09 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9915.97** | $0 | $-84.03 | 0 | — | $0 | 4 |
| maker_sports | **$9899.13** | $0 | $-100.87 | 0 | — | $0 | 2 |
| copy_top | **$9618.78** | $-366.45 | $-14.77 | 382 | 52% | $-1695.02 | 25 |
| super | **$9540.36** | $-445.84 | $-13.8 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9492.45** | $-475.72 | $-31.83 | 77 | 49% | $-593.11 | 9 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9237.78** | $-310.74 | $-451.48 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8827.81** | $-821.03 | $-351.16 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8563.1** | $-1233.53 | $-203.37 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8191.73** | $-1339.53 | $-468.74 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7425.1** | $-2216.62 | $-358.28 | 383 | 48% | $-2571.17 | 25 |
| copy_month (retired) | **$9394.57** | $-777.42 | $171.99 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.66** | $-1003.53 | $33.19 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5097.12** | $-4691.55 | $-211.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 4 | 3 | 4 | 57% | 2.25¢ |
| maker_sports | 2 | 4 | 3 | 33% | 1¢ |

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
