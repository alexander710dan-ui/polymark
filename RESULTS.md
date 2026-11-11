# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80189 · Last run: 2026-11-11T13:18:14.050Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13137.05** | $3245.02 | $-107.97 | 305 | 59% | $3000.19 | 15 |
| mm_tight | **$12440.17** | $2412.39 | $27.78 | 730 | 55% | $2193.26 | 13 |
| copy_pro | **$12384.78** | $2469.41 | $-84.63 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12206.9** | $1713.3 | $493.6 | 202 | 57% | $1493.48 | 25 |
| mid_momentum | **$11593.42** | $1308.03 | $285.39 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11357.26** | $863.66 | $493.6 | 219 | 54% | $643.84 | 25 |
| maker_flat | **$10685.78** | $798.47 | $-112.69 | 97 | 53% | $604.35 | 17 |
| mm_sports | **$10611.72** | $788.39 | $-176.67 | 870 | 55% | $569.26 | 16 |
| mm_max | **$10432.87** | $369.02 | $63.85 | 294 | 54% | $159.92 | 2 |
| mid_momentum_v2 | **$10368.24** | $82.85 | $285.39 | 200 | 52% | $-136.97 | 25 |
| fade_longshot | **$9844.61** | $-156.77 | $1.38 | 227 | 94% | $-167.51 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9574.56** | $-349.04 | $-76.4 | 178 | 52% | $-568.17 | 19 |
| mm_strong | **$9530.34** | $-565.32 | $95.66 | 273 | 53% | $-784.45 | 25 |
| mm_sports_v2 | **$9382.41** | $-440.92 | $-176.67 | 439 | 54% | $-660.05 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8489.22** | $-1548.8 | $38.02 | 235 | 57% | $-1642.43 | 18 |
| copy_top | **$8376.93** | $-1470.79 | $-152.28 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7587.85** | $-2427.27 | $15.12 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7398.23** | $-2625.55 | $23.78 | 359 | 66% | $-3113.79 | 25 |
| whale_fade | **$6003.16** | $-4244.08 | $247.24 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 114 | 0 | 1 | 100% | 2.63¢ |
| maker_sports | 320 | 1 | 1 | 100% | 1.35¢ |

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
