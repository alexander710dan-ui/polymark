# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81019 · Last run: 2026-11-11T23:20:54.337Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12737.53** | $2873.06 | $-135.53 | 337 | 58% | $2628.23 | 24 |
| copy_pro | **$12385.34** | $2469.41 | $-84.07 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12258.63** | $2581.56 | $-322.93 | 756 | 55% | $2362.43 | 22 |
| mm_cheap | **$12052.75** | $1795.41 | $257.34 | 211 | 57% | $1575.59 | 25 |
| mid_momentum | **$11592.82** | $1248.3 | $344.52 | 370 | 55% | $1028.48 | 25 |
| mm_cheap_v2 | **$11203.11** | $945.77 | $257.34 | 228 | 54% | $725.95 | 25 |
| mm_max | **$10735.09** | $771.14 | $-36.05 | 303 | 55% | $562.04 | 1 |
| maker_flat | **$10642.65** | $695.25 | $-52.6 | 107 | 51% | $501.13 | 17 |
| mid_momentum_v2 | **$10367.64** | $23.12 | $344.52 | 205 | 52% | $-196.7 | 25 |
| mm_sports | **$9983.49** | $235.91 | $-252.42 | 902 | 55% | $16.78 | 25 |
| fade_longshot | **$9860.22** | $-151.76 | $11.98 | 228 | 94% | $-162.5 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9529.61** | $-129.97 | $-340.42 | 188 | 53% | $-349.1 | 24 |
| mm_strong | **$9335.48** | $-702.81 | $38.29 | 288 | 53% | $-921.94 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8754.18** | $-993.4 | $-252.42 | 471 | 53% | $-1212.53 | 25 |
| strong_dip | **$8613.12** | $-1473.07 | $86.19 | 249 | 57% | $-1566.7 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.06** | $-1470.79 | $-151.15 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7559.56** | $-2427.27 | $-13.17 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7344.62** | $-2685.43 | $30.05 | 364 | 66% | $-3173.67 | 25 |
| whale_fade | **$5968.59** | $-4244.08 | $212.67 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 124 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 361 | 1 | 1 | 100% | 1.38¢ |

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
