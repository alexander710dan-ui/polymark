# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78802 · Last run: 2026-11-10T20:44:27.043Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.13** | $2469.41 | $-84.28 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12204.52** | $2061.08 | $143.44 | 257 | 58% | $1816.25 | 13 |
| mm_cheap | **$11971.67** | $1422.5 | $549.17 | 175 | 56% | $1202.68 | 25 |
| mid_momentum | **$11694.74** | $1011.69 | $683.05 | 346 | 55% | $791.87 | 25 |
| mm_tight | **$11529.21** | $1488.87 | $40.34 | 689 | 54% | $1269.74 | 10 |
| mm_cheap_v2 | **$11122.03** | $572.86 | $549.17 | 192 | 53% | $353.04 | 25 |
| maker_flat | **$11076.02** | $875.28 | $200.74 | 87 | 53% | $681.16 | 16 |
| mid_momentum_v2 | **$10469.56** | $-213.49 | $683.05 | 181 | 50% | $-433.31 | 25 |
| mm_max | **$10225.22** | $334.95 | $-109.73 | 285 | 54% | $125.85 | 3 |
| fade_longshot | **$9965.75** | $-21.96 | $-12.29 | 214 | 95% | $-32.7 | 25 |
| mm_sports | **$9631.16** | $-457.9 | $89.06 | 820 | 54% | $-677.03 | 13 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9563.09** | $-816.68 | $379.77 | 246 | 52% | $-1035.81 | 25 |
| mm_slow | **$9380.13** | $-429.52 | $-190.35 | 168 | 52% | $-648.65 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9030.64** | $-936.27 | $-33.09 | 224 | 58% | $-1029.9 | 18 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8401.85** | $-1687.21 | $89.06 | 389 | 52% | $-1906.34 | 13 |
| copy_top | **$8378.46** | $-1470.79 | $-150.75 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7594.18** | $-2289.22 | $-116.6 | 231 | 54% | $-2903.51 | 25 |
| momentum | **$7301.78** | $-2717.88 | $19.66 | 344 | 65% | $-3206.12 | 25 |
| whale_fade | **$6011.11** | $-4244.08 | $255.19 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 103 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 270 | 1 | 0 | 100% | 1.33¢ |

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
