# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88000 · Last run: 2026-11-02T10:26:24.516Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11619.92** | $1710.14 | $-90.22 | 507 | 54% | $860.14 | 25 |
| maker_sports | **$11086.92** | $1251.4 | $-164.48 | 130 | 58% | $1038.9 | 11 |
| mid_momentum | **$10707.8** | $627.56 | $80.24 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10595.16** | $778.09 | $-182.93 | 576 | 54% | $568.99 | 10 |
| maker_flat | **$10484.67** | $433.39 | $51.28 | 35 | 54% | $241.84 | 22 |
| mm_max | **$10279.36** | $289.41 | $-10.05 | 232 | 54% | $80.31 | 5 |
| fade_longshot | **$10012.94** | $-25.49 | $38.43 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9993.13** | $71.35 | $-78.22 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9687.33** | $-306.99 | $-5.68 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9482.62** | $-597.62 | $80.24 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9288.13** | $-512.34 | $-199.53 | 685 | 55% | $-731.47 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9146.16** | $-926.39 | $72.55 | 170 | 59% | $-1020.02 | 25 |
| mm_cheap_v2 | **$9143.49** | $-778.29 | $-78.22 | 155 | 51% | $-969.98 | 25 |
| mm_strong | **$9088.14** | $-681.07 | $-230.79 | 184 | 53% | $-885.02 | 25 |
| random_control | **$8928.08** | $-899.06 | $-172.86 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8712.12** | $-1046.87 | $-241.01 | 122 | 51% | $-1246.55 | 25 |
| super | **$8608.82** | $-1375.81 | $-15.37 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8563.44** | $-1345.07 | $-91.49 | 539 | 53% | $-2673.64 | 25 |
| mm_sports_v2 | **$8058.82** | $-1741.65 | $-199.53 | 254 | 52% | $-1960.78 | 12 |
| momentum | **$7021.45** | $-2788.51 | $-190.04 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6710.46** | $-3278.38 | $-11.16 | 539 | 47% | $-3729.84 | 25 |
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
| maker_flat | 57 | 0 | 1 | 100% | 2.64¢ |
| maker_sports | 141 | 1 | 1 | 99% | 1.4¢ |

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
