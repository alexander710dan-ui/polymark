# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70135 · Last run: 2026-10-29T13:27:39.737Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10319.59** | $178.24 | $141.35 | 431 | 52% | $-671.76 | 21 |
| maker_flat | **$10253.89** | $223.83 | $30.06 | 4 | 75% | $32.28 | 14 |
| mm_tight | **$10234.99** | $207.55 | $27.44 | 471 | 53% | $-1.55 | 4 |
| maker_sports | **$10183.34** | $290.97 | $-107.63 | 5 | 80% | $99.42 | 4 |
| fade_longshot | **$10089.88** | $80 | $9.88 | 151 | 95% | $69.26 | 25 |
| mid_momentum | **$10037.86** | $3.63 | $34.23 | 246 | 55% | $-209.85 | 17 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9796.95** | $-218.44 | $15.39 | 134 | 62% | $-310.75 | 6 |
| mm_max | **$9715.08** | $-313.34 | $28.42 | 202 | 52% | $-522.44 | 3 |
| copy_top | **$9585.39** | $-398.51 | $-16.1 | 450 | 53% | $-1727.08 | 10 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9400.92** | $-530.83 | $-68.25 | 67 | 51% | $-708.61 | 14 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9018.64** | $-922.5 | $-58.86 | 557 | 54% | $-1141.63 | 5 |
| random_control | **$8832.18** | $-1125.99 | $-41.83 | 178 | 56% | $-1740.28 | 25 |
| mid_momentum_v2 | **$8812.68** | $-1221.55 | $34.23 | 81 | 44% | $-1412.37 | 17 |
| mm_cheap_v2 | **$8551.28** | $-1380.47 | $-68.25 | 84 | 45% | $-1571.29 | 14 |
| mm_strong | **$8316.92** | $-1635.58 | $-47.5 | 124 | 48% | $-1839.53 | 13 |
| mm_slow | **$8091.43** | $-1943.78 | $35.21 | 92 | 46% | $-2129.49 | 16 |
| mm_sports_v2 | **$7789.33** | $-2151.81 | $-58.86 | 126 | 47% | $-2370.94 | 5 |
| momentum | **$7446.18** | $-2548.15 | $-5.67 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6226.79** | $-3759.78 | $-13.43 | 451 | 46% | $-4114.33 | 10 |
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
| maker_flat | 18 | 0 | 0 | 100% | 2.92¢ |
| maker_sports | 9 | 1 | 0 | 90% | 1.97¢ |

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
