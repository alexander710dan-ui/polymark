# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30565 · Last run: 2026-08-05T02:52:23.440Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10823.96** | $814.23 | $9.73 | 204 | 57% | $600.75 | 25 |
| mm_sports | **$10810.7** | $922 | $-111.3 | 408 | 56% | $702.87 | 16 |
| mm_tight | **$10743.23** | $821.45 | $-78.22 | 354 | 54% | $618.42 | 11 |
| mm_cheap | **$10506.73** | $746.87 | $-240.14 | 34 | 65% | $569.09 | 25 |
| copy_pro | **$10328.61** | $-643.53 | $972.14 | 383 | 51% | $-1493.53 | 25 |
| copy_top | **$10174.7** | $-139.93 | $314.63 | 404 | 52% | $-1468.5 | 24 |
| fade_longshot | **$9893.85** | $92.73 | $-198.88 | 115 | 96% | $81.99 | 25 |
| super | **$9857.48** | $-387.2 | $244.68 | 71 | 48% | $-603.05 | 13 |
| mm_max | **$9606.52** | $-496.33 | $102.85 | 156 | 53% | $-663.45 | 4 |
| strong_dip | **$9501.8** | $-426.02 | $-72.18 | 101 | 59% | $-518.33 | 25 |
| maker_sports | **$9430.23** | $-812.64 | $242.87 | 108 | 50% | $-1015.67 | 10 |
| ai_judge | **$9392.53** | $-587.64 | $-19.83 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9278.74** | $-774.04 | $52.78 | 64 | 42% | $-968.16 | 17 |
| mm_slow | **$9152.84** | $-468.35 | $-378.81 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8997.39** | $-991.45 | $-11.16 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8793.74** | $-1029.67 | $-176.59 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8315.05** | $-1100.36 | $-584.59 | 257 | 68% | $-1588.6 | 25 |
| whale_fade | **$7157.32** | $-2499.83 | $-342.85 | 405 | 47% | $-2854.38 | 24 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.43** | $-931.5 | $-67.07 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 45 | 2 | 64% | 2.94¢ |
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
