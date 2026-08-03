# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27616 · Last run: 2026-08-03T23:31:08.093Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11665.36** | $1541.26 | $124.1 | 308 | 57% | $1338.23 | 23 |
| mm_tight | **$10884.73** | $798.61 | $86.12 | 266 | 54% | $595.58 | 20 |
| mid_momentum | **$10418.23** | $715.77 | $-297.54 | 192 | 58% | $502.29 | 25 |
| mm_cheap | **$10365.44** | $893.78 | $-528.34 | 25 | 72% | $716 | 25 |
| fade_longshot | **$9968.35** | $39.78 | $-71.43 | 106 | 95% | $29.04 | 25 |
| mm_max | **$9959.21** | $-122.26 | $81.47 | 100 | 53% | $-241.73 | 12 |
| strong_dip | **$9938.85** | $-258.85 | $197.7 | 97 | 61% | $-351.16 | 25 |
| maker_flat | **$9833.85** | $-203.97 | $37.82 | 12 | 42% | $-331.24 | 12 |
| maker_sports | **$9753.14** | $-273.56 | $26.7 | 24 | 46% | $-459.27 | 13 |
| super | **$9621.06** | $-353.9 | $-25.04 | 64 | 47% | $-569.75 | 11 |
| copy_top | **$9444.78** | $-645.89 | $90.67 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9415.18** | $-587.64 | $2.82 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9406.05** | $-882.82 | $288.87 | 368 | 51% | $-1732.82 | 25 |
| random_control | **$9168.87** | $-249.45 | $-581.68 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8937.43** | $-762.3 | $-300.27 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8761.42** | $-1021.38 | $-217.2 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8209.37** | $-1304.42 | $-486.21 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7710.51** | $-1810.06 | $-479.43 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9373.81** | $-730.36 | $104.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9039** | $-942.24 | $-18.76 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8309.58** | $-1937.09 | $246.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 24 | 21 | 3 | 53% | 3.19¢ |
| maker_sports | 37 | 20 | 3 | 65% | 1.76¢ |

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
