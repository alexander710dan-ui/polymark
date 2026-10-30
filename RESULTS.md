# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 74104 · Last run: 2026-10-30T05:04:24.860Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11687.06** | $1483.76 | $203.3 | 462 | 53% | $633.76 | 21 |
| maker_sports | **$11184.26** | $1086.14 | $98.12 | 38 | 68% | $894.59 | 7 |
| mm_tight | **$11039.08** | $884.17 | $154.91 | 499 | 54% | $675.07 | 6 |
| mid_momentum | **$10973** | $672.92 | $300.08 | 273 | 56% | $459.44 | 25 |
| mm_cheap | **$10564.76** | $405.05 | $159.71 | 96 | 57% | $222.59 | 25 |
| mm_max | **$10255.5** | $105.78 | $149.72 | 214 | 54% | $-103.32 | 2 |
| mm_sports | **$10131.03** | $48.84 | $82.19 | 592 | 55% | $-170.29 | 7 |
| copy_top | **$10123.61** | $116.37 | $7.24 | 479 | 53% | $-1212.2 | 16 |
| super | **$10122.95** | $87.83 | $35.12 | 95 | 53% | $-194.07 | 3 |
| fade_longshot | **$10082.31** | $89.44 | $-7.13 | 152 | 95% | $78.7 | 25 |
| conviction | **$9999.91** | $0 | $-0.09 | 0 | — | $0 | 2 |
| maker_flat | **$9934.71** | $-204.96 | $139.67 | 15 | 47% | $-396.51 | 25 |
| mid_momentum_v2 | **$9747.82** | $-552.26 | $300.08 | 108 | 51% | $-743.08 | 25 |
| mm_cheap_v2 | **$9715.12** | $-444.59 | $159.71 | 113 | 52% | $-635.41 | 25 |
| mm_strong | **$9334.87** | $-787.98 | $122.85 | 151 | 53% | $-991.93 | 25 |
| strong_dip | **$9214.65** | $-504.54 | $-280.81 | 147 | 61% | $-596.85 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8901.72** | $-1180.47 | $82.19 | 161 | 52% | $-1399.6 | 7 |
| mm_slow | **$8761.88** | $-1439.51 | $201.39 | 107 | 50% | $-1625.22 | 25 |
| random_control | **$8616.72** | $-1304.86 | $-78.42 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7425.49** | $-2533.86 | $-40.65 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5599.82** | $-4210.18 | $-190 | 480 | 46% | $-4564.73 | 16 |
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
| maker_flat | 40 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 45 | 1 | 0 | 98% | 1.48¢ |

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
