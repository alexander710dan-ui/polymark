# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21980 · Last run: 2026-08-01T22:14:28.320Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_top | **$10491.8** | $238.97 | $252.83 | 345 | 52% | $-1089.6 | 18 |
| mid_momentum | **$10462.48** | $564.45 | $-101.97 | 177 | 57% | $350.97 | 25 |
| copy_pro | **$10200.86** | $130.16 | $70.7 | 329 | 52% | $-719.84 | 24 |
| mm_cheap | **$10043.24** | $74.44 | $-31.2 | 5 | 60% | $-63.66 | 25 |
| fade_longshot | **$10029.8** | $117.48 | $-87.68 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9805.92** | $-371.26 | $177.18 | 91 | 59% | $-463.57 | 25 |
| mm_tight | **$9716.11** | $-316.62 | $32.73 | 146 | 53% | $-519.65 | 21 |
| ai_judge | **$9444.96** | $-487.64 | $-67.4 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9328.84** | $-554.1 | $-117.06 | 169 | 55% | $-757.13 | 25 |
| mm_max | **$9302.84** | $-750.8 | $53.64 | 47 | 47% | $-868.19 | 1 |
| super | **$9241.91** | $-649.65 | $-108.44 | 58 | 43% | $-865.5 | 12 |
| random_control | **$9152.8** | $-340.85 | $-506.35 | 114 | 60% | $-955.14 | 25 |
| mm_slow | **$9003.54** | $-940.49 | $-55.97 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8633.92** | $-782.78 | $-583.3 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8558.16** | $-1079.56 | $-362.28 | 226 | 68% | $-1567.8 | 25 |
| whale_fade | **$6755.63** | $-2819.25 | $-425.12 | 346 | 47% | $-3154.03 | 18 |
| copy_month (retired) | **$9334.85** | $-777.42 | $112.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9080.02** | $-1003.53 | $83.55 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8083.04** | $-1837.09 | $-79.87 | 145 | 26% | $-3864.75 | 2 |
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
