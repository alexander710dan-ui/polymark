# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32493 · Last run: 2026-08-05T20:55:07.479Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10843.82** | $878.9 | $-35.08 | 394 | 54% | $675.87 | 15 |
| mid_momentum | **$10622.3** | $867.28 | $-244.98 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10515.69** | $887.82 | $-372.13 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10220.92** | $-136.55 | $357.47 | 17 | 53% | $-248.47 | 25 |
| mid_momentum_v2 | **$10018.07** | $-221.85 | $239.92 | 18 | 50% | $-333.77 | 25 |
| super | **$10005.84** | $-425.73 | $431.57 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9902.75** | $123.32 | $-220.57 | 121 | 96% | $112.58 | 25 |
| mm_sports | **$9877.72** | $147.48 | $-269.76 | 462 | 55% | $-71.65 | 19 |
| copy_top | **$9847.97** | $-542.13 | $390.1 | 413 | 52% | $-1870.7 | 25 |
| mm_max | **$9692.61** | $-271.43 | $-35.96 | 171 | 54% | $-438.55 | 3 |
| copy_pro | **$9574.76** | $-1348.73 | $923.49 | 393 | 51% | $-2198.73 | 25 |
| strong_dip | **$9502.77** | $-482.76 | $-14.47 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$8974.47** | $-1000.59 | $-24.94 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8935.25** | $-444.42 | $-620.33 | 56 | 54% | $-630.13 | 25 |
| maker_flat | **$8765.38** | $-1049 | $-185.62 | 83 | 42% | $-1243.12 | 18 |
| mm_strong | **$8669.26** | $-804.21 | $-526.53 | 82 | 49% | $-1008.16 | 25 |
| mm_sports_v2 | **$8638.65** | $-1092.76 | $-268.59 | 29 | 38% | $-1218.78 | 19 |
| momentum | **$8203.02** | $-1059.12 | $-737.86 | 261 | 68% | $-1547.36 | 25 |
| maker_sports | **$8202.32** | $-1465.21 | $-332.47 | 148 | 49% | $-1668.24 | 13 |
| whale_fade | **$6968.84** | $-2225.04 | $-806.12 | 414 | 48% | $-2579.59 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.36** | $-931.5 | $-70.14 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 101 | 67 | 1 | 60% | 2.97¢ |
| maker_sports | 161 | 103 | 3 | 61% | 1.6¢ |

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
