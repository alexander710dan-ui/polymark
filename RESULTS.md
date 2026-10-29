# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71916 · Last run: 2026-10-29T20:29:54.639Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10954.98** | $608.09 | $346.89 | 443 | 53% | $-241.91 | 25 |
| maker_sports | **$10703.17** | $699.24 | $3.93 | 19 | 74% | $507.69 | 7 |
| mm_tight | **$10637.82** | $605.55 | $32.27 | 483 | 54% | $396.45 | 3 |
| mid_momentum | **$10570.98** | $503.32 | $67.66 | 261 | 56% | $289.84 | 22 |
| fade_longshot | **$10088.59** | $89.44 | $-0.85 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9997.21** | $-16.21 | $13.42 | 208 | 53% | $-225.31 | 2 |
| mm_cheap | **$9861.11** | $-148.79 | $9.9 | 80 | 54% | $-331.25 | 18 |
| maker_flat | **$9856.18** | $93 | $-236.82 | 11 | 55% | $-98.55 | 20 |
| copy_top | **$9682.66** | $-336.59 | $19.25 | 459 | 53% | $-1665.16 | 15 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9566.98** | $-422.81 | $-10.21 | 572 | 55% | $-641.94 | 7 |
| strong_dip | **$9513.02** | $-335.55 | $-151.43 | 140 | 61% | $-427.86 | 10 |
| mid_momentum_v2 | **$9345.8** | $-721.86 | $67.66 | 96 | 49% | $-912.68 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9011.47** | $-998.43 | $9.9 | 97 | 48% | $-1189.25 | 18 |
| mm_strong | **$8815.95** | $-1210.99 | $26.94 | 138 | 51% | $-1414.94 | 19 |
| random_control | **$8737.96** | $-1190.91 | $-71.13 | 182 | 56% | $-1805.2 | 25 |
| mm_slow | **$8402.71** | $-1704.03 | $106.74 | 101 | 48% | $-1889.74 | 18 |
| mm_sports_v2 | **$8337.67** | $-1652.12 | $-10.21 | 141 | 50% | $-1871.25 | 7 |
| momentum | **$7401.28** | $-2533.86 | $-64.86 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6083.93** | $-3817.17 | $-98.9 | 460 | 46% | $-4171.72 | 15 |
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
| maker_flat | 31 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 26 | 1 | 0 | 96% | 1.77¢ |

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
