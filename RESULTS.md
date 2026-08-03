# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 25629 · Last run: 2026-08-03T05:01:07.831Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11051.05** | $1111.08 | $-60.03 | 264 | 57% | $908.05 | 15 |
| mid_momentum | **$10529.08** | $708.28 | $-179.2 | 186 | 58% | $494.8 | 25 |
| copy_pro | **$10347.49** | $-334.75 | $682.24 | 362 | 51% | $-1184.75 | 25 |
| mm_tight | **$10343.66** | $443.32 | $-99.66 | 226 | 54% | $240.29 | 10 |
| mm_cheap | **$10287.88** | $832.49 | $-544.61 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$9989.05** | $-337.42 | $326.47 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9938.96** | $34.52 | $-95.56 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9864.57** | $-352.22 | $216.79 | 379 | 51% | $-1680.79 | 23 |
| super | **$9576.95** | $-445.84 | $22.79 | 63 | 46% | $-661.69 | 11 |
| mm_max | **$9457.79** | $-475.72 | $-66.49 | 73 | 52% | $-593.11 | 7 |
| ai_judge | **$9400.01** | $-487.64 | $-112.35 | 6 | 17% | $-500 | 3 |
| random_control | **$9264.53** | $-310.74 | $-424.73 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8871.5** | $-821.03 | $-307.47 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8617.59** | $-1233.53 | $-148.88 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8203.53** | $-1339.53 | $-456.94 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7116.83** | $-2101.81 | $-781.36 | 380 | 48% | $-2456.36 | 23 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.61** | $-1003.53 | $33.14 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8356.37** | $-1837.09 | $193.46 | 145 | 26% | $-3864.75 | 2 |
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
