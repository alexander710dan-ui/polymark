# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22508 · Last run: 2026-08-02T02:38:47.736Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10481.1** | $658.57 | $-177.47 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10315.16** | $543.29 | $-228.13 | 187 | 58% | $340.26 | 19 |
| copy_top | **$10248.62** | $209.68 | $38.94 | 358 | 53% | $-1118.89 | 14 |
| copy_pro | **$10175.56** | $-289.08 | $464.64 | 340 | 51% | $-1139.08 | 20 |
| mm_tight | **$10012.91** | $502.36 | $-489.45 | 162 | 56% | $299.33 | 16 |
| fade_longshot | **$9955.32** | $117.48 | $-162.16 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9945.05** | $-443.05 | $388.1 | 93 | 59% | $-535.36 | 25 |
| mm_cheap | **$9932.51** | $622.9 | $-690.39 | 13 | 77% | $445.12 | 25 |
| super | **$9648.61** | $-472.29 | $120.9 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9420.86** | $-487.64 | $-91.5 | 6 | 17% | $-500 | 3 |
| mm_max | **$9133.64** | $-705.34 | $-161.02 | 52 | 48% | $-822.73 | 5 |
| random_control | **$9078.93** | $-423.46 | $-497.61 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8962.39** | $-851.81 | $-185.8 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8527.79** | $-882.78 | $-589.43 | 60 | 47% | $-1086.73 | 25 |
| momentum | **$8239.59** | $-1173.23 | $-587.18 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7088.98** | $-2790.83 | $-120.19 | 359 | 47% | $-3125.61 | 14 |
| copy_month (retired) | **$9387.48** | $-777.42 | $164.9 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.24** | $-1003.53 | $44.77 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8273.3** | $-1837.09 | $110.39 | 145 | 26% | $-3864.75 | 2 |
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
