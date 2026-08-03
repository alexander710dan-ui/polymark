# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25443 · Last run: 2026-08-03T03:27:43.566Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11096.17** | $1010.31 | $85.86 | 262 | 57% | $807.28 | 9 |
| mid_momentum | **$10538.67** | $665.42 | $-126.75 | 185 | 57% | $451.94 | 25 |
| copy_pro | **$10371.97** | $-334.75 | $706.72 | 362 | 51% | $-1184.75 | 23 |
| mm_tight | **$10359.52** | $342.55 | $16.97 | 224 | 53% | $139.52 | 6 |
| mm_cheap | **$10268.48** | $789.63 | $-521.15 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9980.62** | $-337.42 | $318.04 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9933.72** | $34.52 | $-100.8 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9886.23** | $-352.22 | $238.45 | 379 | 51% | $-1680.79 | 21 |
| super | **$9593.09** | $-445.84 | $38.93 | 63 | 46% | $-661.69 | 11 |
| mm_max | **$9465.43** | $-475.72 | $-58.85 | 73 | 52% | $-593.11 | 2 |
| ai_judge | **$9401.12** | $-487.64 | $-111.24 | 6 | 17% | $-500 | 3 |
| random_control | **$9258.2** | $-310.74 | $-431.06 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8860.09** | $-882.32 | $-257.59 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8618.29** | $-1133.53 | $-248.18 | 64 | 45% | $-1337.48 | 25 |
| momentum | **$8200.47** | $-1339.53 | $-460 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7123.05** | $-2101.81 | $-775.14 | 380 | 48% | $-2456.36 | 21 |
| copy_month (retired) | **$9389.01** | $-777.42 | $166.43 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.54** | $-1003.53 | $33.07 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.07** | $-4691.55 | $-204.38 | 81 | 2% | $-6591.55 | 3 |

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
