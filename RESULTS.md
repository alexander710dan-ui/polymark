# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 93244 · Last run: 2026-11-18T14:20:23.407Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$15466.91** | $5624.62 | $-157.71 | 725 | 58% | $5379.79 | 11 |
| copy_pro | **$12165.4** | $2165.4 | $0 | 535 | 55% | $1315.4 | 0 |
| mm_tight | **$11887.74** | $1844.39 | $43.35 | 1113 | 53% | $1625.26 | 7 |
| maker_flat | **$11507.31** | $979.17 | $528.14 | 183 | 52% | $785.05 | 25 |
| mid_momentum | **$11347.74** | $1318.25 | $29.49 | 507 | 55% | $1098.43 | 25 |
| mm_max | **$10767.89** | $809.09 | $-41.2 | 416 | 55% | $599.99 | 2 |
| mm_cheap | **$10491.12** | $562.76 | $-71.64 | 386 | 52% | $342.94 | 25 |
| mm_sports | **$10223.13** | $408.41 | $-185.28 | 1316 | 54% | $185.08 | 11 |
| mid_momentum_v2 | **$10122.56** | $93.07 | $29.49 | 342 | 52% | $-126.75 | 25 |
| fade_longshot | **$9934.81** | $-110.44 | $45.25 | 236 | 94% | $-121.18 | 25 |
| mm_cheap_v2 | **$9641.48** | $-286.88 | $-71.64 | 403 | 51% | $-506.7 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9321.87** | $-493.16 | $-184.97 | 244 | 52% | $-712.29 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8993.82** | $-820.9 | $-185.28 | 885 | 52% | $-1044.23 | 11 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_strong | **$8527.1** | $-1266.97 | $-205.93 | 472 | 51% | $-1486.1 | 25 |
| strong_dip | **$8401.37** | $-1757.52 | $158.89 | 312 | 56% | $-1851.15 | 25 |
| copy_top | **$8224.8** | $-1775.2 | $0 | 568 | 52% | $-3103.77 | 0 |
| momentum | **$7890.03** | $-2246.02 | $136.05 | 393 | 66% | $-2734.26 | 25 |
| random_control | **$6731.28** | $-3268.64 | $-0.08 | 271 | 52% | $-3882.93 | 25 |
| whale_fade | **$6070.6** | $-3929.4 | $0 | 567 | 47% | $-4380.86 | 0 |
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
| maker_flat | 208 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 736 | 9 | 0 | 99% | 1.4¢ |

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
