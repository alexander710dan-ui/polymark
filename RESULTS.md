# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69330 · Last run: 2026-10-29T10:22:39.532Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10228.71** | $141.75 | $86.96 | 469 | 53% | $-67.35 | 3 |
| maker_flat | **$10198.89** | $0 | $198.89 | 0 | — | $0 | 8 |
| maker_sports | **$10176.94** | $0 | $176.94 | 0 | — | $0 | 3 |
| copy_pro | **$10170.05** | $68.12 | $101.93 | 430 | 52% | $-781.88 | 10 |
| fade_longshot | **$10072.07** | $67.27 | $4.8 | 149 | 95% | $56.53 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum | **$9899.94** | $-249.04 | $148.98 | 241 | 54% | $-462.52 | 10 |
| strong_dip | **$9789.39** | $-117.06 | $-93.55 | 133 | 62% | $-209.37 | 4 |
| mm_max | **$9706.04** | $-379.44 | $85.48 | 200 | 53% | $-588.54 | 3 |
| copy_top | **$9597.72** | $-398.51 | $-3.77 | 450 | 53% | $-1727.08 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9370.79** | $-715.18 | $85.97 | 63 | 49% | $-892.96 | 7 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8974.31** | $-1175.17 | $149.48 | 552 | 54% | $-1394.3 | 4 |
| random_control | **$8750.15** | $-1171.53 | $-78.32 | 173 | 56% | $-1785.82 | 25 |
| mid_momentum_v2 | **$8674.76** | $-1474.22 | $148.98 | 76 | 42% | $-1665.04 | 10 |
| mm_cheap_v2 | **$8521.15** | $-1564.82 | $85.97 | 80 | 44% | $-1755.64 | 7 |
| mm_strong | **$8268.16** | $-1876.85 | $145.01 | 119 | 46% | $-2080.8 | 9 |
| mm_slow | **$7952.53** | $-2196.45 | $148.98 | 87 | 44% | $-2382.16 | 10 |
| mm_sports_v2 | **$7745** | $-2404.48 | $149.48 | 121 | 45% | $-2623.61 | 4 |
| momentum | **$7387.77** | $-2447.35 | $-164.88 | 295 | 65% | $-2935.59 | 25 |
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
| maker_sports | 3 | 0 | 1 | 100% | 2.9¢ |

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
