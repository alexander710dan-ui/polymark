# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22471 · Last run: 2026-08-02T02:20:22.018Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10480.43** | $611.51 | $-131.08 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10303.2** | $308.23 | $-5.03 | 353 | 53% | $-1020.34 | 19 |
| mm_sports | **$10190.91** | $360.69 | $-169.78 | 181 | 57% | $157.66 | 25 |
| copy_pro | **$10121.15** | $-116.44 | $237.59 | 336 | 51% | $-966.44 | 24 |
| mm_tight | **$9993.06** | $356.99 | $-363.93 | 156 | 55% | $153.96 | 22 |
| mm_cheap | **$9989.79** | $200.03 | $-210.24 | 10 | 70% | $61.93 | 25 |
| fade_longshot | **$9965.34** | $117.48 | $-152.14 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9921.67** | $-471.26 | $392.93 | 92 | 59% | $-563.57 | 25 |
| super | **$9597.15** | $-649.65 | $246.8 | 58 | 43% | $-865.5 | 13 |
| ai_judge | **$9421.72** | $-487.64 | $-90.64 | 6 | 17% | $-500 | 3 |
| mm_max | **$9171.37** | $-768.98 | $-59.65 | 49 | 47% | $-886.37 | 7 |
| random_control | **$9072.86** | $-423.46 | $-503.68 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8982.51** | $-940.49 | $-77 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8532.27** | $-782.78 | $-684.95 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8291.68** | $-1261.91 | $-446.41 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7049.93** | $-2901.47 | $-48.6 | 354 | 47% | $-3236.25 | 19 |
| copy_month (retired) | **$9367.89** | $-777.42 | $145.31 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9046.34** | $-1003.53 | $49.87 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8250.22** | $-1837.09 | $87.31 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5081.32** | $-4691.55 | $-227.13 | 81 | 2% | $-6591.55 | 3 |

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
