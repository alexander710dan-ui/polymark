# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91436 · Last run: 2026-11-04T06:06:03.251Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12472.53** | $2328.51 | $144.02 | 517 | 54% | $1478.51 | 18 |
| mm_cheap | **$11897.11** | $353.07 | $1544.04 | 146 | 55% | $161.38 | 25 |
| mid_momentum | **$11681.17** | $739.88 | $941.29 | 321 | 55% | $526.4 | 25 |
| maker_sports | **$11542.48** | $972.07 | $570.41 | 228 | 56% | $738.74 | 8 |
| maker_flat | **$11504.96** | $17.38 | $1487.58 | 61 | 49% | $-176.74 | 21 |
| mm_tight | **$11329.17** | $1002.71 | $326.46 | 663 | 54% | $783.58 | 9 |
| mm_cheap_v2 | **$11047.47** | $-496.57 | $1544.04 | 163 | 52% | $-688.26 | 25 |
| mid_momentum_v2 | **$10455.99** | $-485.3 | $941.29 | 156 | 51% | $-677.85 | 25 |
| mm_max | **$10203.23** | $-129.74 | $332.97 | 275 | 53% | $-338.84 | 7 |
| mm_slow | **$10084.69** | $-498.97 | $583.66 | 144 | 52% | $-708.07 | 24 |
| mm_strong | **$10029.24** | $-869.82 | $899.06 | 218 | 53% | $-1073.77 | 24 |
| fade_longshot | **$9899.06** | $-189.2 | $88.26 | 181 | 94% | $-199.94 | 25 |
| conviction | **$9593.08** | $-306.99 | $-99.93 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9357.24** | $-1157.32 | $514.56 | 788 | 54% | $-1376.45 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8689.27** | $-879.2 | $-431.53 | 202 | 59% | $-972.83 | 24 |
| super | **$8579.86** | $-1370.14 | $-50 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8397.05** | $-1146.58 | $-456.37 | 549 | 53% | $-2475.15 | 19 |
| mm_sports_v2 | **$8127.93** | $-2386.63 | $514.56 | 357 | 51% | $-2605.76 | 9 |
| random_control | **$7846.73** | $-1203.06 | $-950.21 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7525.28** | $-2991.46 | $516.74 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6412.35** | $-3527.96 | $-59.69 | 547 | 47% | $-3979.42 | 20 |
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
| maker_sports | 236 | 1 | 0 | 100% | 1.31¢ |

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
