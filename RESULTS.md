# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88187 · Last run: 2026-11-02T11:51:54.717Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11660.08** | $1766.37 | $-106.29 | 508 | 54% | $916.37 | 25 |
| maker_sports | **$10959.46** | $1121.45 | $-161.99 | 136 | 58% | $908.95 | 11 |
| mid_momentum | **$10709.8** | $627.56 | $82.24 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10427.78** | $518.58 | $-90.8 | 36 | 56% | $327.03 | 24 |
| mm_tight | **$10303.12** | $458.79 | $-155.67 | 584 | 53% | $249.69 | 10 |
| mm_max | **$10172.59** | $175.01 | $-2.42 | 238 | 53% | $-34.09 | 5 |
| fade_longshot | **$10010.74** | $-25.49 | $36.23 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9995.9** | $71.35 | $-75.45 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9687.11** | $-306.99 | $-5.9 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9484.62** | $-597.62 | $82.24 | 140 | 51% | $-790.17 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9146.26** | $-778.29 | $-75.45 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$9136.25** | $-670.35 | $-193.4 | 693 | 54% | $-889.48 | 12 |
| strong_dip | **$9129.02** | $-840.06 | $-30.92 | 171 | 59% | $-933.69 | 24 |
| mm_strong | **$8998.95** | $-782.82 | $-218.23 | 185 | 53% | $-986.77 | 25 |
| random_control | **$8921.53** | $-899.06 | $-179.41 | 190 | 55% | $-1513.35 | 25 |
| copy_top | **$8766.33** | $-1345.07 | $111.4 | 539 | 53% | $-2673.64 | 25 |
| mm_slow | **$8712.54** | $-1046.87 | $-240.59 | 122 | 51% | $-1246.55 | 25 |
| super | **$8608.38** | $-1375.81 | $-15.81 | 128 | 50% | $-1657.71 | 2 |
| mm_sports_v2 | **$7906.94** | $-1899.66 | $-193.4 | 262 | 50% | $-2118.79 | 12 |
| momentum | **$7027.1** | $-2788.51 | $-184.39 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6732.83** | $-3278.38 | $11.21 | 539 | 47% | $-3729.84 | 25 |
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
| maker_flat | 60 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 147 | 1 | 1 | 99% | 1.4¢ |

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
