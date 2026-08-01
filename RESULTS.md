# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21908 · Last run: 2026-08-01T21:38:22.144Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10442.74** | $383.13 | $59.61 | 175 | 57% | $169.65 | 25 |
| copy_top | **$10399.98** | $338.97 | $61.01 | 344 | 53% | $-989.6 | 17 |
| mm_cheap | **$10131.33** | $-127.59 | $258.92 | 3 | 33% | $-200 | 25 |
| fade_longshot | **$10037.67** | $117.48 | $-79.81 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9957.67** | $380.16 | $-422.49 | 326 | 52% | $-469.84 | 25 |
| strong_dip | **$9776.58** | $-271.26 | $47.84 | 90 | 60% | $-363.57 | 25 |
| mm_tight | **$9703.52** | $-366.62 | $70.14 | 144 | 53% | $-569.65 | 20 |
| ai_judge | **$9463.85** | $-487.64 | $-48.51 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9289.43** | $-668.03 | $-42.54 | 166 | 55% | $-871.06 | 25 |
| mm_max | **$9251.93** | $-750.8 | $2.73 | 47 | 47% | $-868.19 | 1 |
| super | **$9162.8** | $-649.65 | $-187.55 | 58 | 43% | $-865.5 | 12 |
| random_control | **$9141.71** | $-240.85 | $-617.44 | 113 | 60% | $-855.14 | 25 |
| mm_slow | **$9006.01** | $-940.49 | $-53.5 | 43 | 47% | $-1062.71 | 25 |
| momentum | **$8636.33** | $-1189.81 | $-173.86 | 224 | 67% | $-1678.05 | 25 |
| mm_strong | **$8611.67** | $-782.78 | $-605.55 | 59 | 47% | $-986.73 | 25 |
| whale_fade | **$6835.46** | $-2888.74 | $-275.8 | 345 | 47% | $-3223.52 | 17 |
| copy_month (retired) | **$9289.01** | $-777.42 | $66.43 | 163 | 47% | $-1586.51 | 2 |
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
