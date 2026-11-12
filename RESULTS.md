# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82664 · Last run: 2026-11-12T20:42:50.398Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12384.54** | $2469.41 | $-84.87 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12125.15** | $2406.77 | $-281.62 | 376 | 57% | $2161.94 | 19 |
| mm_tight | **$11437.72** | $1742.91 | $-305.19 | 798 | 54% | $1523.78 | 11 |
| mm_cheap | **$11077.98** | $831.56 | $246.42 | 238 | 55% | $611.74 | 25 |
| mid_momentum | **$10919.61** | $702.66 | $216.95 | 387 | 55% | $482.84 | 25 |
| maker_flat | **$10893.38** | $939.66 | $-46.28 | 124 | 52% | $745.54 | 20 |
| mm_max | **$10749.63** | $786.81 | $-37.18 | 317 | 55% | $577.71 | 1 |
| mm_cheap_v2 | **$10228.34** | $-18.08 | $246.42 | 255 | 53% | $-237.9 | 25 |
| fade_longshot | **$9862.17** | $-140.38 | $2.55 | 230 | 94% | $-151.12 | 25 |
| mid_momentum_v2 | **$9694.43** | $-522.52 | $216.95 | 222 | 51% | $-742.34 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9128.95** | $-665.75 | $-205.3 | 205 | 52% | $-884.88 | 23 |
| mm_sports | **$9049.06** | $-627.89 | $-323.05 | 945 | 54% | $-847.02 | 19 |
| strong_dip | **$8913.63** | $-1201.6 | $115.23 | 263 | 58% | $-1295.23 | 25 |
| mm_strong | **$8721.02** | $-1179.48 | $-99.5 | 318 | 53% | $-1398.61 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.26** | $-1470.79 | $-154.95 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7819.75** | $-1857.2 | $-323.05 | 514 | 52% | $-2076.33 | 19 |
| random_control | **$7568.33** | $-2427.27 | $-4.4 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7221.89** | $-2770.21 | $-7.9 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5971.26** | $-4244.08 | $215.34 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 144 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 395 | 2 | 0 | 99% | 1.39¢ |

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
