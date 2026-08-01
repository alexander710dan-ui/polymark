# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21430 · Last run: 2026-08-01T17:38:32.862Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10597.31** | $572.38 | $24.93 | 320 | 52% | $-277.62 | 25 |
| copy_top | **$10484.42** | $438.97 | $45.45 | 343 | 53% | $-889.6 | 14 |
| mid_momentum | **$10198.62** | $223.29 | $-24.67 | 173 | 56% | $9.81 | 25 |
| fade_longshot | **$10026.31** | $117.48 | $-91.17 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$10001.69** | $-136.87 | $138.56 | 87 | 62% | $-229.18 | 25 |
| mm_cheap | **$9941.29** | $0 | $-58.71 | 0 | — | $0 | 23 |
| mm_tight | **$9783.5** | $-288.23 | $71.73 | 134 | 53% | $-491.26 | 15 |
| mm_sports | **$9484.55** | $-630.49 | $115.04 | 155 | 54% | $-833.52 | 17 |
| ai_judge | **$9465.73** | $-487.64 | $-46.63 | 6 | 17% | $-500 | 3 |
| random_control | **$9443.27** | $-239.85 | $-316.88 | 108 | 59% | $-854.14 | 25 |
| mm_max | **$9249.11** | $-839.48 | $88.59 | 46 | 46% | $-956.87 | 1 |
| super | **$9162.13** | $-649.65 | $-188.22 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$8959.46** | $-1029.17 | $-11.37 | 42 | 45% | $-1151.39 | 25 |
| mm_strong | **$8709.89** | $-885.1 | $-405.01 | 57 | 46% | $-1089.05 | 25 |
| momentum | **$8617.94** | $-1228.67 | $-153.39 | 221 | 67% | $-1716.91 | 25 |
| whale_fade | **$6820.82** | $-2977.42 | $-201.76 | 344 | 47% | $-3312.2 | 14 |
| copy_month (retired) | **$9293.03** | $-777.42 | $70.45 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9090.45** | $-1003.53 | $93.98 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8023.29** | $-1837.09 | $-139.62 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5078.2** | $-4691.55 | $-230.25 | 81 | 2% | $-6591.55 | 3 |

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
