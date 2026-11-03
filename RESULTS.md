# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90430 · Last run: 2026-11-03T14:44:36.409Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12506.38** | $2431.07 | $75.31 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11920.28** | $821.1 | $1099.18 | 194 | 56% | $608.6 | 12 |
| mm_tight | **$11430.12** | $668.17 | $761.95 | 636 | 53% | $459.07 | 12 |
| maker_flat | **$11125.14** | $488.72 | $636.42 | 53 | 53% | $294.6 | 24 |
| mid_momentum | **$10834.28** | $753.78 | $80.5 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10387.42** | $-163.28 | $550.7 | 258 | 53% | $-372.38 | 9 |
| mm_cheap | **$10260.03** | $324.11 | $-64.08 | 142 | 55% | $132.42 | 25 |
| mm_sports | **$9962.89** | $-1056.83 | $1019.72 | 753 | 54% | $-1275.96 | 13 |
| mm_slow | **$9914.13** | $-662.96 | $577.09 | 134 | 51% | $-872.06 | 25 |
| fade_longshot | **$9790.9** | $-210.25 | $1.15 | 178 | 94% | $-220.99 | 25 |
| mm_strong | **$9730.59** | $-468.93 | $199.52 | 201 | 54% | $-672.88 | 25 |
| conviction | **$9686.39** | $-306.99 | $-6.62 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9609.1** | $-471.4 | $80.5 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9410.39** | $-525.53 | $-64.08 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8733.58** | $-2286.14 | $1019.72 | 322 | 51% | $-2505.27 | 13 |
| copy_top | **$8722.29** | $-1201.39 | $-76.32 | 548 | 53% | $-2529.96 | 20 |
| strong_dip | **$8636.78** | $-980.71 | $-382.51 | 191 | 59% | $-1074.34 | 24 |
| super | **$8621.11** | $-1370.14 | $-8.75 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8603.93** | $-1203.06 | $-193.01 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$6810.08** | $-2991.46 | $-198.46 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6417.67** | $-3425.44 | $-156.89 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 77 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 206 | 1 | 0 | 100% | 1.33¢ |

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
