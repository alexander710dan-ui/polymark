# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21896 · Last run: 2026-08-01T21:32:18.385Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10461.95** | $383.13 | $78.82 | 175 | 57% | $169.65 | 25 |
| copy_top | **$10388.93** | $338.97 | $49.96 | 344 | 53% | $-989.6 | 17 |
| mm_cheap | **$10161.36** | $-127.59 | $288.95 | 3 | 33% | $-200 | 25 |
| fade_longshot | **$10036.1** | $117.48 | $-81.38 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9963.55** | $380.16 | $-416.61 | 326 | 52% | $-469.84 | 25 |
| strong_dip | **$9760.68** | $-271.26 | $31.94 | 90 | 60% | $-363.57 | 25 |
| mm_tight | **$9695.42** | $-366.62 | $62.04 | 144 | 53% | $-569.65 | 19 |
| ai_judge | **$9463.85** | $-487.64 | $-48.51 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9277.11** | $-668.03 | $-54.86 | 166 | 55% | $-871.06 | 25 |
| mm_max | **$9242.84** | $-750.8 | $-6.36 | 47 | 47% | $-868.19 | 1 |
| random_control | **$9209.13** | $-240.85 | $-550.02 | 113 | 60% | $-855.14 | 25 |
| super | **$9152.35** | $-649.65 | $-198 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9028.49** | $-940.49 | $-31.02 | 43 | 47% | $-1062.71 | 25 |
| momentum | **$8672.69** | $-1189.81 | $-137.5 | 224 | 67% | $-1678.05 | 25 |
| mm_strong | **$8627.19** | $-782.78 | $-590.03 | 59 | 47% | $-986.73 | 25 |
| whale_fade | **$6847.95** | $-2888.74 | $-263.31 | 345 | 47% | $-3223.52 | 17 |
| copy_month (retired) | **$9280.68** | $-777.42 | $58.1 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9089.43** | $-1003.53 | $92.96 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8026.37** | $-1837.09 | $-136.54 | 145 | 26% | $-3864.75 | 2 |
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
