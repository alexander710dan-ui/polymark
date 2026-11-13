# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84716 · Last run: 2026-11-13T23:11:03.932Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13286.28** | $3399.79 | $-113.51 | 453 | 58% | $3154.96 | 15 |
| copy_pro | **$12384.24** | $2469.41 | $-85.17 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11775.67** | $1942.48 | $-166.81 | 869 | 53% | $1723.35 | 14 |
| mid_momentum | **$11407.52** | $1232.88 | $174.64 | 422 | 55% | $1013.06 | 25 |
| maker_flat | **$11358.77** | $1155.51 | $203.26 | 136 | 53% | $961.39 | 24 |
| mm_max | **$10859.7** | $835.19 | $24.51 | 340 | 55% | $626.09 | 2 |
| mm_cheap | **$10839.33** | $700.56 | $138.77 | 283 | 53% | $480.74 | 25 |
| mid_momentum_v2 | **$10182.34** | $7.7 | $174.64 | 257 | 52% | $-212.12 | 25 |
| mm_cheap_v2 | **$9989.69** | $-149.08 | $138.77 | 300 | 52% | $-368.9 | 25 |
| fade_longshot | **$9878.88** | $-140.38 | $19.26 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9390.6** | $-457.93 | $-151.47 | 1031 | 53% | $-677.06 | 17 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9098.94** | $-792.5 | $-108.56 | 221 | 52% | $-1011.63 | 24 |
| mm_strong | **$8682.39** | $-1460.98 | $143.37 | 372 | 51% | $-1680.11 | 24 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8528.27** | $-1526.28 | $54.55 | 284 | 56% | $-1619.91 | 24 |
| copy_top | **$8374.83** | $-1470.79 | $-154.38 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8161.29** | $-1687.24 | $-151.47 | 600 | 51% | $-1906.37 | 17 |
| random_control | **$7397.39** | $-2434.87 | $-167.74 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7300.67** | $-2722.45 | $23.12 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.57** | $-4244.08 | $215.65 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 160 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 468 | 3 | 1 | 99% | 1.39¢ |

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
