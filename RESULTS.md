# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32416 · Last run: 2026-08-05T20:12:28.024Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10900.27** | $1003.23 | $-102.96 | 391 | 54% | $800.2 | 16 |
| mid_momentum | **$10585.96** | $867.28 | $-281.32 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10492.53** | $887.82 | $-395.29 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10137.27** | $-302.83 | $440.1 | 15 | 47% | $-414.75 | 25 |
| mm_sports | **$10086.48** | $374.71 | $-288.23 | 458 | 55% | $155.58 | 20 |
| mid_momentum_v2 | **$9981.12** | $-311.76 | $292.88 | 17 | 47% | $-423.68 | 25 |
| super | **$9961.43** | $-425.73 | $387.16 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9903.24** | $123.32 | $-220.08 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9747.64** | $-575.97 | $323.61 | 412 | 51% | $-1904.54 | 25 |
| mm_max | **$9703.62** | $-169.83 | $-126.55 | 170 | 54% | $-336.95 | 4 |
| strong_dip | **$9522.59** | $-482.76 | $5.35 | 103 | 59% | $-575.07 | 25 |
| copy_pro | **$9388.2** | $-1348.73 | $736.93 | 393 | 51% | $-2198.73 | 25 |
| ai_judge | **$9360.56** | $-587.64 | $-51.8 | 7 | 14% | $-600 | 2 |
| random_control | **$8978.7** | $-1000.59 | $-20.71 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8932.66** | $-444.42 | $-622.92 | 56 | 54% | $-630.13 | 25 |
| mm_sports_v2 | **$8791.07** | $-865.53 | $-343.4 | 25 | 40% | $-991.55 | 20 |
| maker_flat | **$8784.39** | $-1130.82 | $-84.79 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8644.01** | $-804.21 | $-551.78 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8327.83** | $-1350.4 | $-321.77 | 145 | 49% | $-1553.43 | 15 |
| momentum | **$8188.41** | $-1059.12 | $-752.47 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7090.88** | $-2121.39 | $-787.73 | 413 | 48% | $-2475.94 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.66** | $-931.5 | $-68.84 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.74** | $-4791.55 | $-100.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 66 | 2 | 60% | 2.99¢ |
| maker_sports | 160 | 103 | 2 | 61% | 1.6¢ |

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
