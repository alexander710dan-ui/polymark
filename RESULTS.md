# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89755 · Last run: 2026-11-03T03:45:42.804Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12656.47** | $1963.49 | $692.98 | 514 | 54% | $1113.49 | 21 |
| mid_momentum | **$10771.35** | $482.3 | $289.05 | 308 | 56% | $268.82 | 25 |
| maker_flat | **$10404.67** | $16.81 | $387.86 | 47 | 49% | $-174.74 | 20 |
| maker_sports | **$10383.61** | $384.64 | $-1.03 | 171 | 55% | $172.14 | 10 |
| mm_cheap | **$10249.62** | $23.75 | $225.87 | 140 | 54% | $-167.94 | 24 |
| mm_tight | **$9970.71** | $41.59 | $-70.88 | 615 | 53% | $-167.51 | 8 |
| mm_max | **$9855.84** | $-158.65 | $14.49 | 251 | 53% | $-367.75 | 1 |
| fade_longshot | **$9710.01** | $-125.79 | $-164.2 | 175 | 94% | $-136.53 | 25 |
| conviction | **$9680.86** | $-306.99 | $-12.15 | 3 | 0% | $-204.85 | 1 |
| mm_slow | **$9632.31** | $-933.57 | $565.88 | 127 | 51% | $-1142.67 | 21 |
| mm_strong | **$9622.46** | $-732.03 | $354.49 | 189 | 53% | $-935.98 | 24 |
| mid_momentum_v2 | **$9546.17** | $-742.88 | $289.05 | 143 | 50% | $-935.43 | 25 |
| mm_cheap_v2 | **$9399.98** | $-825.89 | $225.87 | 157 | 51% | $-1017.58 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9111.1** | $-561.14 | $-327.76 | 182 | 60% | $-654.77 | 23 |
| random_control | **$8662.26** | $-899.06 | $-438.68 | 190 | 55% | $-1513.35 | 25 |
| super | **$8523.62** | $-1484.7 | $8.32 | 130 | 50% | $-1766.6 | 3 |
| copy_top | **$8521.12** | $-1431.52 | $-47.36 | 545 | 52% | $-2760.09 | 23 |
| mm_sports | **$8489.51** | $-1479.86 | $-30.63 | 728 | 54% | $-1698.99 | 10 |
| mm_sports_v2 | **$7260.2** | $-2709.17 | $-30.63 | 297 | 49% | $-2928.3 | 10 |
| momentum | **$6858.14** | $-2890.56 | $-251.3 | 314 | 65% | $-3378.8 | 25 |
| whale_fade | **$6702.26** | $-3115.83 | $-181.91 | 543 | 47% | $-3567.29 | 24 |
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
| maker_flat | 67 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 181 | 1 | 0 | 99% | 1.37¢ |

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
