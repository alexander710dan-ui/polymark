# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91376 · Last run: 2026-11-04T05:15:58.191Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12494.72** | $2431.07 | $63.65 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11884.97** | $558.27 | $1326.7 | 144 | 56% | $366.58 | 24 |
| mid_momentum | **$11647.23** | $842.64 | $804.59 | 320 | 56% | $629.16 | 25 |
| maker_sports | **$11522.46** | $799.66 | $722.8 | 226 | 56% | $566.33 | 9 |
| maker_flat | **$11481.58** | $88.72 | $1392.86 | 57 | 49% | $-105.4 | 25 |
| mm_tight | **$11314.46** | $909.08 | $405.38 | 662 | 54% | $689.95 | 9 |
| mm_cheap_v2 | **$11035.33** | $-291.37 | $1326.7 | 161 | 52% | $-483.06 | 24 |
| mid_momentum_v2 | **$10422.05** | $-382.54 | $804.59 | 155 | 51% | $-575.09 | 25 |
| mm_max | **$10187.57** | $-223.37 | $410.94 | 274 | 53% | $-432.47 | 7 |
| mm_slow | **$10069.97** | $-489.84 | $559.81 | 142 | 52% | $-698.94 | 25 |
| mm_strong | **$10000.9** | $-664.86 | $665.76 | 216 | 53% | $-868.81 | 25 |
| fade_longshot | **$9896.4** | $-189.2 | $85.6 | 181 | 94% | $-199.94 | 25 |
| conviction | **$9593.08** | $-306.99 | $-99.93 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9344.17** | $-1318.39 | $662.56 | 786 | 54% | $-1537.52 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8695.02** | $-879.2 | $-425.78 | 202 | 59% | $-972.83 | 23 |
| super | **$8579.86** | $-1370.14 | $-50 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8407.37** | $-1201.39 | $-391.24 | 548 | 53% | $-2529.96 | 20 |
| mm_sports_v2 | **$8114.86** | $-2547.7 | $662.56 | 355 | 51% | $-2766.83 | 10 |
| random_control | **$7851.67** | $-1203.06 | $-945.27 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7485.75** | $-2991.46 | $477.21 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6456.81** | $-3425.44 | $-117.75 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 235 | 1 | 0 | 100% | 1.32¢ |

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
