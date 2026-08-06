# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33185 · Last run: 2026-08-06T03:20:05.800Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10418.65** | $764.47 | $-345.82 | 213 | 57% | $550.99 | 25 |
| mm_cheap | **$10370.48** | $787.82 | $-417.34 | 36 | 64% | $610.04 | 25 |
| mm_tight | **$10308.68** | $531.81 | $-223.13 | 423 | 53% | $322.71 | 10 |
| super | **$10215.23** | $-110 | $325.23 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10079.19** | $-185.69 | $264.88 | 421 | 52% | $-1514.26 | 22 |
| fade_longshot | **$9864.99** | $25.97 | $-160.98 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9741.16** | $-13.04 | $-245.8 | 37 | 51% | $-203.86 | 20 |
| mm_cheap_v2 | **$9718.26** | $-143.14 | $-138.6 | 40 | 53% | $-333.96 | 20 |
| copy_pro | **$9654.56** | $-929.24 | $583.8 | 399 | 51% | $-1779.24 | 24 |
| strong_dip | **$9608.93** | $-394.63 | $3.56 | 105 | 60% | $-486.94 | 25 |
| mm_sports | **$9597.64** | $-350.06 | $-52.3 | 498 | 55% | $-569.19 | 12 |
| mm_max | **$9560.64** | $-330.73 | $-108.63 | 189 | 53% | $-539.83 | 3 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$8992.6** | $-1085.22 | $77.82 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8750.35** | $-707.39 | $-542.26 | 61 | 51% | $-893.1 | 25 |
| maker_flat | **$8538.44** | $-1218.24 | $-243.32 | 93 | 42% | $-1412.36 | 16 |
| mm_sports_v2 | **$8337.78** | $-1553.16 | $-109.06 | 67 | 43% | $-1772.29 | 11 |
| mm_strong | **$8326.91** | $-1009.77 | $-663.32 | 89 | 47% | $-1213.72 | 25 |
| momentum | **$8007.58** | $-1302.09 | $-690.33 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7608.45** | $-2243.71 | $-147.84 | 179 | 47% | $-2446.74 | 6 |
| whale_fade | **$6642.28** | $-2762.63 | $-595.09 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.2** | $-931.5 | $-68.3 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


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
