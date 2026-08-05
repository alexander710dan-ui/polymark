# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32391 · Last run: 2026-08-05T19:58:17.943Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10940.85** | $932.41 | $8.44 | 387 | 54% | $729.38 | 18 |
| mid_momentum | **$10594.85** | $867.28 | $-272.43 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10465.62** | $887.82 | $-422.2 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10165.19** | $473.98 | $-308.79 | 454 | 56% | $254.85 | 22 |
| mm_cheap_v2 | **$10002.42** | $-199.63 | $202.05 | 14 | 50% | $-311.55 | 25 |
| super | **$9975.2** | $-425.73 | $400.93 | 73 | 48% | $-641.58 | 12 |
| mid_momentum_v2 | **$9930.05** | $-208.56 | $138.61 | 16 | 50% | $-320.48 | 25 |
| fade_longshot | **$9924.4** | $123.32 | $-198.92 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9773.67** | $-472.32 | $245.99 | 411 | 52% | $-1800.89 | 25 |
| mm_max | **$9765.22** | $-229.22 | $-5.56 | 169 | 54% | $-396.34 | 4 |
| strong_dip | **$9536** | $-482.76 | $18.76 | 103 | 59% | $-575.07 | 25 |
| copy_pro | **$9397.23** | $-1348.73 | $745.96 | 393 | 51% | $-2198.73 | 25 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$8985.12** | $-1000.59 | $-14.29 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8934.27** | $-444.42 | $-621.31 | 56 | 54% | $-630.13 | 25 |
| mm_sports_v2 | **$8853.99** | $-766.26 | $-379.75 | 21 | 38% | $-892.28 | 22 |
| maker_flat | **$8687.23** | $-1130.82 | $-181.95 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8654.31** | $-804.21 | $-541.48 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8464.75** | $-1264.82 | $-270.43 | 141 | 49% | $-1467.85 | 18 |
| momentum | **$8191.23** | $-1059.12 | $-749.65 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7074.25** | $-2155.23 | $-770.52 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.48** | $-931.5 | $-70.02 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.66** | $-4791.55 | $-102.79 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 66 | 1 | 60% | 2.99¢ |
| maker_sports | 159 | 103 | 1 | 61% | 1.6¢ |

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
