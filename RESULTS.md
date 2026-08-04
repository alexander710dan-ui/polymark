# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29043 · Last run: 2026-08-04T12:45:50.960Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10727.83** | $909.31 | $-181.48 | 350 | 56% | $706.28 | 17 |
| mm_cheap | **$10597.72** | $1054.47 | $-456.75 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10481** | $862.6 | $-381.6 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10456.04** | $481.39 | $-25.35 | 302 | 53% | $278.36 | 12 |
| copy_top | **$9937.99** | $-129.92 | $67.91 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9931.41** | $55.61 | $-124.2 | 108 | 95% | $44.87 | 25 |
| strong_dip | **$9708.15** | $-463.45 | $171.6 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9700.12** | $-725.28 | $425.4 | 376 | 51% | $-1575.28 | 25 |
| maker_flat | **$9625.84** | $-249.02 | $-125.14 | 33 | 45% | $-426.8 | 13 |
| super | **$9619.84** | $-507.95 | $127.79 | 65 | 46% | $-723.8 | 14 |
| ai_judge | **$9413.81** | $-587.64 | $1.45 | 7 | 14% | $-600 | 2 |
| mm_max | **$9311.93** | $-687.5 | $-0.57 | 126 | 51% | $-806.97 | 2 |
| mm_slow | **$9161.66** | $-468.35 | $-369.99 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9014.4** | $-561.85 | $-423.75 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$8995.5** | $-800.33 | $-204.17 | 60 | 47% | $-986.04 | 9 |
| mm_strong | **$8627.36** | $-920.12 | $-452.52 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8267.11** | $-1041.81 | $-691.08 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7265.38** | $-2279.45 | $-455.17 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9404.36** | $-730.36 | $134.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9022.47** | $-942.24 | $-35.29 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8382.91** | $-1937.09 | $320 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5112.41** | $-4691.55 | $-196.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 46 | 30 | 3 | 61% | 3.03¢ |
| maker_sports | 69 | 40 | 3 | 63% | 1.61¢ |

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
