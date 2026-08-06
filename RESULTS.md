# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34125 · Last run: 2026-08-06T12:03:50.337Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10343.31** | $46.83 | $296.48 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10259.26** | $559.07 | $-299.81 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10230.05** | $685.62 | $-455.57 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10032.83** | $-117.05 | $149.88 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9981.95** | $246.52 | $-264.57 | 436 | 53% | $37.42 | 20 |
| fade_longshot | **$9862.62** | $25.97 | $-163.35 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9760.49** | $-344.49 | $104.98 | 193 | 53% | $-553.59 | 3 |
| strong_dip | **$9624.34** | $-517.26 | $141.6 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9540.03** | $-188.11 | $-271.86 | 46 | 50% | $-378.93 | 25 |
| copy_pro | **$9505.14** | $-919.79 | $424.93 | 404 | 51% | $-1769.79 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9361.33** | $-335.37 | $-303.3 | 51 | 51% | $-526.19 | 25 |
| mm_sports | **$9192.85** | $-461.85 | $-345.3 | 514 | 55% | $-680.98 | 25 |
| random_control | **$9125.31** | $-1085.22 | $210.53 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8668.77** | $-809.59 | $-521.64 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8547.2** | $-1090.97 | $-361.83 | 94 | 43% | $-1285.09 | 19 |
| mm_strong | **$8236.39** | $-1227.41 | $-536.2 | 93 | 46% | $-1431.36 | 25 |
| mm_sports_v2 | **$7930.67** | $-1767.35 | $-301.98 | 84 | 45% | $-1986.48 | 23 |
| momentum | **$7880.6** | $-1376.42 | $-742.98 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$6959.38** | $-2574.37 | $-466.25 | 190 | 47% | $-2777.4 | 14 |
| whale_fade | **$6697.98** | $-2848.81 | $-453.21 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.98** | $-931.5 | $-71.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5083.78** | $-4791.55 | $-124.67 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 113 | 79 | 4 | 59% | 2.93¢ |
| maker_sports | 204 | 128 | 6 | 61% | 1.55¢ |

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
