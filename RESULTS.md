# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21341 · Last run: 2026-08-01T16:54:00.172Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10588.06** | $772.38 | $-184.32 | 319 | 52% | $-77.62 | 25 |
| copy_top | **$10500.72** | $538.97 | $-38.25 | 342 | 53% | $-789.6 | 14 |
| mid_momentum | **$10141.01** | $223.29 | $-82.28 | 173 | 56% | $9.81 | 25 |
| mm_cheap | **$10090.74** | $0 | $90.74 | 0 | — | $0 | 18 |
| strong_dip | **$10081.84** | $-136.87 | $218.71 | 87 | 62% | $-229.18 | 24 |
| fade_longshot | **$10032.7** | $115.44 | $-82.74 | 101 | 96% | $104.7 | 25 |
| mm_tight | **$9887.64** | $-288.23 | $175.87 | 134 | 53% | $-491.26 | 12 |
| mm_sports | **$9585.33** | $-630.49 | $215.82 | 155 | 54% | $-833.52 | 14 |
| ai_judge | **$9472.91** | $-487.64 | $-39.45 | 6 | 17% | $-500 | 3 |
| random_control | **$9418.9** | $-239.85 | $-341.25 | 108 | 59% | $-854.14 | 25 |
| mm_max | **$9200.14** | $-839.48 | $39.62 | 46 | 46% | $-956.87 | 1 |
| super | **$9178.24** | $-649.65 | $-172.11 | 58 | 43% | $-865.5 | 11 |
| mm_slow | **$8926.59** | $-1029.17 | $-44.24 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8675.6** | $-885.1 | $-439.3 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8553.6** | $-1228.67 | $-217.73 | 221 | 67% | $-1716.91 | 25 |
| whale_fade | **$6808.83** | $-3085.75 | $-105.42 | 343 | 46% | $-3420.53 | 14 |
| copy_month (retired) | **$9310.35** | $-777.42 | $87.77 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9092.6** | $-1003.53 | $96.13 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8014.58** | $-1837.09 | $-148.33 | 145 | 26% | $-3864.75 | 2 |
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
