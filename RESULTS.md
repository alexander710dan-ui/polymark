# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90714 · Last run: 2026-11-03T19:30:04.038Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12504.44** | $2431.07 | $73.37 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11781.19** | $1009.61 | $771.58 | 205 | 56% | $776.28 | 16 |
| mm_tight | **$11235.92** | $687.75 | $548.17 | 646 | 53% | $468.62 | 14 |
| mid_momentum | **$10861.93** | $753.78 | $108.15 | 312 | 56% | $540.3 | 25 |
| maker_flat | **$10803.43** | $188.72 | $614.71 | 56 | 50% | $-5.4 | 24 |
| mm_max | **$10287.37** | $-171.07 | $458.44 | 267 | 53% | $-380.17 | 8 |
| mm_cheap | **$10275.84** | $324.11 | $-48.27 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$10033.33** | $-516.38 | $549.71 | 136 | 52% | $-725.48 | 25 |
| fade_longshot | **$9800.99** | $-203.07 | $4.06 | 179 | 94% | $-213.81 | 25 |
| mm_sports | **$9767.24** | $-921.7 | $688.94 | 764 | 54% | $-1140.83 | 17 |
| conviction | **$9685.22** | $-306.99 | $-7.79 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9662.23** | $-453.11 | $115.34 | 206 | 54% | $-657.06 | 25 |
| mid_momentum_v2 | **$9636.75** | $-471.4 | $108.15 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9426.2** | $-525.53 | $-48.27 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8738.87** | $-932.29 | $-328.84 | 196 | 59% | $-1025.92 | 24 |
| copy_top | **$8721.25** | $-1201.39 | $-77.36 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8630.69** | $-1203.06 | $-166.25 | 193 | 54% | $-1817.35 | 25 |
| super | **$8614.28** | $-1370.14 | $-15.58 | 131 | 50% | $-1652.04 | 2 |
| mm_sports_v2 | **$8537.93** | $-2151.01 | $688.94 | 333 | 51% | $-2370.14 | 17 |
| momentum | **$6810.32** | $-2991.46 | $-198.22 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6542.15** | $-3425.44 | $-32.41 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 80 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 221 | 1 | 0 | 100% | 1.32¢ |

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
