# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81829 · Last run: 2026-11-12T09:11:48.460Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12814.77** | $3082.12 | $-267.35 | 359 | 58% | $2837.29 | 12 |
| copy_pro | **$12384.84** | $2469.41 | $-84.57 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11914.39** | $2210.28 | $-295.89 | 781 | 54% | $1991.15 | 9 |
| mm_cheap | **$11797.07** | $1769.46 | $27.61 | 218 | 57% | $1549.64 | 25 |
| mid_momentum | **$11396.15** | $1288.9 | $107.25 | 376 | 56% | $1069.08 | 25 |
| mm_cheap_v2 | **$10947.43** | $919.82 | $27.61 | 235 | 54% | $700 | 25 |
| mm_max | **$10704.51** | $798.3 | $-93.79 | 305 | 55% | $589.2 | 3 |
| maker_flat | **$10697.54** | $653.98 | $43.56 | 109 | 51% | $459.86 | 23 |
| mid_momentum_v2 | **$10170.97** | $63.72 | $107.25 | 211 | 52% | $-156.1 | 25 |
| fade_longshot | **$9873.25** | $-140.38 | $13.63 | 230 | 94% | $-151.12 | 25 |
| mm_sports | **$9844.42** | $245.12 | $-400.7 | 925 | 55% | $25.99 | 13 |
| mm_slow | **$9635.05** | $-193.12 | $-171.83 | 194 | 53% | $-412.25 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9357.67** | $-344.45 | $-297.88 | 299 | 54% | $-563.58 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8732.77** | $-1505.84 | $238.61 | 254 | 57% | $-1599.47 | 24 |
| mm_sports_v2 | **$8615.11** | $-984.19 | $-400.7 | 494 | 53% | $-1203.32 | 13 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8376.25** | $-1470.79 | $-152.96 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7517.54** | $-2427.27 | $-55.19 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7302.48** | $-2770.21 | $72.69 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5994.25** | $-4244.08 | $238.33 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 132 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 371 | 2 | 0 | 99% | 1.38¢ |

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
