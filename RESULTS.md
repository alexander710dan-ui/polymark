# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70939 · Last run: 2026-10-29T16:38:15.240Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10283.63** | $402.24 | $-118.61 | 474 | 53% | $193.14 | 5 |
| maker_sports | **$10169.35** | $369.76 | $-200.41 | 8 | 75% | $178.21 | 9 |
| fade_longshot | **$10098.74** | $80 | $18.74 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| copy_pro | **$9965.73** | $234.11 | $-268.38 | 437 | 53% | $-615.89 | 25 |
| mid_momentum | **$9958.41** | $171.7 | $-213.29 | 250 | 55% | $-41.78 | 22 |
| maker_flat | **$9875.91** | $393 | $-517.09 | 8 | 75% | $201.45 | 17 |
| strong_dip | **$9839.78** | $-275.18 | $114.96 | 136 | 62% | $-367.49 | 9 |
| mm_max | **$9710.78** | $-118.65 | $-170.57 | 205 | 53% | $-327.75 | 2 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9451.56** | $-462.41 | $-86.03 | 453 | 53% | $-1790.98 | 13 |
| mm_cheap | **$9307.5** | $-404.12 | $-288.38 | 70 | 51% | $-586.58 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9030.75** | $-754.43 | $-214.82 | 561 | 54% | $-973.56 | 10 |
| random_control | **$8742.94** | $-1189.69 | $-67.37 | 180 | 56% | $-1803.98 | 25 |
| mid_momentum_v2 | **$8733.23** | $-1053.48 | $-213.29 | 85 | 46% | $-1244.3 | 22 |
| mm_cheap_v2 | **$8457.86** | $-1253.76 | $-288.38 | 87 | 46% | $-1444.58 | 19 |
| mm_strong | **$8196.76** | $-1544.24 | $-259 | 128 | 48% | $-1748.19 | 18 |
| mm_slow | **$7975.48** | $-1775.71 | $-248.81 | 96 | 47% | $-1961.42 | 16 |
| mm_sports_v2 | **$7801.44** | $-1983.74 | $-214.82 | 130 | 48% | $-2202.87 | 10 |
| momentum | **$7387.39** | $-2548.15 | $-64.46 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6426.04** | $-3630.32 | $56.36 | 454 | 46% | $-3984.87 | 13 |
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
| maker_flat | 25 | 0 | 0 | 100% | 2.82¢ |
| maker_sports | 17 | 1 | 1 | 94% | 1.81¢ |

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
