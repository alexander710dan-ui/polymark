# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88911 · Last run: 2026-11-02T17:17:26.085Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12076.59** | $2156.34 | $-79.75 | 510 | 54% | $1306.34 | 25 |
| maker_sports | **$11141.21** | $1069.95 | $71.26 | 151 | 57% | $857.45 | 7 |
| mid_momentum | **$10697.73** | $627.56 | $70.17 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10677.38** | $570.48 | $106.9 | 598 | 53% | $361.38 | 5 |
| maker_flat | **$10475.16** | $388.85 | $86.31 | 40 | 53% | $197.3 | 24 |
| mm_max | **$10054.81** | $6.97 | $47.84 | 243 | 53% | $-202.13 | 3 |
| fade_longshot | **$10009.01** | $-25.49 | $34.5 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9994.92** | $71.35 | $-76.43 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9683.33** | $-306.99 | $-9.68 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9472.55** | $-597.62 | $70.17 | 140 | 51% | $-790.17 | 25 |
| strong_dip | **$9327.96** | $-729.14 | $57.1 | 175 | 59% | $-822.77 | 22 |
| mm_sports | **$9318.85** | $-786.98 | $105.83 | 708 | 54% | $-1006.11 | 7 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9145.28** | $-778.29 | $-76.43 | 155 | 51% | $-969.98 | 25 |
| mm_strong | **$9052.42** | $-718.15 | $-229.43 | 186 | 53% | $-922.1 | 25 |
| random_control | **$8899.99** | $-899.06 | $-200.95 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8685** | $-1046.87 | $-268.13 | 122 | 51% | $-1246.55 | 25 |
| super | **$8595.8** | $-1375.81 | $-28.39 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8493.88** | $-1399.58 | $-106.54 | 543 | 52% | $-2728.15 | 25 |
| mm_sports_v2 | **$8089.54** | $-2016.29 | $105.83 | 277 | 50% | $-2235.42 | 7 |
| momentum | **$7059.95** | $-2788.51 | $-151.54 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$7021.16** | $-3012.98 | $34.14 | 542 | 47% | $-3464.44 | 25 |
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
| maker_flat | 64 | 0 | 0 | 100% | 2.76¢ |
| maker_sports | 158 | 1 | 0 | 99% | 1.41¢ |

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
