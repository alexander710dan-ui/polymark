# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91484 · Last run: 2026-11-04T06:46:07.210Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12469.19** | $2328.51 | $140.68 | 517 | 54% | $1478.51 | 18 |
| mm_cheap | **$11927.34** | $353.07 | $1574.27 | 146 | 55% | $161.38 | 25 |
| mid_momentum | **$11723.73** | $739.88 | $983.85 | 321 | 55% | $526.4 | 25 |
| maker_sports | **$11565.22** | $972.07 | $593.15 | 228 | 56% | $738.74 | 9 |
| maker_flat | **$11493.16** | $17.38 | $1475.78 | 61 | 49% | $-176.74 | 21 |
| mm_tight | **$11332.02** | $1002.71 | $329.31 | 663 | 54% | $783.58 | 9 |
| mm_cheap_v2 | **$11077.7** | $-496.57 | $1574.27 | 163 | 52% | $-688.26 | 25 |
| mid_momentum_v2 | **$10498.55** | $-485.3 | $983.85 | 156 | 51% | $-677.85 | 25 |
| mm_max | **$10206.07** | $-129.74 | $335.81 | 275 | 53% | $-338.84 | 7 |
| mm_slow | **$10098.76** | $-498.97 | $597.73 | 144 | 52% | $-708.07 | 25 |
| mm_strong | **$10054.3** | $-869.82 | $924.12 | 218 | 53% | $-1073.77 | 25 |
| fade_longshot | **$9903.02** | $-189.2 | $92.22 | 181 | 94% | $-199.94 | 25 |
| conviction | **$9593.08** | $-306.99 | $-99.93 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9375.98** | $-1157.32 | $533.3 | 788 | 54% | $-1376.45 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8695.18** | $-879.2 | $-425.62 | 202 | 59% | $-972.83 | 24 |
| super | **$8579.86** | $-1370.14 | $-50 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8394.61** | $-1146.58 | $-458.81 | 549 | 53% | $-2475.15 | 19 |
| mm_sports_v2 | **$8146.67** | $-2386.63 | $533.3 | 357 | 51% | $-2605.76 | 10 |
| random_control | **$7844.65** | $-1203.06 | $-952.29 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7511.79** | $-2991.46 | $503.25 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6180.05** | $-3527.96 | $-291.99 | 547 | 47% | $-3979.42 | 20 |
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
| maker_sports | 237 | 1 | 0 | 100% | 1.32¢ |

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
