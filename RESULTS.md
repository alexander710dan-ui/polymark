# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85516 · Last run: 2026-11-01T16:55:55.817Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11680.02** | $1516.04 | $163.98 | 496 | 54% | $666.04 | 25 |
| maker_sports | **$11492.48** | $1591.58 | $-99.1 | 102 | 61% | $1379.08 | 6 |
| mid_momentum | **$10832.04** | $760.42 | $71.62 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10719.09** | $830.25 | $-111.16 | 553 | 54% | $621.15 | 4 |
| mm_cheap | **$10383.26** | $482.82 | $-99.56 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10329.58** | $303.95 | $25.63 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10208.62** | $319.37 | $-110.75 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$9988.71** | $-49.11 | $37.82 | 167 | 95% | $-59.85 | 25 |
| conviction | **$9692.79** | $-306.99 | $-0.22 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9606.86** | $-464.76 | $71.62 | 132 | 51% | $-657.31 | 25 |
| mm_sports | **$9604.28** | $-276.04 | $-119.68 | 656 | 55% | $-495.17 | 6 |
| mm_cheap_v2 | **$9533.62** | $-366.82 | $-99.56 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9437.65** | $-348.45 | $-213.9 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9172.3** | $-848.93 | $21.23 | 519 | 52% | $-2177.5 | 25 |
| strong_dip | **$9048.61** | $-963.24 | $11.85 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8978.44** | $-899.06 | $-122.5 | 190 | 55% | $-1513.35 | 25 |
| super | **$8928.28** | $-1150.21 | $78.49 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8727.75** | $-1007.21 | $-265.04 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8374.97** | $-1505.35 | $-119.68 | 225 | 52% | $-1724.48 | 6 |
| momentum | **$7197.25** | $-2740.4 | $-62.35 | 306 | 65% | $-3228.64 | 25 |
| whale_fade | **$6411.94** | $-3089.37 | $-498.69 | 520 | 47% | $-3540.83 | 25 |
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
| maker_sports | 108 | 1 | 0 | 99% | 1.42¢ |

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
