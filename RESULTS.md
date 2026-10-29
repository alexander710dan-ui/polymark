# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70375 · Last run: 2026-10-29T14:23:19.775Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10422.31** | $493 | $-70.69 | 7 | 86% | $301.45 | 13 |
| mm_tight | **$10401.26** | $402.24 | $-0.98 | 474 | 53% | $193.14 | 1 |
| copy_pro | **$10394.95** | $274.83 | $120.12 | 433 | 53% | $-575.17 | 23 |
| maker_sports | **$10370.92** | $469.76 | $-98.84 | 7 | 86% | $278.21 | 2 |
| mid_momentum | **$10284.88** | $275.05 | $9.83 | 249 | 55% | $61.57 | 14 |
| fade_longshot | **$10070.68** | $80 | $-9.32 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9881.35** | $-118.65 | $0 | 205 | 53% | $-327.75 | 0 |
| copy_top | **$9653.56** | $-398.51 | $52.07 | 450 | 53% | $-1727.08 | 10 |
| mm_cheap | **$9625.35** | $-300.77 | $-73.88 | 69 | 52% | $-483.23 | 12 |
| strong_dip | **$9613.21** | $-320.64 | $-66.15 | 135 | 61% | $-412.95 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9248.09** | $-651.08 | $-100.83 | 560 | 54% | $-870.21 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9059.7** | $-950.13 | $9.83 | 84 | 46% | $-1140.95 | 14 |
| mm_cheap_v2 | **$8775.71** | $-1150.41 | $-73.88 | 86 | 47% | $-1341.23 | 12 |
| random_control | **$8759.77** | $-1086.59 | $-153.64 | 179 | 56% | $-1700.88 | 25 |
| mm_strong | **$8487.1** | $-1440.89 | $-72.01 | 127 | 49% | $-1644.84 | 12 |
| mm_slow | **$8338.45** | $-1672.36 | $10.81 | 95 | 47% | $-1858.07 | 13 |
| mm_sports_v2 | **$8018.78** | $-1880.39 | $-100.83 | 129 | 48% | $-2099.52 | 2 |
| momentum | **$7407.94** | $-2548.15 | $-43.91 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6212.88** | $-3759.78 | $-27.34 | 451 | 46% | $-4114.33 | 10 |
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
| maker_flat | 20 | 0 | 0 | 100% | 2.88¢ |
| maker_sports | 9 | 1 | 0 | 90% | 1.97¢ |

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
