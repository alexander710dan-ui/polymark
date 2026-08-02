# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23670 · Last run: 2026-08-02T12:20:44.708Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10908.19** | $558.65 | $349.54 | 206 | 58% | $355.62 | 21 |
| mm_tight | **$10607.8** | $410.38 | $197.42 | 178 | 55% | $207.35 | 16 |
| mid_momentum | **$10396.31** | $630.98 | $-234.67 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10220.41** | $33.14 | $187.27 | 366 | 52% | $-1295.43 | 19 |
| mm_cheap | **$10086.94** | $704.44 | $-617.5 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$10062.5** | $-406.82 | $469.32 | 349 | 51% | $-1256.82 | 25 |
| strong_dip | **$10005.62** | $-393.8 | $399.42 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9959.98** | $117.48 | $-157.5 | 102 | 96% | $106.74 | 25 |
| super | **$9703.55** | $-245.84 | $-50.61 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9412.06** | $-487.64 | $-100.3 | 6 | 17% | $-500 | 3 |
| mm_max | **$9382.07** | $-660.83 | $42.9 | 58 | 50% | $-778.22 | 2 |
| random_control | **$9092.65** | $-665.29 | $-242.06 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8864.98** | $-882.32 | $-252.7 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8563.31** | $-933.53 | $-503.16 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8206.29** | $-1139.53 | $-654.18 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7265.24** | $-2453.31 | $-281.45 | 367 | 47% | $-2788.09 | 19 |
| copy_month (retired) | **$9383.31** | $-777.42 | $160.73 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9043.58** | $-1003.53 | $47.11 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8276.63** | $-1837.09 | $113.72 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5096.95** | $-4691.55 | $-211.5 | 81 | 2% | $-6591.55 | 3 |

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
