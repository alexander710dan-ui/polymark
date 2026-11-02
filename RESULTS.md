# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88174 · Last run: 2026-11-02T11:46:31.934Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11671.34** | $1766.37 | $-95.03 | 508 | 54% | $916.37 | 25 |
| maker_sports | **$10999.11** | $1057.52 | $-58.41 | 135 | 58% | $845.02 | 12 |
| mid_momentum | **$10708.44** | $627.56 | $80.88 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10431.98** | $433.39 | $-1.41 | 35 | 54% | $241.84 | 25 |
| mm_tight | **$10302** | $560.69 | $-258.69 | 583 | 53% | $351.59 | 10 |
| mm_max | **$10169.73** | $276.91 | $-107.18 | 237 | 53% | $67.81 | 6 |
| fade_longshot | **$10011.5** | $-25.49 | $36.99 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9994.68** | $71.35 | $-76.67 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9687.11** | $-306.99 | $-5.9 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9483.26** | $-597.62 | $80.88 | 140 | 51% | $-790.17 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9176.33** | $-729.74 | $-93.93 | 692 | 54% | $-948.87 | 12 |
| mm_cheap_v2 | **$9145.04** | $-778.29 | $-76.67 | 155 | 51% | $-969.98 | 25 |
| strong_dip | **$9114.68** | $-840.06 | $-45.26 | 171 | 59% | $-933.69 | 24 |
| mm_strong | **$8999.65** | $-681.07 | $-319.28 | 184 | 53% | $-885.02 | 25 |
| random_control | **$8924.58** | $-899.06 | $-176.36 | 190 | 55% | $-1513.35 | 25 |
| copy_top | **$8770.61** | $-1345.07 | $115.68 | 539 | 53% | $-2673.64 | 25 |
| mm_slow | **$8710.2** | $-1046.87 | $-242.93 | 122 | 51% | $-1246.55 | 25 |
| super | **$8608.38** | $-1375.81 | $-15.81 | 128 | 50% | $-1657.71 | 2 |
| mm_sports_v2 | **$7947.02** | $-1959.05 | $-93.93 | 261 | 50% | $-2178.18 | 12 |
| momentum | **$7028.22** | $-2788.51 | $-183.27 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6715.64** | $-3278.38 | $-5.98 | 539 | 47% | $-3729.84 | 25 |
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
| maker_sports | 147 | 1 | 0 | 99% | 1.4¢ |

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
