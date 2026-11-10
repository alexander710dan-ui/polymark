# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79033 · Last run: 2026-11-10T23:28:42.009Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.53** | $2469.41 | $-83.88 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12226.89** | $2256.87 | $-29.98 | 265 | 58% | $2012.04 | 15 |
| mm_cheap | **$11910.17** | $1471.47 | $438.7 | 182 | 57% | $1251.65 | 25 |
| mid_momentum | **$11630.92** | $1056.3 | $574.62 | 353 | 55% | $836.48 | 25 |
| mm_tight | **$11421.93** | $1535.7 | $-113.77 | 695 | 54% | $1316.57 | 13 |
| mm_cheap_v2 | **$11060.53** | $621.83 | $438.7 | 199 | 54% | $402.01 | 25 |
| maker_flat | **$10739.37** | $929.51 | $-190.14 | 90 | 53% | $735.39 | 18 |
| mid_momentum_v2 | **$10405.74** | $-168.88 | $574.62 | 188 | 51% | $-388.7 | 25 |
| mm_max | **$10231.32** | $228.15 | $3.17 | 288 | 54% | $19.05 | 2 |
| fade_longshot | **$9895.91** | $-104.88 | $0.79 | 218 | 94% | $-115.62 | 25 |
| mm_sports | **$9608.42** | $-315.79 | $-75.79 | 828 | 54% | $-534.92 | 15 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9454.28** | $-720.03 | $174.31 | 253 | 53% | $-939.16 | 25 |
| mm_slow | **$9406.57** | $-490.86 | $-102.57 | 172 | 52% | $-709.99 | 17 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9004.16** | $-955.63 | $-40.21 | 226 | 58% | $-1049.26 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8379.11** | $-1545.1 | $-75.79 | 397 | 52% | $-1764.23 | 15 |
| copy_top | **$8378.37** | $-1470.79 | $-150.84 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7761.79** | $-2393.67 | $155.46 | 232 | 53% | $-3007.96 | 25 |
| momentum | **$7500.82** | $-2770.22 | $271.04 | 347 | 65% | $-3258.46 | 25 |
| whale_fade | **$6004.42** | $-4244.08 | $248.5 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 108 | 0 | 0 | 100% | 2.59¢ |
| maker_sports | 280 | 1 | 0 | 100% | 1.32¢ |

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
