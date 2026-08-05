# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30485 · Last run: 2026-08-05T02:07:53.663Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10872.97** | $1180.28 | $-307.31 | 404 | 56% | $961.15 | 19 |
| mid_momentum | **$10769.4** | $814.23 | $-44.83 | 204 | 57% | $600.75 | 25 |
| mm_tight | **$10679.4** | $1049.88 | $-370.48 | 350 | 54% | $846.85 | 15 |
| mm_cheap | **$10446.23** | $746.87 | $-300.64 | 34 | 65% | $569.09 | 25 |
| copy_pro | **$10271.41** | $-643.53 | $914.94 | 383 | 51% | $-1493.53 | 25 |
| copy_top | **$10119.96** | $-222.82 | $342.78 | 403 | 52% | $-1551.39 | 25 |
| fade_longshot | **$9907.93** | $89.79 | $-181.86 | 114 | 96% | $79.05 | 25 |
| super | **$9797.14** | $-387.2 | $184.34 | 71 | 48% | $-603.05 | 13 |
| strong_dip | **$9547.62** | $-426.02 | $-26.36 | 101 | 59% | $-518.33 | 25 |
| mm_max | **$9529.01** | $-473.6 | $2.61 | 154 | 53% | $-640.72 | 5 |
| ai_judge | **$9383.81** | $-587.64 | $-28.55 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9310.28** | $-774.04 | $84.32 | 64 | 42% | $-968.16 | 15 |
| maker_sports | **$9269.97** | $-597.83 | $-132.2 | 104 | 51% | $-800.86 | 14 |
| mm_slow | **$9213.92** | $-468.35 | $-317.73 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8931.23** | $-991.45 | $-77.32 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8782.74** | $-1029.67 | $-187.59 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8303.39** | $-1113.4 | $-583.21 | 256 | 68% | $-1601.64 | 25 |
| whale_fade | **$7097.26** | $-2397.18 | $-505.56 | 404 | 48% | $-2751.73 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9007.24** | $-931.5 | $-61.26 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8472.91** | $-1937.09 | $410 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 1 | 64% | 2.95¢ |
| maker_sports | 118 | 71 | 1 | 62% | 1.57¢ |

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
