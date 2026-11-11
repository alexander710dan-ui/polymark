# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80089 · Last run: 2026-11-11T12:04:52.176Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13161.88** | $3480.73 | $-318.85 | 299 | 60% | $3235.9 | 19 |
| copy_pro | **$12384.73** | $2469.41 | $-84.68 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12182.83** | $1815.35 | $367.48 | 201 | 57% | $1595.53 | 25 |
| mm_tight | **$12142.4** | $2403.61 | $-261.21 | 725 | 55% | $2184.48 | 15 |
| mid_momentum | **$11591.09** | $1308.03 | $283.06 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11333.19** | $965.71 | $367.48 | 218 | 55% | $745.89 | 25 |
| maker_flat | **$10595.93** | $713.28 | $-117.35 | 96 | 52% | $519.16 | 17 |
| mm_sports | **$10480** | $833.76 | $-353.76 | 863 | 55% | $614.63 | 20 |
| mid_momentum_v2 | **$10365.91** | $82.85 | $283.06 | 200 | 52% | $-136.97 | 25 |
| mm_max | **$10290.68** | $263.29 | $27.39 | 293 | 54% | $54.19 | 2 |
| fade_longshot | **$9922.34** | $-56.44 | $-21.22 | 226 | 95% | $-67.18 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9525.56** | $-589.47 | $115.03 | 270 | 53% | $-808.6 | 25 |
| mm_slow | **$9466.38** | $-454.77 | $-78.85 | 177 | 52% | $-673.9 | 19 |
| mm_sports_v2 | **$9250.69** | $-395.55 | $-353.76 | 432 | 54% | $-614.68 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8711.85** | $-1344.86 | $56.71 | 233 | 58% | $-1438.49 | 18 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8376.88** | $-1470.79 | $-152.33 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7519.49** | $-2427.27 | $-53.24 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7389.92** | $-2625.55 | $15.47 | 359 | 66% | $-3113.79 | 25 |
| whale_fade | **$6006.29** | $-4244.08 | $250.37 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 113 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 318 | 1 | 0 | 100% | 1.34¢ |

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
