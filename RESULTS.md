# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30519 · Last run: 2026-08-05T02:26:46.388Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10897.36** | $974.98 | $-77.62 | 406 | 56% | $755.85 | 18 |
| mid_momentum | **$10818.7** | $814.23 | $4.47 | 204 | 57% | $600.75 | 25 |
| mm_tight | **$10787.82** | $844.58 | $-56.76 | 352 | 54% | $641.55 | 13 |
| mm_cheap | **$10531.61** | $746.87 | $-215.26 | 34 | 65% | $569.09 | 25 |
| copy_pro | **$10291.26** | $-643.53 | $934.79 | 383 | 51% | $-1493.53 | 25 |
| copy_top | **$10199.77** | $-139.93 | $339.7 | 404 | 52% | $-1468.5 | 24 |
| super | **$9948.12** | $-387.2 | $335.32 | 71 | 48% | $-603.05 | 13 |
| fade_longshot | **$9890.98** | $89.79 | $-198.81 | 114 | 96% | $79.05 | 25 |
| mm_max | **$9611.99** | $-473.6 | $85.59 | 154 | 53% | $-640.72 | 6 |
| strong_dip | **$9505.89** | $-426.02 | $-68.09 | 101 | 59% | $-518.33 | 25 |
| maker_sports | **$9412.99** | $-797.83 | $210.82 | 106 | 50% | $-1000.86 | 12 |
| ai_judge | **$9387.06** | $-587.64 | $-25.3 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9376.67** | $-774.04 | $150.71 | 64 | 42% | $-968.16 | 17 |
| mm_slow | **$9191.5** | $-468.35 | $-340.15 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8967.39** | $-991.45 | $-41.16 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8836.6** | $-1029.67 | $-133.73 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8300.14** | $-1113.4 | $-586.46 | 256 | 68% | $-1601.64 | 25 |
| whale_fade | **$7098.26** | $-2499.83 | $-401.91 | 405 | 47% | $-2854.38 | 24 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.75** | $-931.5 | $-64.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 45 | 1 | 64% | 2.94¢ |
| maker_sports | 118 | 72 | 0 | 62% | 1.57¢ |

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
