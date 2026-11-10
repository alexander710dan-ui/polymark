# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79061 · Last run: 2026-11-10T23:48:44.068Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.53** | $2469.41 | $-83.88 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12254.58** | $2156.87 | $97.71 | 266 | 58% | $1912.04 | 16 |
| mm_cheap | **$11894.49** | $1369.97 | $524.52 | 183 | 56% | $1150.15 | 25 |
| mid_momentum | **$11618.92** | $1056.3 | $562.62 | 353 | 55% | $836.48 | 25 |
| mm_tight | **$11453.16** | $1433.05 | $20.11 | 696 | 54% | $1213.92 | 13 |
| mm_cheap_v2 | **$11044.85** | $520.33 | $524.52 | 200 | 54% | $300.51 | 25 |
| maker_flat | **$10736.07** | $829.51 | $-93.44 | 91 | 53% | $635.39 | 17 |
| mid_momentum_v2 | **$10393.74** | $-168.88 | $562.62 | 188 | 51% | $-388.7 | 25 |
| mm_max | **$10229.48** | $125.5 | $103.98 | 289 | 54% | $-83.6 | 1 |
| fade_longshot | **$9896.61** | $-104.88 | $1.49 | 218 | 94% | $-115.62 | 25 |
| mm_sports | **$9630.38** | $-417.49 | $47.87 | 829 | 54% | $-636.62 | 16 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9426.89** | $-821.73 | $248.62 | 254 | 52% | $-1040.86 | 25 |
| mm_slow | **$9404.95** | $-592.56 | $-2.49 | 173 | 51% | $-811.69 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9010.28** | $-833.16 | $-156.56 | 228 | 59% | $-926.79 | 17 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8401.07** | $-1646.8 | $47.87 | 398 | 52% | $-1865.93 | 16 |
| copy_top | **$8378.18** | $-1470.79 | $-151.03 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7721.03** | $-2393.67 | $114.7 | 232 | 53% | $-3007.96 | 25 |
| momentum | **$7474.44** | $-2770.22 | $244.66 | 347 | 65% | $-3258.46 | 25 |
| whale_fade | **$6004.48** | $-4244.08 | $248.56 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 108 | 0 | 0 | 100% | 2.59¢ |
| maker_sports | 282 | 1 | 0 | 100% | 1.32¢ |

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
