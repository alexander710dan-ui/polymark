# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22207 · Last run: 2026-08-02T00:08:03.103Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10507.12** | $611.51 | $-104.39 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10480.76** | $298.98 | $181.78 | 348 | 53% | $-1029.59 | 23 |
| mm_cheap | **$10132.25** | $157.17 | $-24.92 | 9 | 67% | $19.07 | 25 |
| copy_pro | **$10055.31** | $-219.84 | $275.15 | 331 | 51% | $-1069.84 | 25 |
| fade_longshot | **$10004.52** | $117.48 | $-112.96 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9842.85** | $-471.26 | $314.11 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9625.03** | $-3.59 | $-371.38 | 152 | 55% | $-206.62 | 22 |
| mm_sports | **$9549.4** | $-99.89 | $-350.71 | 178 | 57% | $-302.92 | 23 |
| ai_judge | **$9428.38** | $-487.64 | $-83.98 | 6 | 17% | $-500 | 3 |
| super | **$9352.66** | $-649.65 | $2.31 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9226.81** | $-768.98 | $-4.21 | 49 | 47% | $-886.37 | 2 |
| mm_slow | **$9003.73** | $-940.49 | $-55.78 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$8942.29** | $-540.85 | $-516.86 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8558.62** | $-782.78 | $-658.6 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8438.37** | $-1261.91 | $-299.72 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$6849.61** | $-2930.57 | $-219.82 | 349 | 47% | $-3265.35 | 23 |
| copy_month (retired) | **$9326.07** | $-777.42 | $103.49 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9068.35** | $-1003.53 | $71.88 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8140.47** | $-1837.09 | $-22.44 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5075.07** | $-4691.55 | $-233.38 | 81 | 2% | $-6591.55 | 3 |

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
