# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32424 · Last run: 2026-08-05T20:16:50.090Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10895.47** | $1003.23 | $-107.76 | 391 | 54% | $800.2 | 16 |
| mid_momentum | **$10586.32** | $867.28 | $-280.96 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10499.86** | $887.82 | $-387.96 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10167.16** | $-302.83 | $469.99 | 15 | 47% | $-414.75 | 25 |
| mm_sports | **$10090.39** | $374.71 | $-284.32 | 458 | 55% | $155.58 | 20 |
| mid_momentum_v2 | **$10008.72** | $-311.76 | $320.48 | 17 | 47% | $-423.68 | 25 |
| super | **$9969.61** | $-425.73 | $395.34 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9907.58** | $123.32 | $-215.74 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9746.78** | $-575.97 | $322.75 | 412 | 51% | $-1904.54 | 25 |
| mm_max | **$9717.2** | $-169.83 | $-112.97 | 170 | 54% | $-336.95 | 4 |
| strong_dip | **$9525.08** | $-482.76 | $7.84 | 103 | 59% | $-575.07 | 25 |
| copy_pro | **$9374.17** | $-1348.73 | $722.9 | 393 | 51% | $-2198.73 | 25 |
| ai_judge | **$9360.56** | $-587.64 | $-51.8 | 7 | 14% | $-600 | 2 |
| random_control | **$8979.42** | $-1000.59 | $-19.99 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8931.1** | $-444.42 | $-624.48 | 56 | 54% | $-630.13 | 25 |
| mm_sports_v2 | **$8794.88** | $-865.53 | $-339.59 | 25 | 40% | $-991.55 | 20 |
| maker_flat | **$8783.6** | $-1130.82 | $-85.58 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8644.32** | $-804.21 | $-551.47 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8331.22** | $-1350.4 | $-318.38 | 145 | 49% | $-1553.43 | 15 |
| momentum | **$8200.17** | $-1059.12 | $-740.71 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7092.05** | $-2121.39 | $-786.56 | 413 | 48% | $-2475.94 | 25 |
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
