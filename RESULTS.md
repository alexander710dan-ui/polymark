# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22582 · Last run: 2026-08-02T03:15:39.758Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10408.94** | $658.57 | $-249.63 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10189.43** | $143.29 | $46.14 | 191 | 57% | $-59.74 | 15 |
| mm_tight | **$10080.95** | $202.36 | $-121.41 | 165 | 55% | $-0.67 | 13 |
| copy_top | **$10077.88** | $9.68 | $68.2 | 360 | 52% | $-1318.89 | 12 |
| mm_cheap | **$10054.62** | $522.9 | $-468.28 | 14 | 71% | $345.12 | 25 |
| fade_longshot | **$9946.57** | $117.48 | $-170.91 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9946.55** | $-393.8 | $340.35 | 94 | 60% | $-486.11 | 25 |
| copy_pro | **$9914.82** | $-118.71 | $33.53 | 341 | 51% | $-968.71 | 20 |
| super | **$9771.29** | $-472.29 | $243.58 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9399.84** | $-487.64 | $-112.52 | 6 | 17% | $-500 | 3 |
| mm_max | **$9281.4** | $-705.34 | $-13.26 | 52 | 48% | $-822.73 | 6 |
| random_control | **$9043.13** | $-523.46 | $-433.41 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8883.56** | $-851.81 | $-264.63 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8600.35** | $-982.78 | $-416.87 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8150.28** | $-1173.23 | $-676.49 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7254.5** | $-2645.9 | $-99.6 | 361 | 47% | $-2980.68 | 12 |
| copy_month (retired) | **$9393.03** | $-777.42 | $170.45 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9035.32** | $-1003.53 | $38.85 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8313.3** | $-1837.09 | $150.39 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5079.24** | $-4691.55 | $-229.21 | 81 | 2% | $-6591.55 | 3 |

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
