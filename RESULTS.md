# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69392 · Last run: 2026-10-29T10:36:48.225Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10178.35** | $141.75 | $36.6 | 469 | 53% | $-67.35 | 3 |
| copy_pro | **$10177.48** | $68.12 | $109.36 | 430 | 52% | $-781.88 | 11 |
| maker_flat | **$10169.03** | $0 | $169.03 | 0 | — | $0 | 8 |
| maker_sports | **$10119.52** | $0 | $119.52 | 0 | — | $0 | 5 |
| fade_longshot | **$10070.83** | $67.27 | $3.56 | 149 | 95% | $56.53 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum | **$9826.02** | $-249.04 | $75.06 | 241 | 54% | $-462.52 | 13 |
| strong_dip | **$9775.61** | $-117.06 | $-107.33 | 133 | 62% | $-209.37 | 4 |
| mm_max | **$9656.53** | $-379.44 | $35.97 | 200 | 53% | $-588.54 | 3 |
| copy_top | **$9597.72** | $-398.51 | $-3.77 | 450 | 53% | $-1727.08 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9303.28** | $-715.18 | $18.46 | 63 | 49% | $-892.96 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8915.02** | $-1175.17 | $90.19 | 552 | 54% | $-1394.3 | 5 |
| random_control | **$8748.81** | $-1085.2 | $-165.99 | 174 | 56% | $-1699.49 | 25 |
| mid_momentum_v2 | **$8600.84** | $-1474.22 | $75.06 | 76 | 42% | $-1665.04 | 13 |
| mm_cheap_v2 | **$8453.64** | $-1564.82 | $18.46 | 80 | 44% | $-1755.64 | 9 |
| mm_strong | **$8209.99** | $-1876.85 | $86.84 | 119 | 46% | $-2080.8 | 10 |
| mm_slow | **$7878.61** | $-2196.45 | $75.06 | 87 | 44% | $-2382.16 | 13 |
| mm_sports_v2 | **$7685.71** | $-2404.48 | $90.19 | 121 | 45% | $-2623.61 | 5 |
| momentum | **$7401.12** | $-2447.35 | $-151.53 | 295 | 65% | $-2935.59 | 25 |
| whale_fade | **$6228.01** | $-3759.78 | $-12.21 | 451 | 46% | $-4114.33 | 5 |
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
| maker_flat | 8 | 0 | 0 | 100% | 2.84¢ |
| maker_sports | 5 | 0 | 0 | 100% | 2.14¢ |

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
