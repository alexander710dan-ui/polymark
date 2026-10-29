# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70483 · Last run: 2026-10-29T14:48:04.426Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10448.14** | $493 | $-44.86 | 7 | 86% | $301.45 | 14 |
| maker_sports | **$10445.92** | $469.76 | $-23.84 | 7 | 86% | $278.21 | 3 |
| mm_tight | **$10408.52** | $402.24 | $6.28 | 474 | 53% | $193.14 | 2 |
| mid_momentum | **$10261.71** | $275.05 | $-13.34 | 249 | 55% | $61.57 | 15 |
| copy_pro | **$10255.57** | $274.83 | $-19.26 | 433 | 53% | $-575.17 | 25 |
| fade_longshot | **$10069.9** | $80 | $-10.1 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9888.61** | $-118.65 | $7.26 | 205 | 53% | $-327.75 | 1 |
| strong_dip | **$9629.07** | $-320.64 | $-50.29 | 135 | 61% | $-412.95 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9567.85** | $-398.51 | $-33.64 | 450 | 53% | $-1727.08 | 11 |
| mm_cheap | **$9558.86** | $-300.77 | $-140.37 | 69 | 52% | $-483.23 | 13 |
| mm_sports | **$9314.34** | $-651.08 | $-34.58 | 560 | 54% | $-870.21 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9036.53** | $-950.13 | $-13.34 | 84 | 46% | $-1140.95 | 15 |
| random_control | **$8738.53** | $-1086.59 | $-174.88 | 179 | 56% | $-1700.88 | 25 |
| mm_cheap_v2 | **$8709.22** | $-1150.41 | $-140.37 | 86 | 47% | $-1341.23 | 13 |
| mm_strong | **$8418.85** | $-1440.89 | $-140.26 | 127 | 49% | $-1644.84 | 13 |
| mm_slow | **$8315.28** | $-1672.36 | $-12.36 | 95 | 47% | $-1858.07 | 14 |
| mm_sports_v2 | **$8085.03** | $-1880.39 | $-34.58 | 129 | 48% | $-2099.52 | 3 |
| momentum | **$7375.46** | $-2548.15 | $-76.39 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6323.83** | $-3759.78 | $83.61 | 451 | 46% | $-4114.33 | 11 |
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
| maker_flat | 21 | 0 | 0 | 100% | 2.84¢ |
| maker_sports | 10 | 1 | 0 | 91% | 1.97¢ |

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
