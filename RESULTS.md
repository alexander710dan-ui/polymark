# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33076 · Last run: 2026-08-06T02:19:25.924Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10446.3** | $787.82 | $-341.52 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10346.92** | $604.41 | $-257.49 | 212 | 57% | $390.93 | 25 |
| mm_tight | **$10299.23** | $367.34 | $-68.11 | 419 | 53% | $158.24 | 14 |
| super | **$10293.76** | $-110 | $403.76 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10068.44** | $-185.69 | $254.13 | 421 | 52% | $-1514.26 | 22 |
| fade_longshot | **$9870.15** | $25.97 | $-155.82 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9810.15** | $55.99 | $-245.84 | 32 | 53% | $-134.83 | 24 |
| copy_pro | **$9801.9** | $-929.24 | $731.14 | 399 | 51% | $-1779.24 | 24 |
| mm_cheap_v2 | **$9766.41** | $-74.11 | $-159.48 | 35 | 54% | $-264.93 | 24 |
| mm_sports | **$9701.77** | $-379.21 | $80.98 | 492 | 55% | $-598.34 | 17 |
| strong_dip | **$9616.81** | $-394.63 | $11.44 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9437.71** | $-543.33 | $-18.96 | 186 | 52% | $-752.43 | 5 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9006.5** | $-981.12 | $-12.38 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8812.54** | $-707.39 | $-480.07 | 61 | 51% | $-893.1 | 25 |
| mm_sports_v2 | **$8423.73** | $-1601.76 | $25.49 | 61 | 43% | $-1775.58 | 16 |
| mm_strong | **$8275.54** | $-1169.83 | $-554.63 | 88 | 47% | $-1373.78 | 24 |
| maker_flat | **$8236.47** | $-1452.92 | $-310.61 | 89 | 40% | $-1647.04 | 20 |
| momentum | **$8077.48** | $-1302.09 | $-620.43 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7617.8** | $-2305.16 | $-77.04 | 174 | 47% | $-2508.19 | 10 |
| whale_fade | **$6688.24** | $-2762.63 | $-549.13 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 72 | 2 | 60% | 2.95¢ |
| maker_sports | 184 | 117 | 4 | 61% | 1.54¢ |

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
