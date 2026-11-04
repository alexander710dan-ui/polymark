# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91036 · Last run: 2026-11-04T00:30:31.955Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12321.5** | $2431.07 | $-109.57 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11062.95** | $529.23 | $533.72 | 217 | 55% | $295.9 | 15 |
| mm_tight | **$11006.42** | $631.24 | $375.18 | 655 | 53% | $412.11 | 14 |
| mid_momentum | **$10854.19** | $846.78 | $7.41 | 316 | 56% | $633.3 | 25 |
| maker_flat | **$10783.44** | $188.72 | $594.72 | 56 | 50% | $-5.4 | 25 |
| mm_cheap | **$10491.73** | $438.8 | $52.93 | 143 | 55% | $247.11 | 25 |
| mm_max | **$10151.92** | $-175.82 | $327.74 | 272 | 53% | $-384.92 | 7 |
| fade_longshot | **$9845.94** | $-197.58 | $43.52 | 180 | 94% | $-208.32 | 25 |
| mm_slow | **$9836.19** | $-536.74 | $372.93 | 139 | 52% | $-745.84 | 25 |
| conviction | **$9688.57** | $-306.99 | $-4.44 | 3 | 0% | $-204.85 | 1 |
| mm_cheap_v2 | **$9642.09** | $-410.84 | $52.93 | 160 | 52% | $-602.53 | 25 |
| mid_momentum_v2 | **$9629.01** | $-378.4 | $7.41 | 151 | 51% | $-570.95 | 25 |
| mm_strong | **$9331.68** | $-605.86 | $-62.46 | 212 | 53% | $-809.81 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8970.97** | $-838.98 | $-190.05 | 200 | 59% | $-932.61 | 25 |
| mm_sports | **$8916.12** | $-1549.66 | $465.78 | 777 | 54% | $-1768.79 | 16 |
| super | **$8653.98** | $-1370.14 | $24.12 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8601.15** | $-1201.39 | $-197.46 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8478.36** | $-1203.06 | $-318.58 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7686.81** | $-2778.97 | $465.78 | 346 | 50% | $-2998.1 | 16 |
| momentum | **$6777.95** | $-2991.46 | $-230.59 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6706.7** | $-3425.44 | $132.14 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 232 | 1 | 0 | 100% | 1.32¢ |

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
