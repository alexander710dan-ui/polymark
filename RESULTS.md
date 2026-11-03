# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90490 · Last run: 2026-11-03T15:44:42.079Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12516.59** | $2431.07 | $85.52 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11909.63** | $1273.84 | $635.79 | 197 | 57% | $1040.51 | 11 |
| mm_tight | **$11404.83** | $1029.31 | $375.52 | 639 | 54% | $810.18 | 11 |
| maker_flat | **$11002.02** | $488.72 | $513.3 | 53 | 53% | $294.6 | 25 |
| mid_momentum | **$10844.34** | $753.78 | $90.56 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10465.75** | $-21.27 | $487.02 | 260 | 53% | $-230.37 | 9 |
| mm_cheap | **$10277.71** | $324.11 | $-46.4 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$10033.27** | $-662.96 | $696.23 | 134 | 51% | $-872.06 | 25 |
| mm_sports | **$9936.93** | $-632.24 | $569.17 | 756 | 54% | $-851.37 | 12 |
| mm_strong | **$9812.29** | $-395.64 | $207.93 | 202 | 54% | $-599.59 | 25 |
| fade_longshot | **$9790.23** | $-210.25 | $0.48 | 178 | 94% | $-220.99 | 25 |
| conviction | **$9685.95** | $-306.99 | $-7.06 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9619.16** | $-471.4 | $90.56 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9428.07** | $-525.53 | $-46.4 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$8720.6** | $-1201.39 | $-78.01 | 548 | 53% | $-2529.96 | 20 |
| mm_sports_v2 | **$8707.62** | $-1861.55 | $569.17 | 325 | 51% | $-2080.68 | 12 |
| strong_dip | **$8645.39** | $-1082.61 | $-272 | 192 | 58% | $-1176.24 | 24 |
| super | **$8620.24** | $-1370.14 | $-9.62 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8603.71** | $-1203.06 | $-193.23 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$6811.88** | $-2991.46 | $-196.66 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6468.68** | $-3425.44 | $-105.88 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 78 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 208 | 1 | 0 | 100% | 1.33¢ |

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
