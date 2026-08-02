# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24083 · Last run: 2026-08-02T15:49:59.492Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10692.48** | $919.46 | $-226.98 | 216 | 58% | $716.43 | 21 |
| mm_tight | **$10460.06** | $694.22 | $-234.16 | 187 | 56% | $491.19 | 17 |
| mid_momentum | **$10422.87** | $630.98 | $-208.11 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10169.83** | $150.53 | $19.3 | 367 | 52% | $-1178.04 | 23 |
| mm_cheap | **$10121.32** | $704.44 | $-583.12 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9990.1** | $-393.8 | $383.9 | 94 | 60% | $-486.11 | 25 |
| copy_pro | **$9987.11** | $-192.45 | $179.56 | 352 | 51% | $-1042.45 | 25 |
| fade_longshot | **$9963.1** | $117.48 | $-154.38 | 102 | 96% | $106.74 | 25 |
| super | **$9688.24** | $-245.84 | $-65.92 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9405.01** | $-487.64 | $-107.35 | 6 | 17% | $-500 | 3 |
| mm_max | **$9330.66** | $-613.77 | $-55.57 | 59 | 51% | $-731.16 | 2 |
| random_control | **$9248.06** | $-665.29 | $-86.65 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8907.89** | $-882.32 | $-209.79 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8631.65** | $-933.53 | $-434.82 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8239.32** | $-1139.53 | $-621.15 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7347.66** | $-2553.31 | $-99.03 | 368 | 47% | $-2888.09 | 23 |
| copy_month (retired) | **$9384.77** | $-777.42 | $162.19 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.32** | $-1003.53 | $44.85 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8296.5** | $-1837.09 | $133.59 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5105.28** | $-4691.55 | $-203.17 | 81 | 2% | $-6591.55 | 3 |

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
