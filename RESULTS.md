# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85589 · Last run: 2026-11-01T17:24:52.733Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11694.21** | $1516.04 | $178.17 | 496 | 54% | $666.04 | 25 |
| maker_sports | **$11464.1** | $1591.58 | $-127.48 | 102 | 61% | $1379.08 | 6 |
| mid_momentum | **$10796.02** | $760.42 | $35.6 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10720.61** | $830.25 | $-109.64 | 553 | 54% | $621.15 | 5 |
| mm_cheap | **$10353.15** | $482.82 | $-129.67 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10327.48** | $303.95 | $23.53 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10210.14** | $319.37 | $-109.23 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$9995.98** | $-49.11 | $45.09 | 167 | 95% | $-59.85 | 25 |
| conviction | **$9692.79** | $-306.99 | $-0.22 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9576.43** | $-276.04 | $-147.53 | 656 | 55% | $-495.17 | 7 |
| mid_momentum_v2 | **$9570.84** | $-464.76 | $35.6 | 132 | 51% | $-657.31 | 25 |
| mm_cheap_v2 | **$9503.51** | $-366.82 | $-129.67 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9403.65** | $-348.45 | $-247.9 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9173.56** | $-848.93 | $22.49 | 519 | 52% | $-2177.5 | 25 |
| strong_dip | **$9064.6** | $-963.24 | $27.84 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8968.02** | $-899.06 | $-132.92 | 190 | 55% | $-1513.35 | 25 |
| super | **$8926.19** | $-1150.21 | $76.4 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8703.33** | $-1007.21 | $-289.46 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8347.12** | $-1505.35 | $-147.53 | 225 | 52% | $-1724.48 | 7 |
| momentum | **$7209.01** | $-2740.4 | $-50.59 | 306 | 65% | $-3228.64 | 25 |
| whale_fade | **$6398.15** | $-3089.37 | $-512.48 | 520 | 47% | $-3540.83 | 25 |
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
| maker_flat | 54 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 108 | 1 | 1 | 99% | 1.42¢ |

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
