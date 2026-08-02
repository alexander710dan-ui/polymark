# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22631 · Last run: 2026-08-02T03:40:27.884Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10389.52** | $558.57 | $-169.05 | 180 | 57% | $345.09 | 25 |
| mm_sports | **$10202.65** | $225.55 | $-22.9 | 194 | 57% | $22.52 | 12 |
| copy_top | **$10038.12** | $-190.32 | $228.44 | 362 | 52% | $-1518.89 | 18 |
| mm_tight | **$10036.84** | $332.52 | $-295.68 | 168 | 55% | $129.49 | 10 |
| mm_cheap | **$9973.64** | $422.9 | $-449.26 | 15 | 67% | $245.12 | 25 |
| strong_dip | **$9954.8** | $-393.8 | $348.6 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9943.91** | $117.48 | $-173.57 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9841.02** | $-418.71 | $259.73 | 343 | 51% | $-1268.71 | 20 |
| super | **$9771.38** | $-472.29 | $243.67 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9401.68** | $-487.64 | $-110.68 | 6 | 17% | $-500 | 3 |
| mm_max | **$9268.59** | $-664.49 | $-66.92 | 55 | 49% | $-781.88 | 3 |
| random_control | **$8998.52** | $-623.46 | $-378.02 | 119 | 58% | $-1237.75 | 25 |
| mm_slow | **$8851.06** | $-951.81 | $-197.13 | 45 | 47% | $-1074.03 | 25 |
| mm_strong | **$8592.87** | $-982.78 | $-424.35 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8107.16** | $-1273.23 | $-619.61 | 231 | 67% | $-1761.47 | 25 |
| whale_fade | **$7252.39** | $-2413.32 | $-334.29 | 363 | 47% | $-2748.1 | 18 |
| copy_month (retired) | **$9397.27** | $-777.42 | $174.69 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9036.58** | $-1003.53 | $40.11 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.5** | $-1837.09 | $143.59 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5086.53** | $-4691.55 | $-221.92 | 81 | 2% | $-6591.55 | 3 |

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
