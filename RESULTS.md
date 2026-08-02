# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22724 · Last run: 2026-08-02T04:26:50.503Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10551.89** | $489.65 | $62.24 | 198 | 58% | $286.62 | 9 |
| mid_momentum | **$10479.41** | $558.57 | $-79.16 | 180 | 57% | $345.09 | 25 |
| mm_tight | **$10404.36** | $317.71 | $86.65 | 170 | 55% | $114.68 | 8 |
| copy_top | **$10250.32** | $-190.32 | $440.64 | 362 | 52% | $-1518.89 | 18 |
| mm_cheap | **$10004.07** | $472.02 | $-467.95 | 18 | 67% | $294.24 | 25 |
| copy_pro | **$10002.68** | $-459.98 | $462.66 | 345 | 51% | $-1309.98 | 19 |
| strong_dip | **$9959.25** | $-393.8 | $353.05 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9945.58** | $117.48 | $-171.9 | 102 | 96% | $106.74 | 25 |
| super | **$9775.93** | $-472.29 | $248.22 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9398.34** | $-487.64 | $-114.02 | 6 | 17% | $-500 | 3 |
| mm_max | **$9328.58** | $-764.49 | $93.07 | 56 | 48% | $-881.88 | 2 |
| random_control | **$9052.84** | $-723.46 | $-223.7 | 120 | 58% | $-1337.75 | 25 |
| mm_slow | **$8917.3** | $-951.81 | $-130.89 | 45 | 47% | $-1074.03 | 25 |
| mm_strong | **$8592.93** | $-982.78 | $-424.29 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8193.04** | $-1273.23 | $-533.73 | 231 | 67% | $-1761.47 | 25 |
| whale_fade | **$7139.47** | $-2413.32 | $-447.21 | 363 | 47% | $-2748.1 | 18 |
| copy_month (retired) | **$9397.27** | $-777.42 | $174.69 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9035.41** | $-1003.53 | $38.94 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8316.5** | $-1837.09 | $153.59 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5103.2** | $-4691.55 | $-205.25 | 81 | 2% | $-6591.55 | 3 |

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
