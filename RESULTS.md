# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22493 · Last run: 2026-08-02T02:31:08.514Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10458.04** | $658.57 | $-200.53 | 179 | 58% | $445.09 | 25 |
| copy_top | **$10235.14** | $309.68 | $-74.54 | 357 | 53% | $-1018.89 | 15 |
| mm_sports | **$10188.01** | $593.29 | $-405.28 | 184 | 58% | $390.26 | 22 |
| copy_pro | **$10115.38** | $-39.08 | $154.46 | 338 | 51% | $-889.08 | 22 |
| fade_longshot | **$9960.56** | $117.48 | $-156.92 | 102 | 96% | $106.74 | 25 |
| mm_cheap | **$9944.91** | $288.71 | $-343.8 | 11 | 73% | $150.61 | 25 |
| strong_dip | **$9938.04** | $-471.26 | $409.3 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9920.77** | $589.59 | $-668.82 | 159 | 56% | $386.56 | 19 |
| super | **$9655.17** | $-472.29 | $127.46 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9410.95** | $-487.64 | $-101.41 | 6 | 17% | $-500 | 3 |
| mm_max | **$9139.48** | $-705.34 | $-155.18 | 52 | 48% | $-822.73 | 4 |
| random_control | **$9084.63** | $-423.46 | $-491.91 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8956.05** | $-851.81 | $-192.14 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8527.31** | $-782.78 | $-689.91 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8236.93** | $-1173.23 | $-589.84 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7110.43** | $-2947.24 | $57.67 | 358 | 47% | $-3282.02 | 15 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
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
