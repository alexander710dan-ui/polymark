# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25487 · Last run: 2026-08-03T03:49:56.075Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11061.96** | $1059.56 | $2.4 | 263 | 57% | $856.53 | 8 |
| mid_momentum | **$10540.1** | $665.42 | $-125.32 | 185 | 57% | $451.94 | 25 |
| copy_pro | **$10378.02** | $-334.75 | $712.77 | 362 | 51% | $-1184.75 | 24 |
| mm_tight | **$10357.79** | $391.8 | $-34.01 | 225 | 53% | $188.77 | 5 |
| mm_cheap | **$10267.16** | $789.63 | $-522.47 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9978.23** | $-337.42 | $315.65 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9932.6** | $34.52 | $-101.92 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9882.11** | $-352.22 | $234.33 | 379 | 51% | $-1680.79 | 22 |
| super | **$9593.31** | $-445.84 | $39.15 | 63 | 46% | $-661.69 | 11 |
| mm_max | **$9464.58** | $-475.72 | $-59.7 | 73 | 52% | $-593.11 | 2 |
| ai_judge | **$9396.68** | $-487.64 | $-115.68 | 6 | 17% | $-500 | 3 |
| random_control | **$9278.03** | $-310.74 | $-411.23 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8860.41** | $-882.32 | $-257.27 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8586.13** | $-1133.53 | $-280.34 | 64 | 45% | $-1337.48 | 25 |
| momentum | **$8204.33** | $-1339.53 | $-456.14 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7120.36** | $-2101.81 | $-777.83 | 380 | 48% | $-2456.36 | 22 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.96** | $-1003.53 | $31.49 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8366.37** | $-1837.09 | $203.46 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.03** | $-4691.55 | $-205.42 | 81 | 2% | $-6591.55 | 3 |

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
