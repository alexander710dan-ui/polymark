# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87320 · Last run: 2026-11-02T05:23:39.121Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11424.82** | $1432.66 | $-7.84 | 505 | 54% | $582.66 | 25 |
| maker_sports | **$11150.73** | $1152.72 | $-1.99 | 121 | 58% | $940.22 | 4 |
| mid_momentum | **$10692.76** | $768.13 | $-75.37 | 302 | 56% | $554.65 | 25 |
| maker_flat | **$10542.07** | $551.57 | $-9.5 | 32 | 56% | $360.02 | 23 |
| mm_tight | **$10513.93** | $547.73 | $-33.8 | 568 | 54% | $338.63 | 4 |
| mm_max | **$10293.03** | $289.41 | $3.62 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10068.44** | $285.88 | $-217.44 | 132 | 55% | $94.19 | 25 |
| fade_longshot | **$10007.97** | $-34.6 | $42.57 | 172 | 95% | $-45.34 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9467.58** | $-457.05 | $-75.37 | 137 | 51% | $-649.6 | 25 |
| mm_cheap_v2 | **$9218.8** | $-563.76 | $-217.44 | 149 | 52% | $-755.45 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9193.8** | $-437.54 | $-368.66 | 178 | 54% | $-641.49 | 25 |
| mm_sports | **$9182.25** | $-795.33 | $-22.42 | 675 | 54% | $-1014.46 | 4 |
| strong_dip | **$9104.36** | $-983.43 | $87.79 | 164 | 59% | $-1077.06 | 25 |
| random_control | **$8952.88** | $-899.06 | $-148.06 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8692.77** | $-891.45 | $-415.78 | 119 | 51% | $-1091.13 | 24 |
| copy_top | **$8541.07** | $-1352.19 | $-106.74 | 537 | 53% | $-2680.76 | 25 |
| super | **$8425.07** | $-1637.68 | $62.75 | 127 | 50% | $-1919.58 | 2 |
| mm_sports_v2 | **$7952.94** | $-2024.64 | $-22.42 | 244 | 51% | $-2243.77 | 4 |
| momentum | **$7160.04** | $-2665.25 | $-174.71 | 309 | 65% | $-3153.49 | 25 |
| whale_fade | **$6818.82** | $-3176.08 | $-5.1 | 538 | 47% | $-3627.54 | 25 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 125 | 1 | 0 | 99% | 1.4¢ |

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
