# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33123 · Last run: 2026-08-06T02:45:38.653Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10659.16** | $362.59 | $296.57 | 421 | 53% | $153.49 | 12 |
| mid_momentum | **$10567.46** | $604.41 | $-36.95 | 212 | 57% | $390.93 | 25 |
| mm_cheap | **$10427.45** | $787.82 | $-360.37 | 36 | 64% | $610.04 | 25 |
| super | **$10334.65** | $-110 | $444.65 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$9988.21** | $-185.69 | $173.9 | 421 | 52% | $-1514.26 | 22 |
| mid_momentum_v2 | **$9971.44** | $51.19 | $-79.75 | 34 | 53% | $-139.63 | 23 |
| copy_pro | **$9959.4** | $-929.24 | $888.64 | 399 | 51% | $-1779.24 | 24 |
| mm_cheap_v2 | **$9957.37** | $-78.91 | $36.28 | 37 | 54% | $-269.73 | 23 |
| mm_sports | **$9949.01** | $-344.56 | $293.57 | 495 | 55% | $-563.69 | 15 |
| fade_longshot | **$9864.72** | $25.97 | $-161.25 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9779.63** | $-499.95 | $279.58 | 187 | 52% | $-709.05 | 5 |
| strong_dip | **$9612.89** | $-394.63 | $7.52 | 105 | 60% | $-486.94 | 25 |
| ai_judge | **$9360.56** | $-587.64 | $-51.8 | 7 | 14% | $-600 | 2 |
| random_control | **$9079.11** | $-981.12 | $60.23 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8789.88** | $-707.39 | $-502.73 | 61 | 51% | $-893.1 | 25 |
| mm_sports_v2 | **$8689.24** | $-1567.11 | $256.35 | 64 | 44% | $-1740.93 | 14 |
| maker_flat | **$8546.69** | $-1477.48 | $24.17 | 91 | 41% | $-1671.6 | 18 |
| mm_strong | **$8474.51** | $-1169.83 | $-355.66 | 88 | 47% | $-1373.78 | 25 |
| momentum | **$7977.58** | $-1302.09 | $-720.33 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7791.08** | $-2239.79 | $30.87 | 177 | 47% | $-2442.82 | 8 |
| whale_fade | **$6894.49** | $-2762.63 | $-342.88 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.06** | $-931.5 | $-69.44 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 72 | 2 | 60% | 2.95¢ |
| maker_sports | 185 | 120 | 1 | 61% | 1.54¢ |

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
