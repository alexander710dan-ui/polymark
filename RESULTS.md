# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80981 · Last run: 2026-11-11T22:55:51.701Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12754.82** | $2973.06 | $-218.24 | 336 | 58% | $2728.23 | 24 |
| mm_tight | **$12469.45** | $2533.96 | $-64.51 | 755 | 55% | $2314.83 | 20 |
| copy_pro | **$12385.34** | $2469.41 | $-84.07 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12104.24** | $1795.41 | $308.83 | 211 | 57% | $1575.59 | 25 |
| mid_momentum | **$11644.13** | $1248.3 | $395.83 | 370 | 55% | $1028.48 | 25 |
| mm_cheap_v2 | **$11254.6** | $945.77 | $308.83 | 228 | 54% | $725.95 | 25 |
| maker_flat | **$10771.17** | $695.25 | $75.92 | 107 | 51% | $501.13 | 16 |
| mm_max | **$10749.05** | $771.14 | $-22.09 | 303 | 55% | $562.04 | 1 |
| mid_momentum_v2 | **$10418.95** | $23.12 | $395.83 | 205 | 52% | $-196.7 | 25 |
| mm_sports | **$10060.03** | $338.01 | $-277.98 | 901 | 55% | $118.88 | 25 |
| fade_longshot | **$9861.61** | $-151.76 | $13.37 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9730.54** | $-129.97 | $-139.49 | 188 | 53% | $-349.1 | 24 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9342.82** | $-702.81 | $45.63 | 288 | 53% | $-921.94 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8830.72** | $-891.3 | $-277.98 | 470 | 53% | $-1110.43 | 25 |
| strong_dip | **$8608.63** | $-1473.07 | $81.7 | 249 | 57% | $-1566.7 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.26** | $-1470.79 | $-150.95 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7556.42** | $-2427.27 | $-16.31 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7402.45** | $-2685.43 | $87.88 | 364 | 66% | $-3173.67 | 25 |
| whale_fade | **$5968.52** | $-4244.08 | $212.6 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 123 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 360 | 1 | 1 | 100% | 1.39¢ |

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
