# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29365 · Last run: 2026-08-04T15:44:52.318Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11257.69** | $1140.66 | $117.03 | 361 | 56% | $937.63 | 19 |
| mm_tight | **$10719.78** | $670.79 | $48.99 | 312 | 54% | $467.76 | 13 |
| mm_cheap | **$10628.51** | $1054.47 | $-425.96 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10547.94** | $862.6 | $-314.66 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9945.06** | $-336.57 | $281.63 | 399 | 52% | $-1665.14 | 25 |
| fade_longshot | **$9886.9** | $55.61 | $-168.71 | 108 | 95% | $44.87 | 25 |
| super | **$9828.01** | $-439.2 | $267.21 | 68 | 47% | $-655.05 | 11 |
| copy_pro | **$9774.26** | $-881.58 | $655.84 | 377 | 51% | $-1731.58 | 25 |
| strong_dip | **$9682.21** | $-463.45 | $145.66 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9576.09** | $-406.2 | $-17.71 | 133 | 52% | $-573.32 | 3 |
| maker_flat | **$9559.93** | $-314.96 | $-125.11 | 40 | 45% | $-492.74 | 15 |
| ai_judge | **$9410.22** | $-587.64 | $-2.14 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9269.95** | $-741.23 | $11.18 | 69 | 48% | $-926.94 | 8 |
| mm_slow | **$9190.91** | $-468.35 | $-340.74 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9174.08** | $-561.85 | $-264.07 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8686.29** | $-924.82 | $-388.89 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8209.78** | $-1041.81 | $-748.41 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7325.31** | $-2165.05 | $-509.64 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9005.42** | $-942.24 | $-52.34 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8462.91** | $-1937.09 | $400 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 55 | 37 | 4 | 60% | 2.96¢ |
| maker_sports | 77 | 46 | 6 | 63% | 1.55¢ |

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
