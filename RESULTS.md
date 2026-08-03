# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26866 · Last run: 2026-08-03T16:34:26.362Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11194.77** | $1024.59 | $170.18 | 277 | 56% | $821.56 | 25 |
| mm_tight | **$10551.32** | $346.88 | $204.44 | 236 | 53% | $143.85 | 22 |
| mm_cheap | **$10303.56** | $832.49 | $-528.93 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10297.84** | $608.28 | $-310.44 | 187 | 57% | $394.8 | 25 |
| strong_dip | **$9984.76** | $-337.42 | $322.18 | 96 | 60% | $-429.73 | 25 |
| maker_flat | **$9963.61** | $-100 | $63.61 | 1 | 0% | $0 | 8 |
| fade_longshot | **$9960.47** | $34.52 | $-74.05 | 105 | 95% | $23.78 | 25 |
| copy_pro | **$9859.04** | $-684.75 | $543.79 | 364 | 51% | $-1534.75 | 25 |
| maker_sports | **$9796.89** | $-100 | $-103.11 | 1 | 0% | $0 | 10 |
| copy_top | **$9600.87** | $-566.45 | $167.32 | 384 | 51% | $-1895.02 | 25 |
| mm_max | **$9582.21** | $-411.05 | $-6.74 | 78 | 50% | $-528.44 | 14 |
| super | **$9549.44** | $-445.84 | $-4.72 | 63 | 46% | $-661.69 | 12 |
| ai_judge | **$9392.23** | $-487.64 | $-120.13 | 6 | 17% | $-500 | 3 |
| random_control | **$9273.52** | $-310.74 | $-415.74 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8941.86** | $-821.03 | $-237.11 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8585.06** | $-1233.53 | $-181.41 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8194.06** | $-1339.53 | $-466.41 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7472.92** | $-1827.54 | $-699.54 | 385 | 48% | $-2182.09 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9026.56** | $-1003.53 | $30.09 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8379.71** | $-1837.09 | $216.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.28** | $-4691.55 | $-207.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 9 | 8 | 4 | 53% | 2.67¢ |
| maker_sports | 11 | 5 | 3 | 69% | 1.91¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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
