# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32446 · Last run: 2026-08-05T20:28:57.225Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10892.64** | $981.05 | $-88.41 | 393 | 54% | $778.02 | 14 |
| mid_momentum | **$10624.88** | $867.28 | $-242.4 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10525.77** | $887.82 | $-362.05 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10241.53** | $-212.92 | $454.45 | 16 | 50% | $-324.84 | 25 |
| mid_momentum_v2 | **$10033.81** | $-221.85 | $255.66 | 18 | 50% | $-333.77 | 25 |
| super | **$9980.8** | $-425.73 | $406.53 | 73 | 48% | $-641.58 | 12 |
| mm_sports | **$9969.39** | $249.63 | $-280.24 | 461 | 55% | $30.5 | 18 |
| fade_longshot | **$9906.06** | $123.32 | $-217.26 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9758.49** | $-542.13 | $300.62 | 413 | 52% | $-1870.7 | 25 |
| mm_max | **$9731.64** | $-169.83 | $-98.53 | 170 | 54% | $-336.95 | 4 |
| strong_dip | **$9497.3** | $-482.76 | $-19.94 | 103 | 59% | $-575.07 | 25 |
| copy_pro | **$9404.47** | $-1348.73 | $753.2 | 393 | 51% | $-2198.73 | 25 |
| ai_judge | **$9360.56** | $-587.64 | $-51.8 | 7 | 14% | $-600 | 2 |
| mm_slow | **$8972.18** | $-444.42 | $-583.4 | 56 | 54% | $-630.13 | 25 |
| random_control | **$8967.4** | $-1000.59 | $-32.01 | 143 | 57% | $-1614.88 | 25 |
| maker_flat | **$8828.7** | $-1130.82 | $-40.48 | 82 | 41% | $-1324.94 | 17 |
| mm_sports_v2 | **$8703.94** | $-990.61 | $-305.45 | 28 | 39% | $-1116.63 | 18 |
| mm_strong | **$8683.67** | $-804.21 | $-512.12 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8311.94** | $-1365.21 | $-322.85 | 147 | 49% | $-1568.24 | 13 |
| momentum | **$8219.46** | $-1059.12 | $-721.42 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7074.79** | $-2225.04 | $-700.17 | 414 | 48% | $-2579.59 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
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
