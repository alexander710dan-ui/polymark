# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90455 · Last run: 2026-11-03T15:09:38.757Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12503.19** | $2431.07 | $72.12 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11888.07** | $1110.68 | $777.39 | 196 | 57% | $877.35 | 10 |
| mm_tight | **$11392.9** | $939.4 | $453.5 | 638 | 53% | $720.27 | 10 |
| maker_flat | **$11123.47** | $488.72 | $634.75 | 53 | 53% | $294.6 | 24 |
| mid_momentum | **$10841.87** | $753.78 | $88.09 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10393.49** | $-111.18 | $504.67 | 259 | 53% | $-320.28 | 9 |
| mm_cheap | **$10263.61** | $324.11 | $-60.5 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$9943.93** | $-662.96 | $606.89 | 134 | 51% | $-872.06 | 25 |
| mm_sports | **$9925.89** | $-785.6 | $711.49 | 755 | 54% | $-1004.73 | 11 |
| fade_longshot | **$9791.4** | $-210.25 | $1.65 | 178 | 94% | $-220.99 | 25 |
| mm_strong | **$9744.26** | $-395.64 | $139.9 | 202 | 54% | $-599.59 | 25 |
| conviction | **$9684.64** | $-306.99 | $-8.37 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9616.69** | $-471.4 | $88.09 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9413.97** | $-525.53 | $-60.5 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$8721.61** | $-1201.39 | $-77 | 548 | 53% | $-2529.96 | 20 |
| mm_sports_v2 | **$8696.58** | $-2014.91 | $711.49 | 324 | 51% | $-2234.04 | 11 |
| strong_dip | **$8640.36** | $-980.71 | $-378.93 | 191 | 59% | $-1074.34 | 24 |
| super | **$8617.62** | $-1370.14 | $-12.24 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8597.99** | $-1203.06 | $-198.95 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$6807.54** | $-2991.46 | $-201 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6454.38** | $-3425.44 | $-120.18 | 546 | 47% | $-3876.9 | 21 |
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
