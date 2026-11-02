# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87616 · Last run: 2026-11-02T07:31:30.268Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11432.58** | $1489.91 | $-57.33 | 506 | 54% | $639.91 | 25 |
| maker_sports | **$11305.39** | $1396.01 | $-90.62 | 125 | 58% | $1183.51 | 6 |
| mm_tight | **$10794.99** | $721.99 | $73 | 571 | 54% | $512.89 | 5 |
| mid_momentum | **$10713.49** | $627.56 | $85.93 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10488.35** | $433.39 | $54.96 | 35 | 54% | $241.84 | 22 |
| mm_max | **$10290.79** | $289.41 | $1.38 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10175.02** | $275.8 | $-100.78 | 136 | 55% | $84.11 | 25 |
| fade_longshot | **$10009.94** | $-25.49 | $35.43 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9685.44** | $-306.99 | $-7.57 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9534.25** | $-575.61 | $109.86 | 679 | 54% | $-794.74 | 7 |
| mid_momentum_v2 | **$9488.31** | $-597.62 | $85.93 | 140 | 51% | $-790.17 | 25 |
| mm_cheap_v2 | **$9325.38** | $-573.84 | $-100.78 | 153 | 52% | $-765.53 | 25 |
| mm_strong | **$9282.52** | $-476.62 | $-240.86 | 182 | 54% | $-680.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8936.33** | $-899.06 | $-164.61 | 190 | 55% | $-1513.35 | 25 |
| strong_dip | **$8934.12** | $-1092.17 | $26.29 | 168 | 58% | $-1185.8 | 22 |
| mm_slow | **$8712.67** | $-1096.69 | $-190.64 | 121 | 50% | $-1296.37 | 24 |
| super | **$8609.05** | $-1375.81 | $-15.14 | 128 | 50% | $-1657.71 | 1 |
| copy_top | **$8465.34** | $-1352.19 | $-182.47 | 537 | 53% | $-2680.76 | 25 |
| mm_sports_v2 | **$8304.94** | $-1804.92 | $109.86 | 248 | 51% | $-2024.05 | 7 |
| momentum | **$7180.43** | $-2584.86 | $-234.71 | 311 | 66% | $-3073.1 | 25 |
| whale_fade | **$6787.8** | $-3176.08 | $-36.12 | 538 | 47% | $-3627.54 | 25 |
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
| maker_flat | 57 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 131 | 1 | 0 | 99% | 1.39¢ |

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
