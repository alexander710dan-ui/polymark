# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79821 · Last run: 2026-11-11T08:49:34.146Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13258.43** | $3530.73 | $-272.3 | 296 | 60% | $3285.9 | 10 |
| copy_pro | **$12385.38** | $2469.41 | $-84.03 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12185.11** | $2468.36 | $-283.25 | 722 | 55% | $2249.23 | 7 |
| mm_cheap | **$12153.79** | $1931.14 | $222.65 | 198 | 58% | $1711.32 | 25 |
| mid_momentum | **$11704.17** | $1327.44 | $376.73 | 363 | 56% | $1107.62 | 25 |
| mm_cheap_v2 | **$11304.15** | $1081.5 | $222.65 | 215 | 55% | $861.68 | 25 |
| maker_flat | **$10719.09** | $637.84 | $81.25 | 95 | 52% | $443.72 | 16 |
| mm_sports | **$10599.51** | $898.51 | $-299 | 860 | 55% | $679.38 | 10 |
| mid_momentum_v2 | **$10478.99** | $102.26 | $376.73 | 198 | 52% | $-117.56 | 25 |
| mm_max | **$10255.09** | $263.29 | $-8.2 | 293 | 54% | $54.19 | 1 |
| fade_longshot | **$9930.65** | $-93.79 | $24.44 | 220 | 95% | $-104.53 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9497.06** | $-466.81 | $-36.13 | 267 | 53% | $-685.94 | 23 |
| mm_slow | **$9420.53** | $-454.77 | $-124.7 | 177 | 52% | $-673.9 | 17 |
| mm_sports_v2 | **$9370.2** | $-330.8 | $-299 | 429 | 54% | $-549.93 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8776.73** | $-1140.41 | $-82.86 | 231 | 58% | $-1234.04 | 16 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.68** | $-1470.79 | $-151.53 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7569.32** | $-2353.45 | $-77.23 | 238 | 54% | $-2967.74 | 25 |
| momentum | **$7488.55** | $-2599.19 | $87.74 | 355 | 66% | $-3087.43 | 25 |
| whale_fade | **$6007.93** | $-4244.08 | $252.01 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 111 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 306 | 1 | 0 | 100% | 1.3¢ |

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
