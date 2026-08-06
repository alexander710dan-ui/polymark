# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33098 · Last run: 2026-08-06T02:31:47.181Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10604.61** | $604.41 | $0.2 | 212 | 57% | $390.93 | 25 |
| mm_tight | **$10585.97** | $265.09 | $320.88 | 420 | 53% | $55.99 | 13 |
| mm_cheap | **$10462.18** | $787.82 | $-325.64 | 36 | 64% | $610.04 | 25 |
| super | **$10336.86** | $-110 | $446.86 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10065.86** | $-185.69 | $251.55 | 421 | 52% | $-1514.26 | 22 |
| mid_momentum_v2 | **$9994.15** | $-46.31 | $40.46 | 33 | 52% | $-237.13 | 23 |
| mm_cheap_v2 | **$9960.95** | $-176.41 | $137.36 | 36 | 53% | $-367.23 | 23 |
| mm_sports | **$9938.39** | $-481.46 | $419.85 | 493 | 55% | $-700.59 | 16 |
| copy_pro | **$9877.67** | $-929.24 | $806.91 | 399 | 51% | $-1779.24 | 24 |
| fade_longshot | **$9864.16** | $25.97 | $-161.81 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9728.64** | $-499.95 | $228.59 | 187 | 52% | $-709.05 | 5 |
| strong_dip | **$9608.74** | $-394.63 | $3.37 | 105 | 60% | $-486.94 | 25 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9080.83** | $-981.12 | $61.95 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8774.79** | $-707.39 | $-517.82 | 61 | 51% | $-893.1 | 25 |
| mm_sports_v2 | **$8678.62** | $-1704.01 | $382.63 | 62 | 42% | $-1877.83 | 15 |
| maker_flat | **$8604.29** | $-1552.92 | $157.21 | 90 | 40% | $-1747.04 | 19 |
| mm_strong | **$8510.58** | $-1169.83 | $-319.59 | 88 | 47% | $-1373.78 | 25 |
| momentum | **$8042.1** | $-1302.09 | $-655.81 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7754.29** | $-2405.16 | $159.45 | 175 | 47% | $-2608.19 | 10 |
| whale_fade | **$6739.89** | $-2762.63 | $-497.48 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 72 | 2 | 60% | 2.95¢ |
| maker_sports | 185 | 118 | 2 | 61% | 1.54¢ |

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
