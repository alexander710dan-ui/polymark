# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22486 · Last run: 2026-08-02T02:27:43.507Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10455.29** | $658.57 | $-203.28 | 179 | 58% | $445.09 | 25 |
| copy_top | **$10283.13** | $196.91 | $86.22 | 356 | 53% | $-1131.66 | 16 |
| mm_sports | **$10187.37** | $508.1 | $-320.73 | 183 | 58% | $305.07 | 23 |
| copy_pro | **$10145.87** | $-39.08 | $184.95 | 338 | 51% | $-889.08 | 22 |
| fade_longshot | **$9955.91** | $117.48 | $-161.57 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9947.74** | $-471.26 | $419 | 92 | 59% | $-563.57 | 25 |
| mm_cheap | **$9925.99** | $288.71 | $-362.72 | 11 | 73% | $150.61 | 25 |
| mm_tight | **$9900.87** | $504.4 | $-603.53 | 158 | 56% | $301.37 | 20 |
| super | **$9643.86** | $-472.29 | $116.15 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9410.95** | $-487.64 | $-101.41 | 6 | 17% | $-500 | 3 |
| mm_max | **$9125.39** | $-787.16 | $-87.45 | 51 | 47% | $-904.55 | 5 |
| random_control | **$9116.85** | $-423.46 | $-459.69 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8974.43** | $-851.81 | $-173.76 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8516.6** | $-782.78 | $-700.62 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8244.59** | $-1173.23 | $-582.18 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7059.27** | $-2847.24 | $-93.49 | 357 | 47% | $-3182.02 | 16 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.2** | $-1003.53 | $44.73 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8279.96** | $-1837.09 | $117.05 | 145 | 26% | $-3864.75 | 2 |
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
