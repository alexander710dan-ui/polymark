# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32127 · Last run: 2026-08-05T17:31:01.848Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11077.82** | $1068.71 | $9.11 | 381 | 54% | $865.68 | 16 |
| mm_sports | **$10663.79** | $929.7 | $-265.91 | 445 | 56% | $710.57 | 23 |
| mid_momentum | **$10629.62** | $867.28 | $-237.66 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10496.43** | $887.82 | $-391.39 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9936.8** | $111.17 | $-174.37 | 118 | 96% | $100.43 | 25 |
| super | **$9892.91** | $-425.73 | $318.64 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9789.14** | $-164.19 | $-46.67 | 165 | 54% | $-331.31 | 6 |
| copy_top | **$9739.76** | $-472.32 | $212.08 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9668.52** | $-39.26 | $-292.22 | 11 | 55% | $-151.18 | 25 |
| strong_dip | **$9516.15** | $-482.76 | $-1.09 | 103 | 59% | $-575.07 | 25 |
| mm_sports_v2 | **$9460.85** | $-235.75 | $-303.4 | 13 | 46% | $-361.77 | 20 |
| mid_momentum_v2 | **$9444.79** | $-249.85 | $-305.36 | 13 | 46% | $-361.77 | 25 |
| ai_judge | **$9378.17** | $-587.64 | $-34.19 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9213.86** | $-1246.73 | $460.59 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9006.67** | $-516.83 | $-476.5 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8988.22** | $-1153.35 | $141.57 | 141 | 56% | $-1767.64 | 25 |
| maker_sports | **$8743.57** | $-1013.83 | $-242.6 | 135 | 50% | $-1216.86 | 11 |
| mm_strong | **$8672.48** | $-876.62 | $-450.9 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8565.76** | $-1237.61 | $-196.63 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8186.66** | $-1059.12 | $-754.22 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7268.96** | $-2155.23 | $-575.81 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.75** | $-931.5 | $-68.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8512.91** | $-1937.09 | $450 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 2 | 61% | 2.97¢ |
| maker_sports | 146 | 97 | 5 | 60% | 1.59¢ |

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
