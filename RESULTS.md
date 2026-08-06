# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33241 · Last run: 2026-08-06T03:51:17.868Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10414.35** | $661.27 | $-246.92 | 214 | 57% | $447.79 | 25 |
| mm_tight | **$10387.27** | $428.56 | $-41.29 | 424 | 53% | $219.46 | 9 |
| mm_cheap | **$10378.96** | $787.82 | $-408.86 | 36 | 64% | $610.04 | 25 |
| super | **$10271.19** | $-110 | $381.19 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10093.16** | $-150.05 | $243.21 | 422 | 52% | $-1478.62 | 21 |
| fade_longshot | **$9862.94** | $25.97 | $-163.03 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9752.67** | $-116.29 | $-131.04 | 38 | 50% | $-307.11 | 20 |
| mm_cheap_v2 | **$9749.5** | $-246.39 | $-4.11 | 41 | 51% | $-437.21 | 20 |
| copy_pro | **$9675.43** | $-1084.71 | $760.14 | 400 | 51% | $-1934.71 | 23 |
| mm_sports | **$9663.14** | $-453.31 | $116.45 | 499 | 55% | $-672.44 | 11 |
| strong_dip | **$9597.15** | $-394.63 | $-8.22 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9570.52** | $-433.88 | $4.4 | 190 | 53% | $-642.98 | 2 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$9000.25** | $-1085.22 | $85.47 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8732.66** | $-707.39 | $-559.95 | 61 | 51% | $-893.1 | 25 |
| maker_flat | **$8579.5** | $-1218.24 | $-202.26 | 93 | 42% | $-1412.36 | 16 |
| mm_sports_v2 | **$8403.28** | $-1656.41 | $59.69 | 68 | 43% | $-1875.54 | 10 |
| mm_strong | **$8325.22** | $-1112.97 | $-561.81 | 90 | 47% | $-1316.92 | 24 |
| momentum | **$8007.78** | $-1276.56 | $-715.66 | 267 | 67% | $-1764.8 | 25 |
| maker_sports | **$7613.23** | $-2343.71 | $-43.06 | 180 | 47% | $-2546.74 | 5 |
| whale_fade | **$6632.32** | $-2866.23 | $-501.45 | 423 | 47% | $-3220.78 | 21 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.89** | $-931.5 | $-70.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5112.45** | $-4791.55 | $-96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 74 | 1 | 60% | 2.95¢ |
| maker_sports | 185 | 120 | 1 | 61% | 1.54¢ |

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
