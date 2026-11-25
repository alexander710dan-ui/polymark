# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 105552 · Last run: 2026-11-25T17:20:50.684Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$16676.85** | $6400.35 | $276.5 | 1117 | 57% | $6155.52 | 21 |
| maker_flat | **$12222.36** | $1271.37 | $950.99 | 190 | 53% | $1077.25 | 25 |
| copy_pro | **$12165.4** | $2165.4 | $0 | 535 | 55% | $1315.4 | 0 |
| mid_momentum | **$11987.68** | $1400.76 | $586.92 | 519 | 55% | $1180.94 | 25 |
| mm_cheap | **$11482.47** | $815.11 | $667.36 | 399 | 53% | $595.29 | 25 |
| mid_momentum_v2 | **$10762.5** | $175.58 | $586.92 | 354 | 52% | $-44.24 | 25 |
| mm_cheap_v2 | **$10632.83** | $-34.53 | $667.36 | 416 | 51% | $-254.35 | 25 |
| mm_slow | **$10017.58** | $-387.43 | $405.01 | 245 | 52% | $-606.56 | 25 |
| fade_longshot | **$9775.42** | $-248.65 | $24.07 | 253 | 94% | $-259.39 | 25 |
| mm_tight | **$9725.78** | $-402.84 | $128.62 | 1458 | 52% | $-621.97 | 17 |
| mm_max | **$9706.63** | $-316.23 | $22.86 | 522 | 54% | $-525.33 | 6 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9324.23** | $-893.68 | $217.91 | 1717 | 54% | $-1117.01 | 23 |
| random_control | **$9229.37** | $-766.51 | $-4.12 | 290 | 52% | $-2789.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9012.87** | $-1509.33 | $522.2 | 492 | 51% | $-1728.46 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8514.75** | $-1619.03 | $133.78 | 323 | 56% | $-1712.66 | 25 |
| copy_top | **$8224.8** | $-1775.2 | $0 | 568 | 52% | $-3103.77 | 0 |
| mm_sports_v2 | **$8094.92** | $-2122.99 | $217.91 | 1286 | 53% | $-2346.32 | 23 |
| momentum | **$7703.71** | $-2357.92 | $61.63 | 402 | 66% | $-2846.16 | 25 |
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
| maker_flat | 215 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 1138 | 10 | 0 | 99% | 1.4¢ |

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
