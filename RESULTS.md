# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34676 · Last run: 2026-08-06T17:22:39.630Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10263.02** | $-11.32 | $274.34 | 2 | 50% | $-100 | 12 |
| maker_sports | **$10237.59** | $-7.69 | $245.28 | 2 | 50% | $-100 | 20 |
| mm_cheap | **$10114.27** | $640.15 | $-525.88 | 39 | 62% | $462.37 | 25 |
| mid_momentum | **$10101.91** | $513.6 | $-411.69 | 217 | 56% | $300.12 | 25 |
| super | **$10069.65** | $46.83 | $22.82 | 79 | 51% | $-217.5 | 14 |
| mm_tight | **$10034.23** | $108.22 | $-73.99 | 460 | 53% | $-100.88 | 21 |
| fade_longshot | **$9891.34** | $25.97 | $-134.63 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9803.57** | $-219.6 | $23.17 | 425 | 52% | $-1548.17 | 25 |
| strong_dip | **$9680.45** | $-517.26 | $197.71 | 108 | 59% | $-609.57 | 25 |
| copy_pro | **$9674.29** | $-706.11 | $380.4 | 406 | 51% | $-1556.11 | 25 |
| mm_max | **$9619.27** | $-276.89 | $-103.84 | 199 | 53% | $-485.99 | 3 |
| mid_momentum_v2 | **$9544.71** | $54.41 | $-509.7 | 54 | 54% | $-136.41 | 25 |
| mm_cheap_v2 | **$9400.75** | $-312.04 | $-287.21 | 58 | 52% | $-502.86 | 25 |
| ai_judge | **$9367.83** | $-587.64 | $-44.53 | 7 | 14% | $-600 | 2 |
| random_control | **$9084.74** | $-979.49 | $64.23 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8978.98** | $-1050.9 | $29.88 | 541 | 54% | $-1270.03 | 24 |
| mm_slow | **$8563.28** | $-809.59 | $-627.13 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8202.44** | $-1127.15 | $-670.41 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7832.43** | $-1421.89 | $-745.68 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7786.62** | $-2275.82 | $62.44 | 111 | 45% | $-2494.95 | 23 |
| whale_fade | **$6855.35** | $-2758.9 | $-385.75 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.88** | $-931.5 | $-61.62 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8163.42** | $-1590.97 | $-245.61 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6652.88** | $-3301.72 | $-45.4 | 210 | 45% | $-3504.75 | 7 |
| longshot (retired) | **$5078.49** | $-4791.55 | $-129.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 14 | 0 | 0 | 100% | 3.09¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 22 | 0 | 0 | 100% | 1.36¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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
