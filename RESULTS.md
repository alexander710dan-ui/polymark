# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88747 · Last run: 2026-11-02T16:02:24.734Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12077.52** | $2156.34 | $-78.82 | 510 | 54% | $1306.34 | 25 |
| maker_sports | **$11098.9** | $1184.76 | $-85.86 | 148 | 57% | $972.26 | 8 |
| mid_momentum | **$10736.1** | $627.56 | $108.54 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10581.96** | $693.14 | $-111.18 | 595 | 53% | $484.04 | 7 |
| maker_flat | **$10507.92** | $488.85 | $19.07 | 39 | 54% | $297.3 | 24 |
| mm_cheap | **$10022.74** | $71.35 | $-48.61 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$10020.44** | $212.32 | $-191.88 | 241 | 53% | $3.22 | 5 |
| fade_longshot | **$10006.86** | $-25.49 | $32.35 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9683.62** | $-306.99 | $-9.39 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9510.92** | $-597.62 | $108.54 | 140 | 51% | $-790.17 | 25 |
| strong_dip | **$9301.83** | $-892.34 | $194.17 | 173 | 59% | $-985.97 | 24 |
| mm_sports | **$9223.96** | $-663.82 | $-112.22 | 705 | 54% | $-882.95 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9173.1** | $-778.29 | $-48.61 | 155 | 51% | $-969.98 | 25 |
| mm_strong | **$9089.28** | $-718.15 | $-192.57 | 186 | 53% | $-922.1 | 25 |
| random_control | **$8912.29** | $-899.06 | $-188.65 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8705.12** | $-1046.87 | $-248.01 | 122 | 51% | $-1246.55 | 25 |
| super | **$8604.07** | $-1375.81 | $-20.12 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8502.02** | $-1399.58 | $-98.4 | 543 | 52% | $-2728.15 | 25 |
| mm_sports_v2 | **$7994.65** | $-1893.13 | $-112.22 | 274 | 50% | $-2112.26 | 9 |
| momentum | **$7063.49** | $-2788.51 | $-148 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$7046.04** | $-3012.98 | $59.02 | 542 | 47% | $-3464.44 | 25 |
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
| maker_flat | 63 | 0 | 0 | 100% | 2.77¢ |
| maker_sports | 156 | 1 | 1 | 99% | 1.41¢ |

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
