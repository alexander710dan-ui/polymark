# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89457 · Last run: 2026-11-02T22:48:05.562Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11973.29** | $2028.21 | $-54.92 | 512 | 54% | $1178.21 | 23 |
| maker_sports | **$10839.8** | $780.05 | $59.75 | 157 | 56% | $567.55 | 18 |
| mid_momentum | **$10582.08** | $524.96 | $57.12 | 306 | 56% | $311.48 | 25 |
| mm_tight | **$10490.43** | $422.47 | $67.96 | 603 | 53% | $213.37 | 14 |
| maker_flat | **$10299.73** | $350.14 | $-50.41 | 42 | 52% | $158.59 | 24 |
| fade_longshot | **$9988.92** | $-25.49 | $14.41 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9960.73** | $71.35 | $-110.62 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$9944.25** | $-96.16 | $40.41 | 247 | 53% | $-305.26 | 4 |
| conviction | **$9682.02** | $-306.99 | $-10.99 | 3 | 0% | $-204.85 | 1 |
| strong_dip | **$9530.03** | $-517.46 | $47.49 | 178 | 60% | $-611.09 | 25 |
| mid_momentum_v2 | **$9356.9** | $-700.22 | $57.12 | 141 | 50% | $-892.77 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9111.09** | $-778.29 | $-110.62 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$8980.97** | $-1038.29 | $19.26 | 714 | 54% | $-1257.42 | 19 |
| mm_strong | **$8948.48** | $-820.8 | $-230.72 | 187 | 53% | $-1024.75 | 25 |
| random_control | **$8916.43** | $-899.06 | $-184.51 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8649.61** | $-1149.52 | $-200.87 | 123 | 50% | $-1349.2 | 25 |
| super | **$8601.85** | $-1375.81 | $-22.34 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8483.58** | $-1431.52 | $-84.9 | 545 | 52% | $-2760.09 | 23 |
| mm_sports_v2 | **$7751.66** | $-2267.6 | $19.26 | 283 | 50% | $-2486.73 | 19 |
| momentum | **$7044.28** | $-2788.51 | $-167.21 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6786.02** | $-3115.83 | $-98.15 | 543 | 47% | $-3567.29 | 24 |
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
| maker_flat | 66 | 0 | 1 | 100% | 2.75¢ |
| maker_sports | 175 | 1 | 0 | 99% | 1.37¢ |

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
