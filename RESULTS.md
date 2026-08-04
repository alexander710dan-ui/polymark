# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27689 · Last run: 2026-08-04T00:11:45.015Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11950.4** | $1588.32 | $362.08 | 309 | 57% | $1385.29 | 25 |
| mm_tight | **$11260.44** | $698.61 | $561.83 | 267 | 54% | $495.58 | 21 |
| mid_momentum | **$10417.38** | $715.77 | $-298.39 | 192 | 58% | $502.29 | 25 |
| mm_cheap | **$10366.88** | $893.78 | $-526.9 | 25 | 72% | $716 | 25 |
| maker_flat | **$10062.82** | $-203.97 | $266.79 | 12 | 42% | $-331.24 | 15 |
| mm_max | **$10059.04** | $-222.26 | $281.3 | 101 | 52% | $-341.73 | 13 |
| fade_longshot | **$9973.26** | $39.78 | $-66.52 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9918.53** | $-258.85 | $177.38 | 97 | 61% | $-351.16 | 25 |
| maker_sports | **$9665.78** | $-373.56 | $39.34 | 25 | 44% | $-559.27 | 15 |
| super | **$9600.45** | $-353.9 | $-45.65 | 64 | 47% | $-569.75 | 11 |
| copy_top | **$9507.37** | $-612.56 | $119.93 | 390 | 52% | $-1941.13 | 24 |
| ai_judge | **$9431.76** | $-587.64 | $19.4 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9312.07** | $-812.55 | $124.62 | 369 | 51% | $-1662.55 | 25 |
| random_control | **$9138.96** | $-249.45 | $-611.59 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8956.17** | $-762.3 | $-281.53 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8784.3** | $-1021.38 | $-194.32 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8296.06** | $-1272.84 | $-431.1 | 240 | 67% | $-1761.08 | 25 |
| whale_fade | **$7570.89** | $-1910.06 | $-519.05 | 391 | 48% | $-2264.61 | 24 |
| copy_month (retired) | **$9384.92** | $-730.36 | $115.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9042.63** | $-942.24 | $-15.13 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8282.91** | $-1937.09 | $220 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 27 | 21 | 5 | 56% | 3.06¢ |
| maker_sports | 40 | 22 | 4 | 65% | 1.7¢ |

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
