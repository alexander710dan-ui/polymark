# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22530 · Last run: 2026-08-02T02:49:54.739Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10496.04** | $658.57 | $-162.53 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10335.04** | $543.29 | $-208.25 | 187 | 58% | $340.26 | 19 |
| copy_top | **$10305.33** | $209.68 | $95.65 | 358 | 53% | $-1118.89 | 14 |
| copy_pro | **$10252.02** | $-289.08 | $541.1 | 340 | 51% | $-1139.08 | 21 |
| mm_tight | **$9982.02** | $502.36 | $-520.34 | 162 | 56% | $299.33 | 16 |
| fade_longshot | **$9946.91** | $117.48 | $-170.57 | 102 | 96% | $106.74 | 25 |
| mm_cheap | **$9942.85** | $622.9 | $-680.05 | 13 | 77% | $445.12 | 25 |
| strong_dip | **$9941.45** | $-443.05 | $384.5 | 93 | 59% | $-535.36 | 25 |
| super | **$9639.68** | $-472.29 | $111.97 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9405.39** | $-487.64 | $-106.97 | 6 | 17% | $-500 | 3 |
| random_control | **$9137.65** | $-423.46 | $-438.89 | 117 | 59% | $-1037.75 | 25 |
| mm_max | **$9099.34** | $-705.34 | $-195.32 | 52 | 48% | $-822.73 | 6 |
| mm_slow | **$8980.32** | $-851.81 | $-167.87 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8542.45** | $-882.78 | $-574.77 | 60 | 47% | $-1086.73 | 25 |
| momentum | **$8225.87** | $-1173.23 | $-600.9 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7028.77** | $-2790.83 | $-180.4 | 359 | 47% | $-3125.61 | 14 |
| copy_month (retired) | **$9393.03** | $-777.42 | $170.45 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9038.26** | $-1003.53 | $41.79 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8296.63** | $-1837.09 | $133.72 | 145 | 26% | $-3864.75 | 2 |
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
