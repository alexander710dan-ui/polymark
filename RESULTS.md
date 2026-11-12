# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81434 · Last run: 2026-11-12T03:55:11.167Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12887.76** | $2876.16 | $11.6 | 352 | 57% | $2631.33 | 13 |
| copy_pro | **$12385.09** | $2469.41 | $-84.32 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12140.47** | $2171.47 | $-31 | 774 | 54% | $1952.34 | 10 |
| mm_cheap | **$12105.82** | $1756.24 | $349.58 | 215 | 57% | $1536.42 | 23 |
| mid_momentum | **$11595.74** | $1193.8 | $401.94 | 372 | 55% | $973.98 | 25 |
| mm_cheap_v2 | **$11256.18** | $906.6 | $349.58 | 232 | 54% | $686.78 | 23 |
| mm_max | **$10900.85** | $900.85 | $0 | 304 | 55% | $691.75 | 0 |
| maker_flat | **$10837.43** | $653.98 | $183.45 | 109 | 51% | $459.86 | 19 |
| mid_momentum_v2 | **$10370.56** | $-31.38 | $401.94 | 207 | 52% | $-251.2 | 25 |
| mm_sports | **$10042.4** | $71.64 | $-29.24 | 918 | 54% | $-147.49 | 13 |
| fade_longshot | **$9874.97** | $-142.32 | $17.29 | 229 | 94% | $-153.06 | 25 |
| mm_slow | **$9807.45** | $-90.57 | $-101.98 | 193 | 53% | $-309.7 | 21 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9465.94** | $-673.7 | $139.64 | 292 | 53% | $-892.83 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8813.09** | $-1157.67 | $-29.24 | 487 | 53% | $-1376.8 | 13 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8474.92** | $-1595.75 | $70.67 | 253 | 57% | $-1689.38 | 21 |
| copy_top | **$8375.54** | $-1470.79 | $-153.67 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7523.23** | $-2427.27 | $-49.5 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7214.16** | $-2843.5 | $57.66 | 368 | 65% | $-3331.74 | 25 |
| whale_fade | **$5978.96** | $-4244.08 | $223.04 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 128 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 365 | 2 | 0 | 99% | 1.38¢ |

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
