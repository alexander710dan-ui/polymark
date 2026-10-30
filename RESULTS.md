# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73433 · Last run: 2026-10-30T02:29:11.844Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11152.24** | $1359.94 | $-207.7 | 30 | 77% | $1168.39 | 12 |
| mm_tight | **$10880.84** | $1072.49 | $-191.65 | 492 | 54% | $863.39 | 10 |
| mid_momentum | **$10853.27** | $776.07 | $77.2 | 269 | 57% | $562.59 | 25 |
| copy_pro | **$10436.16** | $503.45 | $-67.29 | 450 | 53% | $-346.55 | 23 |
| mm_cheap | **$10347.46** | $229.69 | $117.77 | 89 | 56% | $47.23 | 25 |
| super | **$10149.03** | $-424.16 | $573.19 | 92 | 51% | $-688.49 | 4 |
| mm_sports | **$10122.57** | $349 | $-226.43 | 584 | 55% | $129.87 | 12 |
| fade_longshot | **$10072.29** | $89.44 | $-17.15 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10051.33** | $259.03 | $-207.7 | 211 | 54% | $49.93 | 5 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9970.94** | $-104.96 | $75.9 | 14 | 50% | $-296.51 | 24 |
| copy_top | **$9873** | $-582.35 | $455.35 | 466 | 53% | $-1910.92 | 21 |
| mid_momentum_v2 | **$9628.09** | $-449.11 | $77.2 | 104 | 51% | $-639.93 | 25 |
| mm_cheap_v2 | **$9497.82** | $-619.95 | $117.77 | 106 | 51% | $-810.77 | 25 |
| strong_dip | **$9268.39** | $-657.4 | $-74.21 | 145 | 60% | $-749.71 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9201.54** | $-927.98 | $129.52 | 147 | 52% | $-1131.93 | 25 |
| random_control | **$8978.97** | $-998.71 | $-22.32 | 184 | 56% | $-1613 | 25 |
| mm_sports_v2 | **$8893.26** | $-880.31 | $-226.43 | 153 | 52% | $-1099.44 | 12 |
| mm_slow | **$8681.65** | $-1337.81 | $19.46 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7369.01** | $-2533.86 | $-97.13 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5863.44** | $-3548.44 | $-588.12 | 467 | 46% | $-3902.99 | 21 |
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
| maker_flat | 38 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 42 | 1 | 0 | 98% | 1.52¢ |

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
