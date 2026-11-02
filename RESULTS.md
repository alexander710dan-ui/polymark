# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89164 · Last run: 2026-11-02T19:12:37.415Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12079.69** | $2156.34 | $-76.65 | 510 | 54% | $1306.34 | 25 |
| maker_sports | **$11002.16** | $1126.2 | $-124.04 | 152 | 57% | $913.7 | 8 |
| mm_tight | **$10611.76** | $680.6 | $-68.84 | 599 | 53% | $471.5 | 5 |
| mid_momentum | **$10576.74** | $627.56 | $-50.82 | 305 | 56% | $414.08 | 25 |
| maker_flat | **$10337.95** | $388.85 | $-50.9 | 40 | 53% | $197.3 | 24 |
| fade_longshot | **$10007.37** | $-25.49 | $32.86 | 174 | 95% | $-36.23 | 25 |
| mm_max | **$9990.07** | $59.07 | $-69 | 244 | 53% | $-150.03 | 3 |
| mm_cheap | **$9958.56** | $71.35 | $-112.79 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9681.87** | $-306.99 | $-11.14 | 3 | 0% | $-204.85 | 1 |
| strong_dip | **$9493** | $-729.14 | $222.14 | 175 | 59% | $-822.77 | 24 |
| mid_momentum_v2 | **$9351.56** | $-597.62 | $-50.82 | 140 | 51% | $-790.17 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9178.41** | $-676.86 | $-144.73 | 709 | 54% | $-895.99 | 8 |
| mm_cheap_v2 | **$9108.92** | $-778.29 | $-112.79 | 155 | 51% | $-969.98 | 25 |
| random_control | **$8946.36** | $-899.06 | $-154.58 | 190 | 55% | $-1513.35 | 25 |
| mm_strong | **$8939.91** | $-718.15 | $-341.94 | 186 | 53% | $-922.1 | 25 |
| super | **$8592.89** | $-1375.81 | $-31.3 | 128 | 50% | $-1657.71 | 5 |
| mm_slow | **$8573.34** | $-1046.87 | $-379.79 | 122 | 51% | $-1246.55 | 25 |
| copy_top | **$8486.23** | $-1399.58 | $-114.19 | 543 | 52% | $-2728.15 | 25 |
| mm_sports_v2 | **$7949.1** | $-1906.17 | $-144.73 | 278 | 50% | $-2125.3 | 8 |
| momentum | **$7054.54** | $-2788.51 | $-156.95 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6998.95** | $-3012.98 | $11.93 | 542 | 47% | $-3464.44 | 25 |
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
| maker_sports | 160 | 1 | 0 | 99% | 1.4¢ |

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
