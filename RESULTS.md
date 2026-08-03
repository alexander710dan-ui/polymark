# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25404 · Last run: 2026-08-03T03:08:14.649Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11093.15** | $1110.31 | $-17.16 | 261 | 57% | $907.28 | 10 |
| mid_momentum | **$10542.54** | $665.42 | $-122.88 | 185 | 57% | $451.94 | 25 |
| copy_pro | **$10359.66** | $65.25 | $294.41 | 360 | 51% | $-784.75 | 25 |
| mm_tight | **$10356.51** | $442.55 | $-86.04 | 223 | 53% | $239.52 | 7 |
| mm_cheap | **$10281.64** | $789.63 | $-507.99 | 23 | 70% | $611.85 | 25 |
| strong_dip | **$9977.14** | $-337.42 | $314.56 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9936.23** | $34.52 | $-98.29 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9883.58** | $-52.22 | $-64.2 | 376 | 52% | $-1380.79 | 24 |
| super | **$9584.29** | $-245.84 | $-169.87 | 62 | 47% | $-461.69 | 12 |
| mm_max | **$9465.43** | $-475.72 | $-58.85 | 73 | 52% | $-593.11 | 2 |
| ai_judge | **$9403.34** | $-487.64 | $-109.02 | 6 | 17% | $-500 | 3 |
| random_control | **$9251.65** | $-310.74 | $-437.61 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8868.14** | $-882.32 | $-249.54 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8624.86** | $-1133.53 | $-241.61 | 64 | 45% | $-1337.48 | 25 |
| momentum | **$8207.09** | $-1339.53 | $-453.38 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7127.44** | $-2163.63 | $-708.93 | 377 | 47% | $-2518.18 | 24 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.72** | $-1003.53 | $34.25 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8346.37** | $-1837.09 | $183.46 | 145 | 26% | $-3864.75 | 2 |
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
