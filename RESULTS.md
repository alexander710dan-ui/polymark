# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32673 · Last run: 2026-08-05T22:35:15.998Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10719.19** | $833.04 | $-113.85 | 401 | 54% | $630.01 | 17 |
| mm_cheap | **$10485.03** | $887.82 | $-402.79 | 35 | 66% | $710.04 | 25 |
| mid_momentum | **$10479.66** | $763.13 | $-283.47 | 209 | 57% | $549.65 | 25 |
| super | **$10033.08** | $-425.73 | $458.81 | 73 | 48% | $-641.58 | 15 |
| mm_cheap_v2 | **$10005.17** | $-144.14 | $149.31 | 23 | 52% | $-256.06 | 25 |
| fade_longshot | **$9849.09** | $25.97 | $-176.88 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9789.01** | $-387.99 | $177 | 416 | 52% | $-1716.56 | 25 |
| copy_pro | **$9700.6** | $-801.45 | $502.05 | 396 | 51% | $-1651.45 | 25 |
| mid_momentum_v2 | **$9696.74** | $-283.89 | $-19.37 | 23 | 48% | $-395.81 | 25 |
| mm_sports | **$9660.28** | $-210.19 | $-129.53 | 470 | 55% | $-429.32 | 22 |
| mm_max | **$9613.81** | $-392.15 | $5.96 | 175 | 53% | $-559.27 | 4 |
| strong_dip | **$9513.99** | $-482.76 | $-3.25 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9351.76** | $-587.64 | $-60.6 | 7 | 14% | $-600 | 2 |
| random_control | **$8932.11** | $-1000.59 | $-67.3 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8774.62** | $-548.67 | $-676.71 | 58 | 52% | $-734.38 | 25 |
| maker_flat | **$8552.91** | $-1249 | $-198.09 | 85 | 41% | $-1443.12 | 18 |
| mm_strong | **$8497.88** | $-908.46 | $-593.66 | 84 | 48% | $-1112.41 | 25 |
| mm_sports_v2 | **$8442.89** | $-1370.81 | $-186.3 | 38 | 37% | $-1496.83 | 21 |
| momentum | **$8137.81** | $-1142.52 | $-719.67 | 263 | 68% | $-1630.76 | 25 |
| maker_sports | **$7942.62** | $-1798.15 | $-259.23 | 155 | 48% | $-2001.18 | 11 |
| whale_fade | **$6947.14** | $-2434.9 | $-617.96 | 417 | 47% | $-2789.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.85** | $-931.5 | $-68.65 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 103 | 68 | 1 | 60% | 2.96¢ |
| maker_sports | 166 | 107 | 7 | 61% | 1.58¢ |

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
