# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29758 · Last run: 2026-08-04T19:23:28.511Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11338.58** | $1241.17 | $97.41 | 378 | 56% | $1022.04 | 20 |
| mm_tight | **$11057.88** | $770.88 | $287 | 328 | 54% | $567.85 | 13 |
| mm_cheap | **$10493.08** | $1054.47 | $-561.39 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10424.4** | $862.6 | $-438.2 | 201 | 58% | $649.12 | 25 |
| copy_pro | **$10018.65** | $-592.99 | $611.64 | 380 | 51% | $-1442.99 | 25 |
| copy_top | **$10018.24** | $-193.36 | $211.6 | 401 | 52% | $-1521.93 | 25 |
| fade_longshot | **$9902.67** | $55.61 | $-152.94 | 108 | 95% | $44.87 | 25 |
| mm_max | **$9709.82** | $-256.85 | $-33.33 | 143 | 53% | $-423.97 | 1 |
| strong_dip | **$9694.78** | $-463.45 | $158.23 | 99 | 60% | $-555.76 | 25 |
| super | **$9621.57** | $-439.2 | $60.77 | 68 | 47% | $-655.05 | 15 |
| maker_flat | **$9547.54** | $-508.2 | $55.74 | 50 | 44% | $-685.98 | 18 |
| ai_judge | **$9406.89** | $-587.64 | $-5.47 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9157.59** | $-468.35 | $-374.06 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9135.23** | $-853.19 | $-11.58 | 82 | 49% | $-1038.9 | 11 |
| random_control | **$9028.35** | $-661.85 | $-309.8 | 129 | 57% | $-1276.14 | 25 |
| mm_strong | **$8699.35** | $-924.82 | $-375.83 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8232.08** | $-1041.81 | $-726.11 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7077.95** | $-2370.75 | $-551.3 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9405.75** | $-730.36 | $136.11 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.19** | $-942.24 | $-53.57 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8472.91** | $-1937.09 | $410 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5098.24** | $-4691.55 | $-210.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 68 | 42 | 1 | 62% | 2.95¢ |
| maker_sports | 93 | 58 | 2 | 62% | 1.55¢ |

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
