# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22546 · Last run: 2026-08-02T02:57:46.077Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10475.59** | $658.57 | $-182.98 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10255.2** | $143.29 | $111.91 | 191 | 57% | $-59.74 | 15 |
| copy_top | **$10209.59** | $109.68 | $99.91 | 359 | 52% | $-1218.89 | 13 |
| copy_pro | **$10139.73** | $-118.71 | $258.44 | 341 | 51% | $-968.71 | 20 |
| mm_cheap | **$10066.84** | $522.9 | $-456.06 | 14 | 71% | $345.12 | 25 |
| mm_tight | **$10023.23** | $202.36 | $-179.13 | 165 | 55% | $-0.67 | 13 |
| strong_dip | **$9955.04** | $-393.8 | $348.84 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9949.39** | $117.48 | $-168.09 | 102 | 96% | $106.74 | 25 |
| super | **$9706.64** | $-472.29 | $178.93 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9395.48** | $-487.64 | $-116.88 | 6 | 17% | $-500 | 3 |
| mm_max | **$9190.19** | $-705.34 | $-104.47 | 52 | 48% | $-822.73 | 6 |
| random_control | **$9112.94** | $-523.46 | $-363.6 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8951.73** | $-851.81 | $-196.46 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8574.69** | $-982.78 | $-442.53 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8216.78** | $-1173.23 | $-609.99 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7118.05** | $-2702.15 | $-179.8 | 360 | 47% | $-3036.93 | 13 |
| copy_month (retired) | **$9397.2** | $-777.42 | $174.62 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9038.22** | $-1003.53 | $41.75 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8303.3** | $-1837.09 | $140.39 | 145 | 26% | $-3864.75 | 2 |
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
