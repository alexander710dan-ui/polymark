# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90235 · Last run: 2026-11-03T11:30:49.435Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12604.65** | $2431.07 | $173.58 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11191.16** | $795.58 | $395.58 | 185 | 56% | $583.08 | 13 |
| maker_flat | **$10775.78** | $110.93 | $664.85 | 49 | 49% | $-83.19 | 25 |
| mid_momentum | **$10715.98** | $600.42 | $115.56 | 311 | 56% | $386.94 | 25 |
| mm_tight | **$10487.97** | $259.86 | $228.11 | 627 | 53% | $50.76 | 12 |
| mm_cheap | **$10178.2** | $170.75 | $7.45 | 141 | 55% | $-20.94 | 25 |
| mm_max | **$9907.31** | $-363.25 | $270.56 | 253 | 52% | $-572.35 | 10 |
| fade_longshot | **$9779.15** | $-210.25 | $-10.6 | 178 | 94% | $-220.99 | 25 |
| mm_slow | **$9692.31** | $-706.96 | $399.27 | 132 | 52% | $-916.06 | 25 |
| conviction | **$9683.48** | $-306.99 | $-9.53 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9596.78** | $-528.49 | $125.27 | 196 | 54% | $-732.44 | 25 |
| mid_momentum_v2 | **$9490.8** | $-624.76 | $115.56 | 146 | 51% | $-817.31 | 25 |
| mm_cheap_v2 | **$9328.56** | $-678.89 | $7.45 | 158 | 51% | $-870.58 | 25 |
| mm_sports | **$9248.77** | $-1087.48 | $336.25 | 743 | 54% | $-1306.61 | 13 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8924.01** | $-904.07 | $-171.92 | 187 | 59% | $-997.7 | 23 |
| copy_top | **$8718.49** | $-1201.39 | $-80.12 | 548 | 53% | $-2529.96 | 20 |
| super | **$8621.29** | $-1370.14 | $-8.57 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8590.84** | $-1203.06 | $-206.1 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$8019.46** | $-2316.79 | $336.25 | 312 | 51% | $-2535.92 | 13 |
| momentum | **$6809.9** | $-2991.46 | $-198.64 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6480.62** | $-3425.44 | $-93.94 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 74 | 0 | 0 | 100% | 2.7¢ |
| maker_sports | 198 | 1 | 0 | 99% | 1.34¢ |

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
