# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72867 · Last run: 2026-10-30T00:16:00.151Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11276.39** | $1161.46 | $114.93 | 27 | 78% | $969.91 | 11 |
| copy_pro | **$10980.79** | $964.2 | $16.59 | 447 | 53% | $114.2 | 25 |
| mid_momentum | **$10928.64** | $776.07 | $152.57 | 269 | 57% | $562.59 | 25 |
| mm_tight | **$10874.15** | $901.56 | $-27.41 | 488 | 54% | $692.46 | 9 |
| mm_cheap | **$10447.42** | $123.96 | $323.46 | 88 | 56% | $-58.5 | 25 |
| mm_max | **$10156.72** | $153.3 | $3.42 | 210 | 54% | $-55.8 | 3 |
| mm_sports | **$10083.46** | $-5.18 | $88.64 | 580 | 55% | $-224.31 | 11 |
| maker_flat | **$10011.23** | $-107 | $118.23 | 13 | 46% | $-298.55 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| fade_longshot | **$9995.21** | $89.44 | $-94.23 | 152 | 95% | $78.7 | 25 |
| super | **$9928.5** | $-424.16 | $352.66 | 92 | 51% | $-688.49 | 4 |
| copy_top | **$9794.81** | $-342.79 | $137.6 | 462 | 53% | $-1671.36 | 23 |
| mid_momentum_v2 | **$9703.46** | $-449.11 | $152.57 | 104 | 51% | $-639.93 | 25 |
| mm_cheap_v2 | **$9597.78** | $-725.68 | $323.46 | 105 | 50% | $-916.5 | 25 |
| mm_strong | **$9391.37** | $-1033.71 | $425.08 | 146 | 52% | $-1237.66 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9144.26** | $-453.27 | $-402.47 | 143 | 61% | $-545.58 | 20 |
| mm_slow | **$9033.13** | $-1443.54 | $476.67 | 105 | 50% | $-1629.25 | 25 |
| mm_sports_v2 | **$8854.15** | $-1234.49 | $88.64 | 149 | 52% | $-1453.62 | 11 |
| random_control | **$8636.02** | $-1294.96 | $-69.02 | 183 | 56% | $-1909.25 | 25 |
| momentum | **$7420.47** | $-2533.86 | $-45.67 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5843.6** | $-3883.02 | $-273.38 | 463 | 46% | $-4237.57 | 23 |
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
| maker_flat | 38 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 38 | 1 | 0 | 97% | 1.57¢ |

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
