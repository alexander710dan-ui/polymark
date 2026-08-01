# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22130 · Last run: 2026-08-01T23:29:33.984Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10506.09** | $564.45 | $-58.36 | 177 | 57% | $350.97 | 25 |
| copy_top | **$10289.5** | $335.05 | $-45.55 | 346 | 53% | $-993.52 | 21 |
| mm_cheap | **$10190.96** | $28.29 | $162.67 | 7 | 57% | $-109.81 | 25 |
| fade_longshot | **$10029.11** | $117.48 | $-88.37 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9930.19** | $130.16 | $-199.97 | 329 | 52% | $-719.84 | 25 |
| strong_dip | **$9810.68** | $-471.26 | $281.94 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9508.79** | $-74.09 | $-417.12 | 149 | 54% | $-277.12 | 23 |
| ai_judge | **$9453.55** | $-487.64 | $-58.81 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9423.14** | $-317.45 | $-259.41 | 175 | 56% | $-520.48 | 24 |
| super | **$9238.11** | $-649.65 | $-112.24 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9231.03** | $-750.8 | $-18.17 | 47 | 47% | $-868.19 | 2 |
| random_control | **$9034.01** | $-540.85 | $-425.14 | 116 | 59% | $-1155.14 | 25 |
| mm_slow | **$9016.82** | $-940.49 | $-42.69 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8573** | $-782.78 | $-644.22 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8514.54** | $-1161.91 | $-323.55 | 228 | 68% | $-1650.15 | 25 |
| whale_fade | **$6890.52** | $-2919.25 | $-190.23 | 347 | 47% | $-3254.03 | 21 |
| copy_month (retired) | **$9298.37** | $-777.42 | $75.79 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9082.55** | $-1003.53 | $86.08 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8063.68** | $-1837.09 | $-99.23 | 145 | 26% | $-3864.75 | 2 |
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
