# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29491 · Last run: 2026-08-04T16:54:57.142Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11310.01** | $1140.66 | $169.35 | 361 | 56% | $937.63 | 25 |
| mm_tight | **$10764.56** | $670.79 | $93.77 | 312 | 54% | $467.76 | 21 |
| mm_cheap | **$10622.35** | $1054.47 | $-432.12 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10553.48** | $862.6 | $-309.12 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10037.02** | $-336.57 | $373.59 | 399 | 52% | $-1665.14 | 25 |
| copy_pro | **$9999.38** | $-881.58 | $880.96 | 377 | 51% | $-1731.58 | 25 |
| fade_longshot | **$9891.81** | $55.61 | $-163.8 | 108 | 95% | $44.87 | 25 |
| mm_max | **$9841.78** | $-406.2 | $247.98 | 133 | 52% | $-573.32 | 6 |
| super | **$9811.37** | $-439.2 | $250.57 | 68 | 47% | $-655.05 | 11 |
| strong_dip | **$9697.2** | $-463.45 | $160.65 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9423.55** | $-420.62 | $-155.83 | 42 | 43% | $-598.4 | 17 |
| ai_judge | **$9392.53** | $-587.64 | $-19.83 | 7 | 14% | $-600 | 2 |
| random_control | **$9189.46** | $-561.85 | $-248.69 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9171.16** | $-468.35 | $-360.49 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9099.57** | $-741.23 | $-159.2 | 69 | 48% | $-926.94 | 16 |
| mm_strong | **$8702.98** | $-924.82 | $-372.2 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8204.62** | $-1041.81 | $-753.57 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7124.14** | $-2165.05 | $-710.81 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.97** | $-942.24 | $-55.79 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.28** | $-4691.55 | $-203.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 59 | 39 | 3 | 60% | 2.96¢ |
| maker_sports | 85 | 51 | 5 | 63% | 1.55¢ |

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
