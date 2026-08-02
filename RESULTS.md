# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22500 · Last run: 2026-08-02T02:34:51.132Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10454.97** | $658.57 | $-203.6 | 179 | 58% | $445.09 | 25 |
| copy_top | **$10208.15** | $209.68 | $-1.53 | 358 | 53% | $-1118.89 | 14 |
| mm_sports | **$10201.33** | $593.29 | $-391.96 | 184 | 58% | $390.26 | 22 |
| copy_pro | **$10110.13** | $-139.08 | $249.21 | 339 | 51% | $-989.08 | 21 |
| fade_longshot | **$9962.82** | $117.48 | $-154.66 | 102 | 96% | $106.74 | 25 |
| mm_cheap | **$9946.28** | $288.71 | $-342.43 | 11 | 73% | $150.61 | 25 |
| strong_dip | **$9940.27** | $-471.26 | $411.53 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9934.1** | $589.59 | $-655.49 | 159 | 56% | $386.56 | 19 |
| super | **$9665.58** | $-472.29 | $137.87 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9408.73** | $-487.64 | $-103.63 | 6 | 17% | $-500 | 3 |
| mm_max | **$9153.02** | $-705.34 | $-141.64 | 52 | 48% | $-822.73 | 5 |
| random_control | **$9095.91** | $-423.46 | $-480.63 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8948.66** | $-851.81 | $-199.53 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8517.59** | $-782.78 | $-699.63 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8237.82** | $-1173.23 | $-588.95 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7126.91** | $-2790.83 | $-82.26 | 359 | 47% | $-3125.61 | 14 |
| copy_month (retired) | **$9381.92** | $-777.42 | $159.34 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9040.03** | $-1003.53 | $43.56 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8286.63** | $-1837.09 | $123.72 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5082.37** | $-4691.55 | $-226.08 | 81 | 2% | $-6591.55 | 3 |

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
