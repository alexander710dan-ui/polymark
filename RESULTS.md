# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87308 · Last run: 2026-11-02T05:18:52.424Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11427.69** | $1432.66 | $-4.97 | 505 | 54% | $582.66 | 25 |
| maker_sports | **$11152.47** | $1152.72 | $-0.25 | 121 | 58% | $940.22 | 4 |
| mid_momentum | **$10695.47** | $768.13 | $-72.66 | 302 | 56% | $554.65 | 25 |
| maker_flat | **$10540.93** | $551.57 | $-10.64 | 32 | 56% | $360.02 | 23 |
| mm_tight | **$10515.64** | $547.73 | $-32.09 | 568 | 54% | $338.63 | 4 |
| mm_max | **$10291.97** | $289.41 | $2.56 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10071.43** | $285.88 | $-214.45 | 132 | 55% | $94.19 | 25 |
| fade_longshot | **$10007.81** | $-34.6 | $42.41 | 172 | 95% | $-45.34 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9470.29** | $-457.05 | $-72.66 | 137 | 51% | $-649.6 | 25 |
| mm_cheap_v2 | **$9221.79** | $-563.76 | $-214.45 | 149 | 52% | $-755.45 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9196.53** | $-437.54 | $-365.93 | 178 | 54% | $-641.49 | 25 |
| mm_sports | **$9183.97** | $-795.33 | $-20.7 | 675 | 54% | $-1014.46 | 4 |
| strong_dip | **$9102.36** | $-983.43 | $85.79 | 164 | 59% | $-1077.06 | 24 |
| random_control | **$8956.22** | $-899.06 | $-144.72 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8692.07** | $-891.45 | $-416.48 | 119 | 51% | $-1091.13 | 24 |
| copy_top | **$8546.23** | $-1353.71 | $-100.06 | 536 | 52% | $-2682.28 | 25 |
| super | **$8429.23** | $-1637.68 | $66.91 | 127 | 50% | $-1919.58 | 2 |
| mm_sports_v2 | **$7954.66** | $-2024.64 | $-20.7 | 244 | 51% | $-2243.77 | 4 |
| momentum | **$7161.83** | $-2665.25 | $-172.92 | 309 | 65% | $-3153.49 | 25 |
| whale_fade | **$6832.79** | $-3069.23 | $-97.98 | 537 | 47% | $-3520.69 | 25 |
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
